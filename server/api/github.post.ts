import { Octokit } from '@octokit/rest';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const octokit = new Octokit({
        auth: config.githubToken,
        userAgent: 'Present 20250515',
    });

    try {
        const { data: user } = await octokit.rest.users.getAuthenticated();

        const { data: repos } = await octokit.rest.repos.listForUser({
            username: user.login,
            type: 'all',
            sort: 'pushed',
            direction: 'desc',
            per_page: 10,
        });

        const recentRepos = repos.filter((repo) => repo.name !== user.login).slice(0, 5);

        const repoActivities = await Promise.all(
            recentRepos.map(async (repo) => {
                const { data: events } = await octokit.rest.activity.listRepoEvents({
                    owner: repo.owner.login,
                    repo: repo.name,
                    per_page: 100,
                });

                let eventsToUse: {
                    type: string | null;
                    created_at: string | null;
                    actor: { login: string };
                    payload: {
                        details: {
                            html_url: string;
                            message: string
                        }[]
                    };
                }[];

                if (events.length === 0 || events.filter((event) => event.actor.login === user.login).length === 0) {
                    try {
                        const { data: commits } = await octokit.rest.repos.listCommits({
                            owner: repo.owner.login,
                            repo: repo.name,
                            author: user.login,
                            per_page: 5,
                        });

                        eventsToUse = commits.map((commit) => ({
                            type: 'CommitEvent',
                            created_at: commit.commit.author?.date ?? null,
                            actor: { login: user.login },
                            payload: {
                                details: [{ html_url: commit.html_url, message: commit.commit.message }],
                            },
                        }));
                    } catch (error) {
                        console.error(`Failed to fetch commits for ${repo.full_name}:`, error);
                        eventsToUse = [];
                    }
                } else {
                    const userEvents = events.filter((event) => event.actor.login === user.login).slice(0, 3);

                    eventsToUse = [];
                    for (const event of userEvents) {
                        switch (event.type) {
                            case 'PushEvent':
                                eventsToUse.push({
                                    type: event.type,
                                    created_at: event.created_at,
                                    actor: { login: event.actor.login },
                                    payload: {
                                        // @ts-expect-error - TypeScript doesn't know about the payload structure for PushEvent
                                        details: [{ html_url: `https://github.com/${event.repo.name}/${event.payload.ref.replace('refs/heads/', 'tree/')}`, message: `Pushed ${event.payload.commits.length} ${event.payload.commits.length === 1 ? 'commit' : 'commits'} to ${event.payload.ref}` }],
                                    },
                                });
                                break;
                            case 'CreateEvent':
                                eventsToUse.push({
                                    type: event.type,
                                    created_at: event.created_at,
                                    actor: { login: event.actor.login },
                                    payload: {
                                        // @ts-expect-error - TypeScript doesn't know about the payload structure for CreateEvent
                                        details: [{ html_url: `https://github.com/${event.repo.name}/tree/${event.payload.ref}`, message: `Created ${event.payload.ref_type} ${event.payload.ref}` }],
                                    },
                                });
                                break;
                            default:
                                console.error(`Encountered unknown event type: ${event.type}`);
                                break;
                        }
                    }
                }

                return {
                    repo: {
                        name: repo.name,
                        full_name: repo.full_name,
                        html_url: repo.html_url,
                        description: repo.description,
                        updated_at: repo.updated_at,
                    },
                    events: eventsToUse.map((event) => ({
                        type: event.type,
                        created_at: event.created_at,
                        actor: event.actor.login,
                        payload: event.payload,
                    })),
                };
            })
        );

        return {
            user: {
                login: user.login,
                name: user.name,
                avatar_url: user.avatar_url,
            },
            repositories: repoActivities,
        };
    } catch (error) {
        console.error('GitHub API error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch GitHub data',
            data: error instanceof Error ? error.message : String(error),
        });
    }
});

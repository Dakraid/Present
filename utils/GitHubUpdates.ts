export default interface GitHubUpdates {
    user: {
        login: string
        name: string | null
        avatar_url: string
    },
    repositories: {
        repo: {
            name: string
            full_name: string
            html_url: string
            description: string | null
            updated_at: string | null | undefined
        }
        events: {
            type: string | null
            created_at: string | null
            actor: string
            payload: {
                details: {
                    html_url: string
                    message: string
                }[]
            }
        }[]
    }[]
}

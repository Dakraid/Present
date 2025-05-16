// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt()
    // Your custom configs here
    .append({
        rules: {
            'vue/no-parsing-error': [
                'error',
                {
                    'missing-end-tag-name': false,
                    'x-invalid-end-tag': false,
                },
            ],
        },
    })
    .append(eslintConfigPrettier)
    .append({
        ignores: ['**/*.d.ts', '**/*.mjs', 'nuxt.config.ts', 'components/ui/*/*.*', '.output/**/*.*'],
    });

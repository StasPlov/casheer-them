require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['unused-imports'],
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard',
        '@vue/typescript/recommended',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-debugger': 'error',
        'spaced-comment': 'off',
        'prefer-const': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'none',
                argsIgnorePattern: '^_',
            },
        ],
    },
}

import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/'],
  },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {},
  }
);

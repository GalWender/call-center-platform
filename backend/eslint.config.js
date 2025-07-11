import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Global ignores
    ignores: ['dist/'],
  },
  // Base configuration for all files
  ...tseslint.configs.recommended,
  // Type-aware configuration for TypeScript files
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Stricter rules can be enabled here
    },
  }
);


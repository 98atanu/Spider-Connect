import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Include recommended rules from react-hooks
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
    "no-unused-vars": "off",
    "react/no-unescaped-entities": "off",
      
      // Custom TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type without warnings/errors
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Allow unused variables if prefixed with '_'
      
      // Disable default no-unused-vars rule (since it conflicts with TypeScript version)
      'no-unused-vars': 'off',
      
      // React Refresh specific rule for Fast Refresh compatibility
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);

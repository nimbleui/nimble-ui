import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default tseslint.config(
  {
    ignores: ['**/node_modules', '**/dist'],
  },
  eslint.configs.recommended, // 使用 ESLint 的推荐配置
  tseslint.configs.recommended, // 使用 TypeScript ESLint 的基础配置
  ...pluginVue.configs['flat/recommended'], // 使用 Vue ESLint 的推荐配置
  {
    files: ['**/*.vue'], // 针对所有 .vue 文件
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser', // 使用 TypeScript ESLint 解析器
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
  },
  {
    rules: {
      'no-debugger': 'warn', // 禁止使用 debugger 语句
    },
  }
);

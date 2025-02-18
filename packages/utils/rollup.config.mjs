import {defineRollupConfig} from '@nimble-ui/config';

export default defineRollupConfig({
  input: [
    {
      name: 'utils',
      path: './src/index.ts',
      globalVariableName: 'NimbleUIUtils',
    },
  ],
  globals: {
    '@nimble-ui/utils': 'NimbleUIUtilsDOM',
  },
  outputs: {cjs: false, browser: false},
});

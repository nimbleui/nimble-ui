import {defineRollupConfig} from '@nimble-ui/config';

export default defineRollupConfig({
  input: [
    {
      name: 'move',
      path: './src/index.ts',
      globalVariableName: 'NimbleUIMove',
    },
  ],
  globals: {
    '@nimble-ui/utils': 'NimbleUIUtils',
  },
  outputs: {cjs: false, umd: {globals: {}}, browser: {globals: {}}},
});

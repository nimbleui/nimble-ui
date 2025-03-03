import {type ViteUserConfig, defineConfig} from 'vitest/config';

export function defineViteConfig(config: ViteUserConfig) {
  return defineConfig({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
      },
    },
    test: {
      globals: true,
      typecheck: {
        tsconfig: './tsconfig.test.json',
      },
      ...config.test,
    },
  });
}

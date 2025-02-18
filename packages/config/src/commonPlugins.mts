import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import type {RollupConfigOptions} from './defineRollupConfig.mjs';

export function commonPlugins(
  configOptions: RollupConfigOptions,
  isMin: boolean,
) {
  const {
    nodeResolve: nodeResolveOverride,
    babel: babelOverride,
    ...rest
  } = configOptions.plugins ?? {};

  return [
    ...Object.values(rest),

    nodeResolveOverride ?? nodeResolve({extensions: ['.ts']}),
    babelOverride ??
      babel({
        babelHelpers: 'bundled',
        extensions: ['.ts'],
        plugins: ['annotate-pure-calls'],
      }),
    isMin ? terser() : undefined,
    replace({__DEV__: `${!isMin}`, preventAssignment: true}),
  ].filter(Boolean);
}

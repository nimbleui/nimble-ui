import type {
  ExternalOption,
  GlobalsOption,
  Plugin,
  RollupOptions,
} from 'rollup';
import {normalizeOutputOptions} from './normalizeOutputOptions.mjs';
import {commonPlugins} from './commonPlugins.mjs';
import dtsPlugin from 'rollup-plugin-dts';
import {rootDir} from './constant.mjs';
import path from 'path';

interface InputType {
  name: string;
  path: string;
  globalVariableName: string;
}

export type OutputOptionsObject = {
  globals?: GlobalsOption;
  file?: string;
  suffix: string | string[];
  format: string;
};

export type OutputOptions = OutputOptionsObject | false;

export type NormalizedOutputOptions = OutputOptionsObject & {
  skip: boolean;
  external?: ExternalOption;
};

export type OutputFormat = 'esm' | 'mjs' | 'cjs' | 'umd' | 'browser';
export interface RollupConfigOptions {
  input: InputType[];
  plugins?: {
    nodeResolve?: Plugin;
    babel?: Plugin;
    [K: string]: Plugin | undefined;
  };
  globals?: GlobalsOption;
  outputs?: Partial<Record<OutputFormat, OutputOptions>>;
}

export function defineRollupConfig(
  configOptions: RollupConfigOptions,
  dts: boolean = true,
): RollupOptions[] {
  const outputOptions = normalizeOutputOptions(configOptions);

  const values = Object.entries(outputOptions) as [
    OutputFormat,
    NormalizedOutputOptions,
  ][];

  const configs = configOptions.input.flatMap(
    ({name, path, globalVariableName}): RollupOptions[] => {
      return values.flatMap(([format, options]) => {
        if (options.skip) return [] as RollupOptions[];

        const suffix =
          typeof options.suffix === 'string'
            ? [options.suffix]
            : options.suffix;

        return suffix.map((suffix) => {
          return {
            input: path,
            output: {
              format: options.format,
              file:
                outputOptions[format].file ??
                `./dist/nimble-ui.${name}${suffix}`,
              globals: outputOptions[format].globals,
              name: format == 'umd' ? globalVariableName : undefined,
            },
            external: outputOptions[format].external,
            plugins: commonPlugins(
              configOptions,
              suffix.indexOf('.min') !== -1,
            ),
          } as RollupOptions;
        });
      });
    },
  );

  if (dts) {
    configOptions.input.forEach((item) => {
      configs.push({
        input: item.path,
        output: {
          file: `./dist/${item.name}.d.ts`,
          format: 'es',
        },
        plugins: [
          dtsPlugin({
            tsconfig: path.resolve(rootDir, './utils/tsconfig.lib.json'),
          }),
        ],
      });
    });
  }

  return configs;
}

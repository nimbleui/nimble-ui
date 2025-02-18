import type {
  ExternalOption,
  GlobalsOption,
  Plugin,
  RollupOptions,
} from 'rollup';
import {normalizeOutputOptions} from './normalizeOutputOptions.mjs';
import {commonPlugins} from './commonPlugins.mjs';

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
): RollupOptions[] {
  const outputOptions = normalizeOutputOptions(configOptions);

  const values = Object.entries(outputOptions) as [
    OutputFormat,
    NormalizedOutputOptions,
  ][];

  return configOptions.input.flatMap(
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
}

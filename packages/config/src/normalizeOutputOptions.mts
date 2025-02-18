import type {
  NormalizedOutputOptions,
  OutputFormat,
  RollupConfigOptions,
} from './defineRollupConfig.mjs';

const outputFormats: {
  format: 'esm' | 'cjs' | 'umd';
  type: OutputFormat;
  suffix: string | string[];
}[] = [
  {format: 'esm', type: 'esm', suffix: '.esm.js'},
  {format: 'esm', type: 'mjs', suffix: '.mjs'},
  {format: 'cjs', type: 'cjs', suffix: '.cjs'},
  {format: 'umd', type: 'umd', suffix: ['.umd.js', '.umd.min.js']},
  {format: 'esm', type: 'browser', suffix: ['.browser.js', '.browser.min.js']},
];

export function normalizeOutputOptions(
  options: Pick<RollupConfigOptions, 'globals' | 'outputs'>,
) {
  return outputFormats.reduce(
    (acc, format) => {
      const output = options.outputs?.[format.type];
      if (output === false) {
        return {...acc, [format.type]: {skip: true}};
      }

      const {file, globals = options.globals} = output ?? {};
      return {
        ...acc,
        [format.type]: {
          skip: false,
          globals,
          file,
          external: globals ? Object.keys(globals) : undefined,
          suffix: format.suffix,
          format: format.format,
        },
      };
    },
    {} as Record<OutputFormat, NormalizedOutputOptions>,
  );
}

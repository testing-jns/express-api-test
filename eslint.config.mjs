// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest

import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'app',
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
    },
    ignores: ['.pnpm-store/*'],
  },
  {
    rules: {
      'ts/no-redeclare': 'off',
      // 'ts/consistent-type-definitions': ['error', 'type'],
      'ts/consistent-type-definitions': ['off'],
      'no-console': ['warn'],
      // 'antfu/no-top-level-await': ['off'],
      'antfu/top-level-function': ['off'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['error'],
      'perfectionist/sort-imports': [
        'error',
        {
          tsconfigRootDir: '.',
        },
      ],
      // 'unicorn/filename-case': ['error', {
      //   case: 'camelCase',
      //   ignore: ['README.md'],
      // }],
    },
  },
);

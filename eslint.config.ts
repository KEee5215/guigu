import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import path from 'path'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname),
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        alias: {
          map: [['@', path.resolve(__dirname, './src')]],
          extensions: ['.js', '.ts', '.vue'],
        },
      },
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
])

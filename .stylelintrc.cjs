// stylelint.config.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss', // SCSS 规则
    'stylelint-config-standard-vue/scss', // ✅ 正确的 Vue + SCSS 规则（注意包名！）
    'stylelint-config-prettier', // 兼容 Prettier
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order', // 用于属性排序
  ],
  overrides: [
    // 处理 .scss 和 .css 文件
    {
      files: ['**/*.{scss,css}'],
      customSyntax: 'postcss-scss',
    },
    // 处理 .vue 和 .html 中的 <style> 块（即使里面是 scss）
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  rules: {
    'value-keyword-case': null,
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'no-empty-source': null,
    'selector-class-pattern': null,
    'property-no-unknown': null,
    'block-opening-brace-space-before': 'always',
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
    // 启用 stylelint-order 的属性排序（可选）
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      'at-rules',
    ],
    'order/properties-alphabetical-order': true,
  },
}

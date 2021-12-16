module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // "parserOptions": {
  //   "ecmaVersion": 6,
  //   "sourceType": "module"
  // },
  // "off"或者0 //关闭规则关闭
  // "warn"或者1 //在打开的规则作为警告（不影响退出代码）
  // "error"或者2 //把规则作为一个错误（退出代码触发时为1）
  rules: {
    'vue/this-in-template': 0, // 在vue的template中可以使用this
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off', // 生成器函数*的前后空格
    'no-mixed-operators': 0, // 禁止混合使用不同的操作符
    'vue/max-attributes-per-line': [
      // 多个特性的元素应该分多行撰写，每个特性一行。通常为
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'space-before-function-paren': 0, // 函数名后不要加空格, prettier未有相关配置
    'arrow-parens': ['error', 'as-needed'], // 要求箭头函数的参数可以省略圆括号时必须省略，配合prettier
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'no-tabs': 0,
    'vue/no-v-html': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    'no-delete-var': 2,
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false
      }
    ],
    'template-curly-spacing': 'off',
    indent: 'off'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}

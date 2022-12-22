const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	env: {
		// 环境
		browser: true, // 浏览器环境中的全局变量。
		node: true, // Node.js 全局变量和 Node.js 作用域。
		es6: true, // 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
	},
	parser: "vue-eslint-parser", // 解析器
	parserOptions: {
		// 解析器配置
		parser: "@typescript-eslint/parser", // 解析器
		ecmaVersion: "latest", // 5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用年份命名的版本号，你也可以用 latest 来指向最新的版本。
		sourceType: "module", // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
		jsxPragma: "React", // 支持 ReactJSX 语法
		ecmaFeatures: {
			// 表示你想使用的额外的语言特性
			jsx: true, // 启用 JSX
		},
	},
	extends: [
		"plugin:vue/vue3-recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:prettier/recommended", // 一定要放在最后。因为 extends 中后引入的规则会覆盖前面的规则。
	],
	rules: {
		// @typescript-eslint
		"@typescript-eslint/explicit-function-return-type": "off", // 需要函数和类方法的显式返回类型
		"@typescript-eslint/no-explicit-any": "off", // 禁止使用该 any 类型
		"@typescript-eslint/no-var-requires": "off", // 不允许使用 require 语句，除了在 import 语句中
		"@typescript-eslint/no-empty-function": "off", // 禁止空函数
		"@typescript-eslint/no-use-before-define": "off", // 在定义之前禁止使用变量
		"@typescript-eslint/ban-ts-comment": "off", // 禁止 @ts-<directive> 使用评论或在指令后要求描述
		"@typescript-eslint/ban-types": "off", // 禁止使用特定类型
		"@typescript-eslint/no-non-null-assertion": "off", // '!'不允许使用后缀运算符的非空断言
		"@typescript-eslint/explicit-module-boundary-types": "off", // 需要导出函数和类的公共类方法的显式返回和参数类型
		"vue/v-on-event-hyphenation": "off",
		// "@typescript-eslint/no-unused-vars": [
		// 	"error",
		// 	{
		// 		argsIgnorePattern: "^_",
		// 		varsIgnorePattern: "^_",
		// 	},
		// ], // 禁止未使用的变量
		// vue
		"vue/custom-event-name-casing": "off", // 为自定义事件名称强制使用特定大小写
		"vue/attributes-order": "off", // 强制执行属性顺序
		"vue/one-component-per-file": "off", // 强制每个组件都应该在自己的文件中
		"vue/html-closing-bracket-newline": "off", // 在标签的右括号之前要求或禁止换行
		"vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行符
		"vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行符
		"vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
		"vue/require-default-prop": "off", // 需要 props 的默认值
		"vue/html-self-closing": "off", // 执行自闭合的风格
		"vue/max-attributes-per-line": "off", // 强制每行属性的最大数量
		"vue/multi-word-component-names": "off", // 是否开启组件命名规则校验（强制多个单词以驼峰或'-'链接的命名规则）
		// ESLint
		"no-use-before-define": "off", // 禁止在变量定义之前使用它们
		"space-before-function-paren": "off", // 强制在 function的左括号之前使用一致的空格
		"prefer-const": "off",
	},
});

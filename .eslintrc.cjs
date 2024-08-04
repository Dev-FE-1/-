module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'react-app',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
	rules: {
		'no-console': 'warn',
		'no-unused-vars': 'warn',
		'import/no-anonymous-default-export': [
			2,
			{
				allowObject: true,
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: true,
				},
			},
		],
		'no-useless-rename': 'error',
		'object-shorthand': 'error',
		'react/jsx-key': ['error', { checkFragmentShorthand: true }],
		'react/react-in-jsx-scope': 'off', // React 17+에서는 필요 없앴음
		'prettier/prettier': [
			'error',
			{
				printWidth: 100,
				tabWidth: 4,
				singleQuote: true,
				bracketSpacing: true,
				semi: true,
				useTabs: true,
				trailingComma: 'all',
				quoteProps: 'as-needed',
				jsxSingleQuote: false,
				arrowParens: 'always',
				endOfLine: 'auto',
				jsxBracketSameLine: false,
				requirePragma: false,
				insertPragma: false,
				proseWrap: 'preserve',
				htmlWhitespaceSensitivity: 'css',
			},
		],
		'@typescript-eslint/no-non-null-assertion': 'off', // 비활성화 - 이거 안하면 경고 뜸
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
	},
};

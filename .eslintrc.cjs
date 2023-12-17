module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		browser,
		"jest/globals": true,
	},
	extends: [
		"eslint:recommended",
		"standard",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	settings: {
		react: { version: detect },
		jest: {
			version: "detect",
			globalAliases: {
				describe: ["context"],
				fdescribe: ["fcontext"],
				xdescribe: ["xcontext"],
			},
		},
	},
	plugins: ["react", "jest", "prettier", "react-refresh"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
	},
};

module.exports = {
    "env": {
        "node": true,
        "es2021": true,
        "jest/globals": true
    },
    "plugins": ["jest"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "project": './tsconfig.json',
        "extraFileExtensions": ['.cjs']
    },
    "rules": {
        "indent": ["error", 2],
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "eqeqeq": "error",
        "default-case": "error",
        "array-bracket-spacing": "warn",
        "camelcase": "warn",
        "comma-spacing": "warn",
        "key-spacing": "warn",
        "no-mixed-spaces-and-tabs": "error",
        "space-before-function-paren": ["error", "never"],
        "spaced-comment": "warn",
        "prefer-const": "error",
        "block-spacing": "error",
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "keyword-spacing": "warn",
        "no-multiple-empty-lines": "warn",
        "space-infix-ops": "warn",
        "no-multi-spaces": "warn",
        "space-before-blocks": "warn",
        "semi-spacing": ["error", {"before": false, "after": true}],
        "object-curly-spacing": ["error", "always"],
        "@typescript-eslint/member-delimiter-style": "error",
        "@typescript-eslint/no-var-requires": "off",
        "no-unused-vars": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-types": "off"
    }
};

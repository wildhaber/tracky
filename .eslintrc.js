module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],

        "comma-dangle": ["error", "only-multiline"],
        "no-unused-vars": "warn",
        "no-console": "off",
        "no-undef": "off",
    },
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        }
    }
};


// airbnb-typescript-prettier combines the settings 
// recommended by airbnb for eslint and prettier in
// a typescript context.
// https://github.com/toshi-toma/eslint-config-airbnb-typescript-prettier

module.exports = {
  extends: "airbnb-typescript-prettier",
  overrides: [
    {
      "files": [
        "*.ts"
      ],
      "rules": {
        "no-console": "off"
      }
    }
  ]
};
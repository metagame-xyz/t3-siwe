/** @type {import("prettier").Config} */
module.exports = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    singleQuote: true,
    semi: false,
    tabWidth: 4,
    trailingComma: 'all',

    importOrder: [
        '^react$|^next$',
        '<THIRD_PARTY_MODULES>',
        '^env/(.*)$',
        '^server/(.*)$',
        '^utils(.*)$',
        '^pages/(.*)$',
        '^api/(.*)$',
        '^components/(.*)$',
        '^styles/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,
}

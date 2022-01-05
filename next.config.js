const withAntdLess = require('next-plugin-antd-less');


module.exports = withAntdLess({
  // optional: you can modify antd less variables directly here
  modifyVars: { '@primary-color': '#FCD535' },
  lessVarsFilePath: './styles/variables.less',
  // Other Config Here...

  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ["en", "cn"],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path.
     */
    defaultLocale: "cn",
  },
  reactStrictMode: true,
})
// {
//   i18n: {
//     /**
//      * Provide the locales you want to support in your application
//      */
//     locales: ["en", "cn"],
//     /**
//      * This is the default locale you want to be used when visiting
//      * a non-locale prefixed path.
//      */
//     defaultLocale: "cn",
//   },
//   reactStrictMode: true,
// }

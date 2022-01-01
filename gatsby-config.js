module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "BoilerPlate",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`cn`, `en`,],
        defaultLanguage: `cn`,
        fallbackLng: 'cn',
        siteUrl: `http://localhost:8000/`,
        i18nextOptions: {
          interpolation: {
            escapeValue: false
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
        ]
      }
    }],
};

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "One Bot",
  },
  flags: {
    PARALLEL_QUERY_RUNNING: true
  },
  plugins: [`gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': '#FCD535',
              'text-color' : 	'#000000',
              'link-color' : '#000000',
            }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true
      }
    },
  ],
};

module.exports = {
  pathPrefix: "/",
  siteMetadata: require("./site-metadata.json"),
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-data`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon-16x16.png`,
        name: `Gavin Samuels Website`,
        short_name: `Gavin Samuels`,
        start_url: `/`,
        background_color: `#263547`,
        theme_color: `#e64848`,
        display: `standalone`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-stackbit-static-sass`,
      options: {
        inputFile: `${__dirname}/src/sass/main.scss`,
        outputFile: `${__dirname}/public/assets/css/main.css`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-component`]
      }
    },
    {
      resolve: `gatsby-remark-page-creator`,
      options: {}
    },
    {
      resolve: `@stackbit/gatsby-plugin-menus`,
      options: {
        sourceUrlPath: `fields.url`,
        pageContextProperty: `menus`,
        menus: require("./src/data/menus.json")
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-151955170-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0
        // Enables Google Optimize using your container Id
        //   optimizeId: "",
        // Enables Google Optimize Experiment ID
        //   experimentId: "",
        // Set Variation ID. 0 for original 1,2,3....
        //   variationId: "",
        // Any additional optional fields
        //   sampleRate: 5,
        //   siteSpeedSampleRate: 10,
        //   cookieDomain: "example.com",
      }
    }
  ]
};

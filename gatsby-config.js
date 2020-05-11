module.exports = {
  siteMetadata: {
    title: `Alif Akbar Site`,
    description: `Blog of whom love to learn new things and challenge himself.`,
    author: `Muhammad Alif Akbar`,
    site: `alifakbar.com`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
        name: "content",
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "assets/img",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              withWebp: true,
              loading: "lazy",
            },
          },
          {
            resolve: `gatsby-remark-images-native-lazy-load`,
            options: {
              loading: "lazy", // "lazy" | "eager" | "auto"
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alif Akbar Site`,
        short_name: `Personal Site`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `static/assets/web-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        htmlTitle: `Alif Blog CMS`,
        htmlFavicon: `static/assets/icon-48x48.png`,
      },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};

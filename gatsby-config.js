const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `👨‍💻 EdissonReinozo.com`,
    description: `Artículos de React, Flutter y AWS.`,
    author: `Edisson Reinozo`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/pages`,
    //     name: `markdown-pages`,
    //   },
    // },
    // `gatsby-transformer-remark`,

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          articles: require.resolve('./src/templates/articles-layout.js'),
          // default: require.resolve('./src/components/default-page-layout.js'),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       {
    //         resolve: `gatsby-remark-prismjs`,
    //         options: {
    //           classPrefix: 'language-',
    //           inlineCodeMarker: null,

    //           aliases: {},
    //           showLineNumbers: false,
    //           noInlineHighlight: false,
    //           languageExtensions: [
    //             {
    //               language: 'superscript',
    //               extend: 'javascript',
    //               definition: {
    //                 superscript_types: /(SuperType)/,
    //               },
    //               insertBefore: {
    //                 function: {
    //                   superscript_keywords: /(superif|superelse)/,
    //                 },
    //               },
    //             },
    //           ],
    //           prompt: {
    //             user: 'root',
    //             host: 'localhost',
    //             global: false,
    //           },
    //           escapeEntities: {},
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal['400'],
        display: `minimal-ui`,
        icon: `src/images/tailwind-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};

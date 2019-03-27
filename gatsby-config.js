const { config } = require('dotenv')

config()

const oneWeekAgo = new Date()
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
const oneWeekAgoSeconds = Math.floor(oneWeekAgo.getTime() / 1000)

module.exports = {
  siteMetadata: {
    title: 'Jack Cross',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-transformer-json',
      options: {
        typeName: `Json`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-foursquare-checkins',
      options: {
        beforeTimestamp: oneWeekAgoSeconds,
        token: process.env.FOURSQUARE_ACCESS_TOKEN,
        staticMap: {
          zoom: '15',
          size: '400x400',
          scale: '2',
          maptype: 'roadmap',
          key: process.env.GOOGLE_KEY,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-131786655-1',
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/favicon.png',

        appName: 'Palmer',
        dir: 'rtl',
        lang: 'en-US',
        background: '#fff',
        theme_color: '#000',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          opengraph: true,
          twitter: true,
          yandex: true,
          windows: true,
        },
      },
    },
    'gatsby-plugin-remove-serviceworker',
  ],
}

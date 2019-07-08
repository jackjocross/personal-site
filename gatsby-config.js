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
      resolve: 'gatsby-source-goodreads-shelves',
      options: {
        key: process.env.GOODREADS_KEY,
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
    'gatsby-transformer-favicons',
  ],
}

const { config } = require('dotenv')

config()

const oneWeekAgo = new Date()
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
const oneWeekAgoSeconds = Math.floor(oneWeekAgo.getTime() / 1000)

module.exports = {
  siteMetadata: {
    title: 'Jack Cross',
    url: process.env.NODE_ENV === 'production' ? process.env.URL : '',
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
    // {
    //   resolve: 'gatsby-source-goodreads-shelves',
    //   options: {
    //     key: process.env.GOODREADS_KEY,
    //   },
    // },
    {
      resolve: 'gatsby-source-unsplash-user',
      options: {
        key: process.env.UNSPLASH_KEY,
        user: 'crossprocess',
      },
    },
    {
      resolve: 'gatsby-source-spotify-top-artists',
      options: {
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
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
    {
      resolve: 'gatsby-transformer-og-image',
      options: {
        fontPath: './fonts/Rubik-Regular.ttf',
        fontColor: '#000000',
        backgroundColor: '#ffffff',
      },
    },
  ],
}

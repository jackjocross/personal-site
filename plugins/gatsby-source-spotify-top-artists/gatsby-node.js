const axios = require('axios')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest, store, cache },
  pluginOptions
) => {
  const {
    data: { access_token: spotifyAccessToken },
  } = await axios.post(
    `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${
      pluginOptions.refreshToken
    }&client_id=${pluginOptions.clientId}&client_secret=${
      pluginOptions.clientSecret
    }`
  )

  const {
    data: { items },
  } = await axios.get(
    `https://api.spotify.com/v1/me/top/artists?time_range=short_term`,
    { headers: { Authorization: `Bearer ${spotifyAccessToken}` } }
  )

  for (let artist of items) {
    const artistId = createNodeId(artist.id)
    const artistContent = JSON.stringify(artist)

    const artistImage = await createRemoteFileNode({
      url: artist.images[0].url,
      store,
      cache,
      createNode,
      createNodeId,
    })

    createNode({
      ...artist,
      id: artistId,
      parent: null,
      children: [artistImage.id],
      internal: {
        type: 'SpotifyArtist',
        contentDigest: createContentDigest(artistContent),
        content: artistContent,
      },
    })
  }
}

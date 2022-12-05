const https = require('https')
const axios = require('axios')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest, store, cache },
  pluginOptions
) => {
  const httpsAgent = new https.Agent({
    // TODO: not ideal but allowing unauthorized for now to avoid spending hours on gatsby upgrades
    rejectUnauthorized: false,
  })

  const {
    data,
  } = await axios.get(
    `https://api.foursquare.com/v2/users/self/checkins?beforeTimestamp=${pluginOptions.beforeTimestamp}&oauth_token=${pluginOptions.token}&v=20181227`,
    { httpsAgent }
  )

  for (let checkin of data.response.checkins.items) {
    const checkinId = createNodeId(checkin.id)
    const checkinContent = JSON.stringify(checkin)

    const { lat, lng } = checkin.venue.location
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&markers=${lat},${lng}&zoom=${pluginOptions.staticMap.zoom}&size=${pluginOptions.staticMap.size}&scale=${pluginOptions.staticMap.scale}&maptype=${pluginOptions.staticMap.maptype}&key=${pluginOptions.staticMap.key}`

    const staticMap = await createRemoteFileNode({
      url,
      store,
      cache,
      createNode,
      createNodeId,
    })

    createNode({
      ...checkin,
      id: checkinId,
      parent: null,
      children: [staticMap.id],
      internal: {
        type: 'FoursquareCheckin',
        contentDigest: createContentDigest(checkinContent),
        content: checkinContent,
      },
    })
  }
}

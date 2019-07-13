const axios = require('axios')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest, store, cache },
  pluginOptions
) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/users/${
      pluginOptions.user
    }/photos?per_page=100&order_by=latest&client_id=${pluginOptions.key}`
  )

  for (let image of data) {
    const imageId = createNodeId(image.id)
    const imageContent = JSON.stringify(image)

    const imageFile = await createRemoteFileNode({
      url: image.urls.regular,
      store,
      cache,
      createNode,
      createNodeId,
    })

    createNode({
      ...image,
      id: imageId,
      parent: null,
      children: [imageFile.id],
      internal: {
        type: 'UnsplashImage',
        contentDigest: createContentDigest(imageContent),
        content: imageContent,
      },
    })
  }
}

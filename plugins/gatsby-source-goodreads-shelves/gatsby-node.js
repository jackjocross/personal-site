const axios = require('axios')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { parseString } = require('xml2js')

async function parseXml(xml) {
  return new Promise(resolve => {
    parseString(xml, (err, result) => {
      resolve(result)
    })
  })
}

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest, store, cache },
  pluginOptions
) => {
  const { data: xml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&per_page=200&key=${
      pluginOptions.key
    }`
  )

  const data = await parseXml(xml)

  for (let rawBook of data.GoodreadsResponse.reviews[0].review) {
    const {
      book: [
        {
          id: [{ _: id }],
          title: [title],
          link: [bookLink],
          image_url: [imageUrl],
          authors: [
            {
              author: [
                {
                  name: [name],
                  link: [authorLink],
                },
              ],
            },
          ],
        },
      ],
      shelves: [
        {
          shelf: thing,
          shelf: [
            {
              $: { name: shelf },
            },
          ],
        },
      ],
    } = rawBook

    const fullImageUrl = imageUrl.replace(/\._(.*)_/g, '')
    const book = {
      id,
      title,
      bookLink,
      hasCoverImage: !imageUrl.includes('nophoto'),
      name,
      shelf,
      authorLink,
    }
    const bookId = createNodeId(id)
    const bookContent = JSON.stringify(book)

    const bookCover = await createRemoteFileNode({
      url: fullImageUrl,
      store,
      cache,
      createNode,
      createNodeId,
    })

    createNode({
      ...book,
      id: bookId,
      parent: null,
      children: [bookCover.id],
      internal: {
        type: 'GoodreadsBook',
        contentDigest: createContentDigest(bookContent),
        content: bookContent,
      },
    })
  }
}

const fs = require('fs-extra')
const axios = require('axios')
const { image } = require('image-downloader')
const md5 = require('md5')
const { parseString } = require('xml2js')

async function parseXml(xml) {
  return new Promise(resolve => {
    parseString(xml, (err, result) => {
      resolve(result)
    })
  })
}

async function filterGoodreads(data) {
  const filteredData = data.GoodreadsResponse.reviews[0].review.map(
    ({
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
    }) => ({
      id,
      title,
      bookLink,
      imageUrl: imageUrl.replace(/(?<=\d)[s|m|l]/g, 'l'),
      name,
      authorLink,
    })
  )

  for (let index = 0; index < filteredData.length; index++) {
    const { imageUrl: url } = filteredData[index]

    if (url.includes('nophoto')) {
      continue
    }

    const imagePath = `goodreads-${md5(url)}.jpg`

    await image({
      url,
      dest: `./images/${imagePath}`,
    })

    filteredData[index].imagePath = imagePath
  }

  return filteredData
}

async function getGoodreadsData() {
  const { data: readXml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&shelf=read&per_page=200&key=${
      process.env.GOODREADS_KEY
    }`
  )
  const read = await filterGoodreads(await parseXml(readXml))

  const { data: currentlyReadingXml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&shelf=currently-reading&per_page=200&key=${
      process.env.GOODREADS_KEY
    }`
  )
  const currentlyReading = await filterGoodreads(
    await parseXml(currentlyReadingXml)
  )

  fs.writeFileSync(
    './data/goodreads.json',
    JSON.stringify({ read, currentlyReading })
  )
}

getGoodreadsData()

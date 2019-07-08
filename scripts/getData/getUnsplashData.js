const fs = require('fs-extra')
const axios = require('axios')
const { image } = require('image-downloader')
const md5 = require('md5')

async function getUnsplashData() {
  const { data } = await axios.get(
    `https://api.unsplash.com/users/crossprocess/photos?per_page=20&order_by=popular&client_id=${
      process.env.UNSPLASH_KEY
    }`
  )

  const filteredData = data.map(
    ({
      id,
      description,
      urls: { regular: imageUrl },
      links: { html: url },
    }) => ({
      id,
      description,
      url,
      imageUrl,
    })
  )

  for (let index = 0; index < filteredData.length; index++) {
    const { imageUrl: url } = filteredData[index]
    const imagePath = `unsplash-${md5(url)}.jpg`

    await image({
      url,
      dest: `./data-images/${imagePath}`,
    })

    filteredData[index].imagePath = imagePath
  }

  fs.writeFileSync('./data/unsplash.json', JSON.stringify(filteredData))
}

getUnsplashData()

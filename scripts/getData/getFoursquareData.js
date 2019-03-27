const fs = require('fs-extra')
const axios = require('axios')
const { image } = require('image-downloader')
const md5 = require('md5')

async function getFoursquareData() {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const oneWeekAgoSeconds = Math.floor(oneWeekAgo.getTime() / 1000)

  const { data } = await axios.get(
    `https://api.foursquare.com/v2/users/self/checkins?beforeTimestamp=${oneWeekAgoSeconds}&oauth_token=${
      process.env.FOURSQUARE_ACCESS_TOKEN
    }&v=20181227`
  )

  const filteredData = data.response.checkins.items.map(
    ({
      id,
      venue: {
        name,
        location: { lat, lng },
      },
    }) => ({ id, name, lat, lng })
  )

  for (let index = 0; index < filteredData.length; index++) {
    const { lat, lng } = filteredData[index]

    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&markers=${lat},${lng}&zoom=15&size=400x400&scale=2&maptype=roadmap&key=${
      process.env.GOOGLE_KEY
    }`
    const imagePath = `foursquare-${md5(url)}.png`

    await image({
      url,
      dest: `./images/${imagePath}`,
    })

    filteredData[index].imagePath = imagePath
  }

  fs.writeFileSync('./data/foursquare.json', JSON.stringify(filteredData))
}

getFoursquareData()

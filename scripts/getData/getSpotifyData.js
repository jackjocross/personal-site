const fs = require('fs-extra')
const axios = require('axios')
const { image } = require('image-downloader')
const md5 = require('md5')

async function getSpotifyData() {
  const {
    data: { access_token: spotifyAccessToken },
  } = await axios.post(
    `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${
      process.env.SPOTIFY_REFRESH_TOKEN
    }&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${
      process.env.SPOTIFY_CLIENT_SECRET
    }`
  )

  const { data } = await axios.get(
    `https://api.spotify.com/v1/me/top/artists?time_range=short_term`,
    { headers: { Authorization: `Bearer ${spotifyAccessToken}` } }
  )

  const filteredData = data.items.map(
    ({
      id,
      name,
      external_urls: { spotify: spotifyUrl },
      images: [{ url: imageUrl }],
    }) => ({
      id,
      name,
      spotifyUrl,
      imageUrl,
    })
  )

  for (let index = 0; index < filteredData.length; index++) {
    const { imageUrl: url } = filteredData[index]
    const imagePath = `spotify-${md5(url)}.jpg`

    await image({
      url,
      dest: `./images/${imagePath}`,
    })

    filteredData[index].imagePath = imagePath
  }

  fs.writeFileSync('./data/spotify.json', JSON.stringify(filteredData))
}

getSpotifyData()

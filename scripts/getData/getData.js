const fs = require('fs-extra')
const { config } = require('dotenv')
const { exec } = require('child_process')

config()

fs.removeSync('./data')
fs.mkdirSync('./data')

fs.removeSync('./images')
fs.mkdirSync('./images')

function logOutput(error, stdout, stderr) {
  if (error) {
    console.log(error)
  }

  if (stdout) {
    console.log(stdout)
  }

  if (stderr) {
    console.log(stderr)
  }
}

exec(
  'node ./scripts/data/getFoursquareData.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/data/getGithubData.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/data/getGoodreadsData.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/data/getSpotifyData.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/data/getUnsplashData.js',
  {
    env: process.env,
  },
  logOutput
)

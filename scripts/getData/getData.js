const fs = require('fs-extra')
const { config } = require('dotenv')
const { exec } = require('child_process')

config()

fs.removeSync('./data')
fs.mkdirSync('./data')

fs.removeSync('./data-images')
fs.mkdirSync('./data-images')

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
  'node ./scripts/getData/getGithubData.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/getData/getSpotifyData.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/getData/getUnsplashData.js',
  {
    env: process.env,
  },
  logOutput
)

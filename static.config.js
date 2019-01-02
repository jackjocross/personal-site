import fs from 'fs';
import { config } from 'dotenv';
import axios from 'axios';
import { parseString } from 'xml2js';

config();

const parseXml = async xml =>
  new Promise(resolve => {
    parseString(xml, (err, result) => {
      resolve(result);
    });
  });

export default {
  siteRoot: 'https://cross.cool',
  getRoutes: () => [
    {
      path: '/',
      getData: async () => {
        if (fs.existsSync('./.cache')) {
          return JSON.parse(fs.readFileSync('.cache', 'utf8'));
        }

        const data = {
          foursquare: await getFoursquareData(),
          github: await getGithubData(),
          goodreads: await getGoodreadsData(),
          spotify: await getSpotifyData(),
        };

        fs.writeFileSync('./.cache', JSON.stringify(data));

        return data;
      },
    },
  ],
};

async function getFoursquareData() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoSeconds = Math.floor(oneWeekAgo.getTime() / 1000);

  const { data } = await axios.get(
    `https://api.foursquare.com/v2/users/self/checkins?beforeTimestamp=${oneWeekAgoSeconds}&oauth_token=${
      process.env.FOURSQUARE_ACCESS_TOKEN
    }&v=20181227`
  );

  return data;
}

async function getGithubData() {
  const { data } = await axios.get(
    'https://api.github.com/search/commits?q=author:crosscompile&sort=author-date',
    {
      headers: {
        Accept: 'application/vnd.github.cloak-preview',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  return data;
}

async function getGoodreadsData() {
  const { data: readXml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&shelf=read&per_page=200&key=${
      process.env.GOODREADS_KEY
    }`
  );
  const read = await parseXml(readXml);

  const { data: currentlyReadingXml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&shelf=currently-reading&per_page=200&key=${
      process.env.GOODREADS_KEY
    }`
  );
  const currentlyReading = await parseXml(currentlyReadingXml);

  const { data: toReadXml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&shelf=to-read&per_page=200&key=${
      process.env.GOODREADS_KEY
    }`
  );
  const toRead = await parseXml(toReadXml);

  return {
    read,
    currentlyReading,
    toRead,
  };
}

async function getSpotifyData() {
  const {
    data: { access_token: spotifyAccessToken },
  } = await axios.post(
    `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${
      process.env.SPOTIFY_REFRESH_TOKEN
    }&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${
      process.env.SPOTIFY_CLIENT_SECRET
    }`
  );

  const { data } = await axios.get(
    `https://api.spotify.com/v1/me/top/artists?time_range=short_term`,
    { headers: { Authorization: `Bearer ${spotifyAccessToken}` } }
  );

  return data;
}

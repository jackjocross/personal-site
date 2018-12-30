import { config } from 'dotenv';
import axios from 'axios';
import { parseString } from 'xml2js';

import fs from 'fs';

config();

const parseXml = async xml =>
  await new Promise((resolve, reject) => {
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
        return JSON.parse(fs.readFileSync('./data.json', 'utf8'));

        // Foursquare
        const { data: foursquare } = await axios.get(
          `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${
            process.env.FOURSQUARE_ACCESS_TOKEN
          }&v=20181227`
        );

        // Github
        const { data: github } = await axios.get(
          'https://api.github.com/search/commits?q=author:crosscompile&sort=author-date',
          {
            headers: {
              Accept: 'application/vnd.github.cloak-preview',
              Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
            },
          }
        );

        // Goodreads
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

        // Spotify
        const {
          data: { access_token: spotifyAccessToken },
        } = await axios.post(
          `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${
            process.env.SPOTIFY_REFRESH_TOKEN
          }&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${
            process.env.SPOTIFY_CLIENT_SECRET
          }`
        );

        const { data: spotify } = await axios.get(
          `https://api.spotify.com/v1/me/top/artists?time_range=short_term`,
          { headers: { Authorization: `Bearer ${spotifyAccessToken}` } }
        );

        return {
          foursquare,
          github,
          goodreads: {
            read,
            toRead,
            currentlyReading,
          },
          spotify,
        };
      },
    },
  ],
};

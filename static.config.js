import React from 'react';
import fs from 'fs';
import { config } from 'dotenv';
import axios from 'axios';
import { parseString } from 'xml2js';
import { image as downloadImage } from 'image-downloader';
import md5 from 'md5';
import lqip from 'lqip';

config();

async function parseXml(xml) {
  return new Promise(resolve => {
    parseString(xml, (err, result) => {
      resolve(result);
    });
  });
}

async function downloadImageGeneratePlaceholder(url, extension) {
  const fileName = md5(url);
  const path = `/${fileName}.${extension}`;
  const dest = `./dist${path}`;

  await downloadImage({
    url,
    dest,
  });

  const placeholder = await lqip.base64(dest);

  return { path, placeholder };
}

export default {
  siteRoot: 'https://cross.cool',
  Document: ({ Html, Head, Body, children }) => (
    <Html lang="en-US">
      <Head>
        <title>Jack Cross</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-131786655-1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALTICS}');`,
          }}
        />
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
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
          unsplash: await getUnsplashData(),
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

  const filteredData = data.response.checkins.items.map(
    ({
      id,
      venue: {
        name,
        location: { lat, lng },
      },
    }) => ({ id, name, lat, lng })
  );

  for (let index = 0; index < filteredData.length; index++) {
    const { lat, lng } = filteredData[index];

    // eslint-disable-next-line
    const { path, placeholder } = await downloadImageGeneratePlaceholder(
      `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&markers=${lat},${lng}&zoom=15&size=400x400&scale=2&maptype=roadmap&key=${
        process.env.GOOGLE_KEY
      }`,
      'png'
    );

    filteredData[index].imagePath = path;
    filteredData[index].placeholderUri = placeholder;
  }

  return filteredData;
}

async function getGithubData() {
  // @todo stop being a savage and use a client library for this
  const { data } = await axios.post(
    'https://api.github.com/graphql',
    {
      query: `
        query { 
          user(login: "crosscompile") {
            pinnedRepositories(first: 20) {
              nodes {
                id
                name
                description
                url
                owner {
                  login
                  url
                }
              }
            }
            repositoriesContributedTo(privacy: PUBLIC, first: 20, includeUserRepositories: false, contributionTypes: COMMIT, orderBy: {field: STARGAZERS, direction: DESC}) {
              nodes {
                id
                name
                description
                url
                owner {
                  login
                  url
                }
              }
            }
            
          }
        }
      `,
    },
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  return {
    pinned: data.data.user.pinnedRepositories.nodes,
    contributed: data.data.user.repositoriesContributedTo.nodes,
  };
}

async function filterGoodreads(data) {
  const filteredData = data.GoodreadsResponse.reviews[0].review.map(
    ({
      book: [
        {
          id,
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
  );

  for (let index = 0; index < filteredData.length; index++) {
    const { imageUrl } = filteredData[index];

    // eslint-disable-next-line
    const { path, placeholder } = await downloadImageGeneratePlaceholder(
      imageUrl,
      'jpg'
    );

    filteredData[index].imagePath = path;
    filteredData[index].placeholderUri = placeholder;
  }

  return filteredData;
}

async function getGoodreadsData() {
  const { data: readXml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&shelf=read&per_page=200&key=${
      process.env.GOODREADS_KEY
    }`
  );
  const read = await filterGoodreads(await parseXml(readXml));

  const { data: currentlyReadingXml } = await axios.get(
    `https://www.goodreads.com/review/list?v=2&id=49614500&shelf=currently-reading&per_page=200&key=${
      process.env.GOODREADS_KEY
    }`
  );
  const currentlyReading = await filterGoodreads(
    await parseXml(currentlyReadingXml)
  );

  return {
    read,
    currentlyReading,
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
  );

  for (let index = 0; index < filteredData.length; index++) {
    const { imageUrl } = filteredData[index];

    // eslint-disable-next-line
    const { path, placeholder } = await downloadImageGeneratePlaceholder(
      imageUrl,
      'jpg'
    );

    filteredData[index].imagePath = path;
    filteredData[index].placeholderUri = placeholder;
  }

  return filteredData;
}

async function getUnsplashData() {
  const { data } = await axios.get(
    `https://api.unsplash.com/users/crossprocess/photos?per_page=20&order_by=popular&client_id=${
      process.env.UNSPLASH_KEY
    }`
  );

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
  );

  for (let index = 0; index < filteredData.length; index++) {
    const { imageUrl } = filteredData[index];

    // eslint-disable-next-line
    const { path, placeholder } = await downloadImageGeneratePlaceholder(
      imageUrl,
      'jpg'
    );

    filteredData[index].imagePath = path;
    filteredData[index].placeholderUri = placeholder;
  }

  return filteredData;
}

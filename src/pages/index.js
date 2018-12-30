import React from 'react';
import { RouteData } from 'react-static';
import Helmet from 'react-helmet';
import { theme } from '../theme';
import { SummaryList } from '../components/SummaryList';
import { GithubCard } from '../components/GithubCard';
import { GoodreadsCard } from '../components/GoodreadsCard';
import { SpotifyCard } from '../components/SpotifyCard';
import { FoursquareCard } from '../components/FoursquareCard';

const Index = () => (
  <>
    <Helmet>
      <title>Jack Cross</title>
    </Helmet>
    <h1 css={{ fontSize: '5rem', textAlign: 'center' }}>JC</h1>
    <RouteData>
      {({ github, goodreads, spotify, foursquare }) => (
        <div
          css={{
            margin: `${theme.space.medium} 0`,
          }}
        >
          <SummaryList emoji="💻" title="What I'm" titleStrong="Coding">
            {github.items.map(item => (
              <GithubCard {...item} />
            ))}
          </SummaryList>
          <SummaryList emoji="📖" title="What I'm" titleStrong="Reading">
            {goodreads.currentlyReading.GoodreadsResponse.reviews[0].review.map(
              book => (
                <GoodreadsCard {...book} />
              )
            )}
            {goodreads.read.GoodreadsResponse.reviews[0].review.map(book => (
              <GoodreadsCard {...book} />
            ))}
          </SummaryList>
          <SummaryList emoji="🎧" title="What I'm" titleStrong="Listening To">
            {spotify.items.map(item => (
              <SpotifyCard {...item} />
            ))}
          </SummaryList>
          <SummaryList emoji="🗺" title="Where I'm" titleStrong="Going">
            {foursquare.response.checkins.items.map(item => (
              <FoursquareCard {...item} />
            ))}
          </SummaryList>
        </div>
      )}
    </RouteData>
    <div
      css={{
        padding: theme.space.xxlarge,
        textAlign: 'center',
        fontSize: theme.fontSize.xlarge,
        background: theme.color.black,
        color: theme.color.white,
      }}
    >
      Say Hello 👋
    </div>
  </>
);

export default Index;

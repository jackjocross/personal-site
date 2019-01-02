import React from 'react';
import { RouteData } from 'react-static';
import Helmet from 'react-helmet';
import { theme } from '../theme';
import { SummaryList } from '../components/SummaryList';
import { GithubCard } from '../components/GithubCard';
import { GoodreadsCard } from '../components/GoodreadsCard';
import { SpotifyCard } from '../components/SpotifyCard';
import { FoursquareCard } from '../components/FoursquareCard';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';

const Index = () => (
  <>
    <Helmet>
      <title>Jack Cross</title>
    </Helmet>
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        padding: theme.space.xxlarge,
      }}
    >
      <Logo width={150} height={150} />
    </div>
    <RouteData>
      {({ github, goodreads, spotify, foursquare }) => (
        <div
          css={{
            margin: `${theme.space.medium} 0`,
          }}
        >
          <SummaryList emoji="💻" title="What I'm" titleStrong="Coding">
            {github.items.map(item => (
              <GithubCard key={item.sha} {...item} />
            ))}
          </SummaryList>
          <SummaryList emoji="📖" title="What I'm" titleStrong="Reading">
            {goodreads.currentlyReading.GoodreadsResponse.reviews[0].review.map(
              book => (
                <GoodreadsCard key={book.id[0]} {...book} />
              )
            )}
            {goodreads.read.GoodreadsResponse.reviews[0].review.map(book => (
              <GoodreadsCard key={book.id[0]} {...book} />
            ))}
          </SummaryList>
          <SummaryList emoji="🎧" title="What I'm" titleStrong="Listening To">
            {spotify.items.map(item => (
              <SpotifyCard key={item.id} {...item} />
            ))}
          </SummaryList>
          <SummaryList emoji="🗺" title="Where I'm" titleStrong="Going">
            {foursquare.response.checkins.items.map(item => (
              <FoursquareCard key={item.id} {...item} />
            ))}
          </SummaryList>
        </div>
      )}
    </RouteData>
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.space.xxlarge,
        background: theme.color.black,
      }}
    >
      <div
        css={{
          textAlign: 'center',
          fontSize: theme.fontSize.xlarge,
          color: theme.color.white,
          marginBottom: theme.space.medium,
        }}
      >
        Say Hello{' '}
        <span role="img" aria-label="Waving hand">
          👋
        </span>
      </div>
      <div css={{ width: '100%', maxWidth: 600 }}>
        <Input
          placeholder="Name"
          css={{
            fontSize: theme.space.small,
            marginBottom: theme.space.small,
          }}
        />
        <Input placeholder="Email" css={{ marginBottom: theme.space.small }} />
        <Input placeholder="Message" component="textarea" rows={8} />
      </div>
    </div>
  </>
);

export default Index;

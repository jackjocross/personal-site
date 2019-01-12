import React from 'react';
import { RouteData } from 'react-static';
import { theme } from '../theme';
import { SummaryList } from '../components/SummaryList';
import { GithubCard } from '../components/GithubCard';
import { GoodreadsCard } from '../components/GoodreadsCard';
import { SpotifyCard } from '../components/SpotifyCard';
import { FoursquareCard } from '../components/FoursquareCard';
import { Logo } from '../components/Logo';
import { UnsplashCard } from '../components/UnsplashCard';
import { ContactForm } from '../components/ContactForm';
import { ListBreak } from '../components/ListBreak';

const Index = () => (
  <>
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
      {({ github, goodreads, spotify, foursquare, unsplash }) => (
        <div
          css={{
            margin: `${theme.space.medium} 0`,
          }}
        >
          <SummaryList emoji="💻" title="What I'm" titleStrong="Coding">
            {github.pinned.map(repo => (
              <GithubCard key={repo.id} repo={repo} />
            ))}
            <ListBreak title="Contributed" />
            {github.contributed.map(repo => (
              <GithubCard key={repo.id} repo={repo} />
            ))}
          </SummaryList>
          <SummaryList emoji="📷" title="What I'm" titleStrong="Photographing">
            {unsplash.map(photo => (
              <UnsplashCard key={photo.id} photo={photo} />
            ))}
          </SummaryList>
          <SummaryList emoji="🎧" title="What I'm" titleStrong="Listening To">
            {spotify.map(artist => (
              <SpotifyCard key={artist.id} artist={artist} />
            ))}
          </SummaryList>
          <SummaryList emoji="📖" title="What I'm" titleStrong="Reading">
            {goodreads.currentlyReading.map(book => (
              <GoodreadsCard key={book.id} book={book} />
            ))}
            <ListBreak title="Read" />
            {goodreads.read.map(book => (
              <GoodreadsCard key={book.id} book={book} />
            ))}
          </SummaryList>
          <SummaryList emoji="🗺" title="Where I'm" titleStrong="Going">
            {foursquare.map(checkin => (
              <FoursquareCard key={checkin.id} checkin={checkin} />
            ))}
          </SummaryList>
        </div>
      )}
    </RouteData>
    <ContactForm />
  </>
);

export default Index;

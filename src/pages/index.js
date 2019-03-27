import React from 'react'
import { Global } from '@emotion/core'
import { theme } from '../theme'
import { SummaryList } from '../components/SummaryList'
import { GithubCard } from '../components/GithubCard'
import { GoodreadsCard } from '../components/GoodreadsCard'
import { SpotifyCard } from '../components/SpotifyCard'
import { FoursquareCard } from '../components/FoursquareCard'
import { Logo } from '../components/Logo'
import { UnsplashCard } from '../components/UnsplashCard'
import { ContactForm } from '../components/ContactForm'
import { ListBreak } from '../components/ListBreak'
import { combineDataImages } from '../utils/combineDataImages'

const Index = ({
  data: {
    github: {
      edges: [
        {
          node: {
            childrenJson: [github],
          },
        },
      ],
    },
    unsplash: {
      edges: [
        {
          node: { childrenJson: unsplashData },
        },
        ...unsplashImages
      ],
    },
    spotify: {
      edges: [
        {
          node: { childrenJson: spotifyData },
        },
        ...spotifyImages
      ],
    },
    goodreads: {
      edges: [
        {
          node: {
            childrenJson: [{ currentlyReading, read }],
          },
        },
        ...goodreadsImages
      ],
    },
    foursquare: { edges },
  },
}) => (
  <>
    <Global
      styles={{
        'html, body': {
          margin: 0,
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize.root,
          lineHeight: theme.lineHeight,
        },
      }}
    />
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        padding: theme.space.xxlarge,
      }}
    >
      <Logo width={150} height={150} />
    </div>

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
        {combineDataImages(unsplashData, unsplashImages).map(photo => (
          <UnsplashCard key={photo.id} photo={photo} />
        ))}
      </SummaryList>
      <SummaryList emoji="🎧" title="What I'm" titleStrong="Listening To">
        {combineDataImages(spotifyData, spotifyImages).map(artist => (
          <SpotifyCard key={artist.id} artist={artist} />
        ))}
      </SummaryList>
      <SummaryList
        emoji="📖"
        title="What I'm"
        titleStrong="Reading"
        css={{
          '& ul': {
            alignItems: 'center',
          },
        }}
      >
        {combineDataImages(currentlyReading, goodreadsImages).map(book => (
          <GoodreadsCard key={book.id} book={book} />
        ))}
        <ListBreak title="Read" />
        {combineDataImages(read, goodreadsImages).map(book => (
          <GoodreadsCard key={book.id} book={book} />
        ))}
      </SummaryList>
      <SummaryList emoji="🗺" title="Where I'm" titleStrong="Going">
        {edges.map(checkin => (
          <FoursquareCard key={checkin.node.id} checkin={checkin.node} />
        ))}
      </SummaryList>
    </div>
    <ContactForm />
  </>
)

export const query = graphql`
  query IndexQuery {
    github: allFile(filter: { relativePath: { glob: "github*" } }) {
      edges {
        node {
          childrenJson {
            pinned {
              id
              name
              description
              url
              owner {
                login
                url
              }
            }
            contributed {
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
    }
    unsplash: allFile(filter: { relativePath: { glob: "unsplash*" } }) {
      edges {
        node {
          childrenJson {
            id
            description
            url
            imagePath
          }
          childImageSharp {
            fixed(width: 320, height: 320) {
              ...GatsbyImageSharpFixed
              originalName
            }
          }
        }
      }
    }
    spotify: allFile(filter: { relativePath: { glob: "spotify*" } }) {
      edges {
        node {
          childrenJson {
            id
            name
            spotifyUrl
            imagePath
          }
          childImageSharp {
            fixed(width: 320, height: 320) {
              ...GatsbyImageSharpFixed
              originalName
            }
          }
        }
      }
    }
    goodreads: allFile(filter: { relativePath: { glob: "goodreads*" } }) {
      edges {
        node {
          childrenJson {
            read {
              id
              title
              bookLink
              name
              authorLink
              imagePath
            }
            currentlyReading {
              id
              title
              bookLink
              name
              authorLink
              imagePath
            }
          }
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
    foursquare: allFoursquareCheckin {
      edges {
        node {
          venue {
            name
          }
          childrenFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default Index

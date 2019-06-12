import { Global } from '@emotion/core'
import { Link } from 'gatsby'
import React from 'react'
import Tilt from 'react-tilt'
import { ContactForm } from '../components/ContactForm'
import { FoursquareCard } from '../components/FoursquareCard'
import { GithubCard } from '../components/GithubCard'
import { GoodreadsCard } from '../components/GoodreadsCard'
import { ListBreak } from '../components/ListBreak'
import { Logo } from '../components/Logo'
import { SpotifyCard } from '../components/SpotifyCard'
import { SummaryList } from '../components/SummaryList'
import { UnsplashCard } from '../components/UnsplashCard'
import { theme } from '../theme'
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
}) => {
  return (
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
          padding: `${theme.space.xxlarge} 0`,
          height: 200,
        }}
      >
        <Tilt
          options={{ max: 10, scale: 1.02 }}
          style={{ height: 200, width: 200 }}
        >
          <Link
            to="/"
            css={{
              position: 'relative',
              display: 'block',
              width: 200,
              height: 200,
            }}
          >
            <div
              css={{
                background:
                  'linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
                borderRadius: 3,
                position: 'absolute',
                width: 200,
                height: 200,
              }}
            />

            <Logo
              width={150}
              height={150}
              css={{
                mixBlendMode: 'screen',
                position: 'absolute',
                padding: 25,
                top: 0,
                left: 0,
              }}
            />
          </Link>
        </Tilt>
      </div>

      <div
        css={{
          margin: `${theme.space.medium} 0`,
        }}
      >
        <SummaryList title="What I'm" titleStrong="Coding">
          {github.pinned.map(repo => (
            <GithubCard key={repo.id} repo={repo} />
          ))}
          <ListBreak title="Contributed" />
          {github.contributed.map(repo => (
            <GithubCard key={repo.id} repo={repo} />
          ))}
        </SummaryList>
        <SummaryList title="What I'm" titleStrong="Photographing">
          {combineDataImages(unsplashData, unsplashImages).map(photo => (
            <UnsplashCard key={photo.id} photo={photo} />
          ))}
        </SummaryList>
        <SummaryList title="What I'm" titleStrong="Listening To">
          {combineDataImages(spotifyData, spotifyImages).map(artist => (
            <SpotifyCard key={artist.id} artist={artist} />
          ))}
        </SummaryList>
        <SummaryList
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
        <SummaryList title="Where I'm" titleStrong="Going">
          {edges.map(checkin => (
            <FoursquareCard key={checkin.node.id} checkin={checkin.node} />
          ))}
        </SummaryList>
      </div>
      <ContactForm />
    </>
  )
}

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
              ...GatsbyImageSharpFixed_withWebp_noBase64
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
              ...GatsbyImageSharpFixed_withWebp_noBase64
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
              ...GatsbyImageSharpFluid_withWebp_noBase64
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
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`

export default Index

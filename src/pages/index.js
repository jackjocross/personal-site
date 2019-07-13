import { Global } from '@emotion/core'
import { graphql, Link } from 'gatsby'
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
import { Favicons } from '../components/Favicons'
import { WavePrimary, WaveSecondary } from '../components/Wave'
import Helmet from 'react-helmet'
import { Anchor } from '../components/Anchor'

const description = `Welcome!  During the day I work as a software engineer in 
  New York City, but at night (or in my other free time) I enjoy photography, 
  music, and exploring the city.`

const Index = ({
  data: {
    site: {
      siteMetadata: { title, url },
    },
    spotify: { edges: artists },
    unsplash: { edges: images },
    foursquare: { edges: checkins },
    goodreads: { edges: books },
    github: {
      user: {
        pinnedRepositories: { nodes: pinnedRepositories },
        repositoriesContributedTo: { nodes: repositoriesContributedTo },
      },
    },
    logo: {
      edges: [
        {
          node: {
            childFavicon: { faviconElements },
            childOgImage: {
              ogImageWithText: { src },
            },
          },
        },
      ],
    },
  },
}) => {
  return (
    <>
      <Favicons favicons={faviconElements} />
      <Helmet
        title={title}
        meta={[
          { property: 'og:title', content: 'Jack Cross' },
          { property: 'og:description', content: description },
          {
            property: 'og:image',
            content: `${url}${src}`,
          },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: 'Jack Cross' },
          {
            name: 'twitter:description',
            content: description,
          },
          {
            name: 'twitter:image',
            content: `${url}${src}`,
          },
        ]}
      />
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
        css={theme.mq({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: [
            theme.space.small,
            theme.space.xxlarge,
            theme.space.xxlarge,
            theme.space.xxlarge,
          ],
          padding: `${theme.space.xxlarge} ${theme.space.medium}`,
        })}
      >
        <div css={{ marginBottom: theme.space.medium }}>
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
        <h1>{title}</h1>
        <p
          css={{
            marginBottom: 0,
            fontSize: theme.fontSize.large,
            maxWidth: '70ch',
          }}
        >
          {description}
        </p>
        <p
          css={{
            fontSize: theme.fontSize.large,
            maxWidth: '70ch',
          }}
        >
          Check out some live data about me below and reach out if anything
          interests you. You can also find me on{' '}
          <Anchor href="https://twitter.com/crosscompile">Twitter</Anchor>,{' '}
          <Anchor href="https://github.com/crosscompile">GitHub</Anchor>, and{' '}
          <Anchor href="https://www.linkedin.com/in/jack-cross">
            LinkedIn
          </Anchor>
          .
        </p>
      </div>

      <WavePrimary color="#f4f5f7" />
      <SummaryList
        title="What I'm"
        titleStrong="Coding"
        css={{ background: '#f4f5f7' }}
      >
        {pinnedRepositories.map(repo => (
          <GithubCard key={repo.id} repo={repo} />
        ))}
        <ListBreak title="Contributed" />
        {repositoriesContributedTo.map(repo => (
          <GithubCard key={repo.id} repo={repo} />
        ))}
      </SummaryList>
      <WaveSecondary color="#ffffff" />
      <SummaryList title="What I'm" titleStrong="Photographing">
        {images.map(image => (
          <UnsplashCard key={image.node.id} image={image.node} />
        ))}
      </SummaryList>
      <WavePrimary color="#f4f5f7" />
      <SummaryList
        title="What I'm"
        titleStrong="Listening To"
        css={{ background: '#f4f5f7' }}
      >
        {artists.map(artist => (
          <SpotifyCard key={artist.node.id} artist={artist.node} />
        ))}
      </SummaryList>
      <WaveSecondary color="#ffffff" />
      <SummaryList
        title="What I'm"
        titleStrong="Reading"
        css={{ background: '#ffffff' }}
      >
        {books
          .filter(({ node: { shelf } }) => shelf === 'currently-reading')
          .map(({ node: book }) => (
            <GoodreadsCard key={book.id} book={book} />
          ))}

        <ListBreak title="Read" />
        {books
          .filter(({ node: { shelf } }) => shelf === 'read')
          .map(({ node: book }) => (
            <GoodreadsCard key={book.id} book={book} />
          ))}
      </SummaryList>
      <WavePrimary color="#f4f5f7" />
      <SummaryList
        title="Where I'm"
        titleStrong="Going"
        css={{ background: '#f4f5f7' }}
      >
        {checkins.map(checkin => (
          <FoursquareCard key={checkin.node.id} checkin={checkin.node} />
        ))}
      </SummaryList>
      <WaveSecondary color="#000000" />
      <ContactForm />
    </>
  )
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        url
      }
    }
    foursquare: allFoursquareCheckin {
      edges {
        node {
          id
          venue {
            id
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
    goodreads: allGoodreadsBook {
      edges {
        node {
          id
          authorLink
          bookLink
          title
          name
          hasCoverImage
          shelf
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
    github {
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
        repositoriesContributedTo(
          privacy: PUBLIC
          first: 20
          includeUserRepositories: false
          contributionTypes: COMMIT
          orderBy: { field: STARGAZERS, direction: DESC }
        ) {
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
    unsplash: allUnsplashImage {
      edges {
        node {
          id
          alt_description
          links {
            html
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
    spotify: allSpotifyArtist {
      edges {
        node {
          id
          external_urls {
            spotify
          }
          name
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
    logo: allFile(filter: { name: { eq: "logo" } }) {
      edges {
        node {
          childFavicon {
            faviconElements {
              props
              type
            }
          }
          childOgImage {
            ogImageWithText(text: "Jack Cross") {
              src
            }
          }
        }
      }
    }
  }
`

export default Index

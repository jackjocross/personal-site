import { Global } from '@emotion/core'
import { graphql } from 'gatsby'
import React from 'react'
import { ContactForm } from '../components/ContactForm'
import { FoursquareCard } from '../components/FoursquareCard'
import { GithubCard } from '../components/GithubCard'
import { ListBreak } from '../components/ListBreak'
import { SpotifyCard } from '../components/SpotifyCard'
import { SummaryList } from '../components/SummaryList'
import { UnsplashCard } from '../components/UnsplashCard'
import { theme } from '../theme'
import { Favicons } from '../components/Favicons'
import { WavePrimary, WaveSecondary } from '../components/Wave'
import Helmet from 'react-helmet'
import { Anchor } from '../components/Anchor'
import { Image } from '../components/Image'
import { Card } from '../components/Card'

const Index = ({
  data: {
    site: {
      siteMetadata: { title, url },
    },
    spotify: { edges: artists },
    unsplash: { edges: images },
    foursquare: { edges: checkins },
    github: {
      user: {
        pinnedItems: { nodes: pinnableItems },
        topRepositories: { nodes: repositoriesContributedTo },
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
            childImageSharp: { fluid },
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
          {
            property: 'og:image',
            content: `${url}${src}`,
          },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: 'Jack Cross' },
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
          <Card
            component="a"
            css={[
              {
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              },
            ]}
            href={'/'}
          >
            <Image
              fluid={fluid}
              loading="lazy"
              style={{
                width: 200,
                height: 200,
              }}
            />
          </Card>
        </div>
        <h1>{title}</h1>
        <p
          css={{
            fontSize: theme.fontSize.large,
            maxWidth: '70ch',
          }}
        >
          <Anchor href="https://twitter.com/jackjocross">Twitter</Anchor> -{' '}
          <Anchor href="https://github.com/jackjocross">GitHub</Anchor> -{' '}
          <Anchor href="https://www.linkedin.com/in/jackjocross">
            LinkedIn
          </Anchor>
        </p>
      </div>

      <WavePrimary color="#f4f5f7" />
      <SummaryList
        title="What I'm"
        titleStrong="Coding"
        css={{ background: '#f4f5f7' }}
      >
        {pinnableItems.map(repo => (
          <GithubCard key={repo.id} repo={repo} />
        ))}
        <ListBreak title="Contributed" />
        {repositoriesContributedTo
          .filter(repo => !!repo)
          .map(repo => (
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
        title="Where I'm"
        titleStrong="Going"
        css={{ background: '#ffffff' }}
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
    github {
      user(login: "jackjocross") {
        pinnedItems(types: REPOSITORY, first: 20) {
          nodes {
            ... on GitHub_Repository {
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
        topRepositories(
          first: 40
          since: "2018-01-01T00:00:00.000Z"
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
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`

export default Index

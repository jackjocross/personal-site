const fs = require('fs-extra')
const axios = require('axios')

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
  )

  fs.writeFileSync(
    './data/github.json',
    JSON.stringify({
      pinned: data.data.user.pinnedRepositories.nodes,
      contributed: data.data.user.repositoriesContributedTo.nodes,
    })
  )
}

getGithubData()

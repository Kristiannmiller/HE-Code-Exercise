import { Octokit } from "@octokit/core"

const octokit = new Octokit({auth: `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`})


octokit.hook.after('request', async (response, options) => {
  if(response.status === 200) {
    return response
  }
  console.log(`${options.method} ${options.url}: ${response.status}`)
})

octokit.hook.error('request', async (error, options) => {
  if (error.status === 304) {
    return findInCache(error.headers.etag)
  }

  throw error
})

export const getSearchResults = async (search) => {
  return await octokit.request('GET /search/repositories?page=1&per_page=30', {
  q: search
  })
}

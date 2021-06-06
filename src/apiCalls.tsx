import { Octokit } from "@octokit/core"

const octokit = new Octokit({auth: `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`})


octokit.hook.after('request', async (response, options) => {
  if(response.status === 200) {
    console.log(`${options.method} ${options.url}: ${response.status}`)
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


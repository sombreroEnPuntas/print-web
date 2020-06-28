const fetch = require('node-fetch')

async function getAll() {
  try {
    const response = await fetch(root + index)
    const text = await response.text()

    const targetLinkTags = text.match(
      /((?<=<a href=")\/guides\/op-1\/.*(?="))/gm
    )

    const filteredLinks = [...new Set(targetLinkTags)]

    return filteredLinks
  } catch (error) {
    console.error(error)
  }
}

const index = '/guides/op-1#guide-menu'

const root = 'https://teenage.engineering'

module.exports = {
  getAll,
  index,
  root,
}

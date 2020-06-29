const puppeteer = require('puppeteer')
const { exit } = require('process')

const getPage = async (pageURL, number) => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
    await page.goto(pageURL, { waitUntil: 'networkidle2' })

    const cookieCTA = await page.$x("//span[contains(text(), 'i understand')]")
    cookieCTA.length > 0 && (await cookieCTA[0].click())

    await page.pdf({
      path: `output/${number} ${pageURL.split('/').pop()}`, // or just pageURL escaped :)
      margin: { top: '60px', bottom: '60px', right: '30px', left: '30px' },
      format: 'A4',
      printBackground: false,
      scale: 0.6,
    })

    await browser.close()
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getPage }

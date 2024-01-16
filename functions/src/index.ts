const { onRequest } = require('firebase-functions/v2/https')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { logger } = require('firebase-functions')

const puppeteer = require('puppeteer')
initializeApp()

exports.scrapeTwitter = onRequest({ memory: '2GiB', timeoutSeconds: 300 }, async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
  })
  const page = await browser.newPage()

  await page.goto('https://nitter.net/MNUFC')

  const tweets = await page.$$eval('.timeline-item', (els) => {
    return els.map((e) => {
      const tweetContent = e.querySelector('.tweet-content').innerHTML
      const tweetAttachments = Array.from(e.querySelectorAll('.still-image'), (e) => e.toString())
      const tweetTimestamp = e.querySelector('.tweet-date').firstChild.getAttribute('title')

      const timestampRe = /(?!UTC)\b(\w:?)+/
      console.log(tweetTimestamp)

      return {
        tweetContent: tweetContent,
        tweetAttachments: tweetAttachments,
        tweetTimestamp: tweetTimestamp,
      }
    })
  })

  console.log(tweets)

  res.send('done')

  await browser.close()
})

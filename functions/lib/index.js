const { onSchedule } = require('firebase-functions/v2/scheduler');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
initializeApp();
const admin = require('firebase-admin');
const db = admin.firestore();
const puppeteer = require('puppeteer');
exports.scheduleTwitterScrape = onSchedule('*/15 * * * *', async (req, res) => {
    const allTweets = [];
    db.collection('tweets')
        .get()
        .then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc) {
                const tweet = {
                    tweetContent: doc.data().tweetContent,
                    tweetAttachments: doc.data().tweetAttachments,
                    tweetTimestamp: doc.data().tweetTimestamp,
                };
                allTweets.push(tweet);
            }
        });
        console.log(allTweets.length);
    });
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto('https://nitter.net/MNUFC');
    const tweets = await page.$$eval('.timeline-item', (els) => {
        return els.map((e) => {
            const tweetContent = e.querySelector('.tweet-content').innerHTML;
            const tweetAttachments = Array.from(e.querySelectorAll('.still-image'), (e) => e.toString());
            const tweetTimestamp = e.querySelector('.tweet-date').firstChild.getAttribute('title');
            const timeRegex = /\b(\w{3} \d{1,2}, \d{4}) · (\d{1,2}:\d{2} [APMapm]{2}) UTC\b/;
            const match = tweetTimestamp.match(timeRegex);
            const formattedTimestamp = `${match[1]} ${match[2]}`;
            const utcDate = new Date(formattedTimestamp);
            const utcTimestamp = utcDate.getTime();
            return {
                tweetContent: tweetContent,
                tweetAttachments: tweetAttachments,
                tweetTimestamp: utcTimestamp,
            };
        });
    });
    tweets.map((tweet) => {
        if (!allTweets.find((foundTweet) => {
            return foundTweet.tweetContent == tweet.tweetContent;
        })) {
            getFirestore().collection('tweets').add(tweet);
        }
    });
    res.send('done');
    await browser.close();
});
//exports.scrapeTwitterAndAddToDb = onRequest(
//  { memory: '2GiB', timeoutSeconds: 300 },
//  async (req, res) => {
//    const allTweets = []
//    db.collection('tweets')
//      .get()
//      .then((snapshot) => {
//        snapshot.forEach((doc) => {
//          if (doc) {
//            const tweet = {
//              tweetContent: doc.data().tweetContent,
//              tweetAttachments: doc.data().tweetAttachments,
//              tweetTimestamp: doc.data().tweetTimestamp,
//            }
//            allTweets.push(tweet)
//          }
//        })
//        console.log(allTweets.length)
//      })
//
//    const browser = await puppeteer.launch({
//      headless: 'new',
//    })
//    const page = await browser.newPage()
//
//    await page.goto('https://nitter.net/MNUFC')
//
//    const tweets = await page.$$eval('.timeline-item', (els) => {
//      return els.map((e) => {
//        const tweetContent = e.querySelector('.tweet-content').innerHTML
//        const tweetAttachments = Array.from(e.querySelectorAll('.still-image'), (e) => e.toString())
//        const tweetTimestamp = e.querySelector('.tweet-date').firstChild.getAttribute('title')
//
//        const timeRegex = /\b(\w{3} \d{1,2}, \d{4}) · (\d{1,2}:\d{2} [APMapm]{2}) UTC\b/
//        const match = tweetTimestamp.match(timeRegex)
//        const formattedTimestamp = `${match[1]} ${match[2]}`
//
//        const utcDate = new Date(formattedTimestamp)
//        const utcTimestamp = utcDate.getTime()
//
//        return {
//          tweetContent: tweetContent,
//          tweetAttachments: tweetAttachments,
//          tweetTimestamp: utcTimestamp,
//        }
//      })
//    })
//
//    tweets.map((tweet) => {
//      if (
//        !allTweets.find((foundTweet) => {
//          return foundTweet.tweetContent == tweet.tweetContent
//        })
//      ) {
//        getFirestore().collection('tweets').add(tweet)
//      }
//    })
//
//    res.send('done')
//
//    await browser.close()
//  }
//)
//# sourceMappingURL=index.js.map
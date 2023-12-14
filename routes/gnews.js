const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const pretty = require('pretty')
const health = 'https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen'
const india = 'https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRE55YXpBU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen'
const world = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'
const business = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'
const technology = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'
const entertainment = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'
const sports = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'
const science = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'


//search
router.get('/search/:term', async (req, res) => {
    try {
        const url = `https://news.google.com/search?q=${req.params.term}&hl=en-IN&gl=IN&ceid=IN%3Aen`
        console.log("hooi")
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
            }
        })
        const $ = cheerio.load(data)
        const list = $("c-wiz div main div c-wiz c-wiz c-wiz article")

        const news = []

        list.each((idx, el) => {
            const title = $(el).children("div").children("div").children("div").children("a").text().trim()

            const time = $(el).children("div").children("time").text()
            const date = $(el).children("div").children("time").attr("datetime")
            const authorScraped = $(el).children("div").children("div").children("span").first().text()
            const author = authorScraped !== '' ? authorScraped : "Anonymous"
            const i = $(el).children("div").children("figure").children("img").last().attr("srcset")
            const imgs = i?.split(' ')
            const img = imgs ? [imgs[0], imgs[2]] : ["https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"]

            const name = $(el).children("div").children("div").children("div").children("div").children("div").children("div").children("div").text()
            const sourceName = name !== '' ? name.replace("More", "") : "Anonymous"
            const scrapedSourceImage = $(el).children("div").children("div").children("div").children("div").children("img").attr("srcset")
            const sourceImg = scrapedSourceImage ? [scrapedSourceImage?.split(' ')[0], scrapedSourceImage?.split(' ')[2]] : ["https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"]

            const link = ('https://news.google.com' + ($(el).children("div").children("div").children("a").attr("href").slice(1)))

            news.push({id:idx, link, time, title, img, date, author, source: { img: sourceImg, name: sourceName } })
            console.log({id:idx, link, time, title, img, date, author, source: { img: sourceImg, name: sourceName } })
        })

        res.json({ news: news, total: news.length })
    } catch (error) {
        console.log(error)
        res.json({ news: [], total: 0 })
    }
})

router.get('/topic/:term', async (req, res) => {
    try {
        const term = req.params.term

        let url = india
        switch (term) {
            case "health":
                url = health
                break;
            case "sports":
                url = sports
                break;
            case "entertainment":
                url = entertainment
                break;
            case "business":
                url = business
                break;
            case "science":
                url = science
                break;
            case "technology":
                url = technology
                break;
            case "world":
                url = world
                break;
            default:
                url = india
        }

        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
            }
        })
        const $ = cheerio.load(data)

        let nest = ""
        if (url === india || url === world) {
            nest = "c-wiz div main c-wiz c-wiz c-wiz c-wiz"
        } else {
            nest = "c-wiz div main c-wiz div c-wiz c-wiz c-wiz"
        }
        const list = $(nest).children("div:first-child").children("article:first-child")
        const news = []
        list.each((idx, el) => {
            const i = $(el).children("figure").children("img").attr("srcset")
            const img = i ? [i.split(' ')[0], i.split(' ')[2]] : ["https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"]
            const sImg = $(el).children("div").children("div").children("img").attr("srcset")
            const sourceImg = sImg ? [sImg.split(' ')[0], sImg.split(' ')[2]] : ["https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"]
            const scrapedSourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
            const sourceName = scrapedSourceName !== '' ? scrapedSourceName.replace("More", "") : "Anonymous"
            const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
            const time = $(el).children("div").children("time").text().trim()
            const date = $(el).children("div").children("time").attr("datetime")
            const title = $(el).children("a").text().trim()
            const authorScraped = $(el).children("div").children("div").children("span").first().text()
            const author = authorScraped !== '' ? authorScraped : "Anonymous"

            news.push({id:idx, title: title, link: link, time: time, date: date, img: img, author: author, source: { img: sourceImg, name: sourceName } })
            console.log({id:idx, link, time, title, img, date, author, source: { img: sourceImg, name: sourceName } })
        })

        res.json({ news: news, total: news.length })
    } catch (error) {
        console.log(error)
        res.json({ news: [], total: 0 })

    }
})




module.exports = router
const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const pretty = require('pretty')

//search
router.get('/search/:term', async (req, res) => {
    const url = `https://news.google.com/search?q=${req.params.term}&hl=en-IN&gl=IN&ceid=IN%3Aen`

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div div div main").find("div.NiLAwe")

    const news = []
    list.each((idx, el) => {
        const title = $(el).find("article.MQsxIb").first().children("h3").children("a").text().trim()
        const time = $(el).find("article.MQsxIb").first().find("time.WW6dff ").text()
        const simg = $(el).find("article.MQsxIb").first().children("div").children("img").last().attr("srcset")
        const sourceImg = simg?.split(' ')
        const name = $(el).find("article.MQsxIb").first().children("div").children("div").children("a").text()
        const i = $(el).find("figure.AZtY5d").children("img").attr("srcset")
        const img = i?.split(' ')
        const link = ('https://news.google.com' + ($(el).find("article.MQsxIb").children("a").attr("href").slice(1)))
        news.push({ link, time, title, img, source: { img: sourceImg, name } })
    })

    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//india
router.get('/india', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRE55YXpBU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//world
router.get('/world', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//business
router.get('/business', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//technology
router.get('/technology', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//entertainment
router.get('/entertainment', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//sports
router.get('/sports', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//science
router.get('/science', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})

//health
router.get('/health', async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen'

    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    })
    const $ = cheerio.load(data)
    const list = $("c-wiz div main c-wiz div c-wiz c-wiz c-wiz").children("div:first-child").children("article:first-child")
    const news = []
    list.each((idx, el) => {
        const i = $(el).children("figure").children("img").attr("srcset")
        const img = i ? i.split(' ') : i
        const sImg = $(el).children("div").children("div").children("img").attr("srcset")
        const sourceImg = sImg ? sImg.split(' ') : sImg
        const sourceName = $(el).children("div").children("div").children("div").children("div").text().trim()
        const link = 'https://news.google.com' + $(el).children("div").children("a.WwrzSb").attr("href").slice(1)
        const time = $(el).children("div").children("time").text().trim()
        const title = $(el).children("h4").text().trim()
        news.push({ title: title, link: link, time: time, img: img, source: { img: sourceImg, name: sourceName } })
    })
    // res.send(pretty(list.html()))
    res.json({ news: news, total: news.length })
})



module.exports = router
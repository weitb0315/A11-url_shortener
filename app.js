const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// 載入產生短網址function
const generateUrl = require('./generate_url')
let short = generateUrl()
const bodyParser = require('body-parser')
const Url = require('./models/url')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url
  return Url.findOne({ url })
    .lean()
    .then((existUrl) => {
      if (existUrl) {
        // if url exist, the shorten url is the same pair
        short = existUrl.short
        res.render('index', { short })
      } else {
        // else generate a new shorten url
        Url.create({ url, short })
        res.render('index', { short })
      }
    })
    .catch(error => console.log(error))
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  short = 'http://localhost:3000/' + id
  return Url.findOne({ short })
    .lean()
    .then((shortUrl) => {
      res.redirect(shortUrl.url)
    })
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
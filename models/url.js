const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlShortenerSchema = new Schema({
  url: {
    type: String
  },
  short: {
    type: String
  }
})
module.exports = mongoose.model('Url', urlShortenerSchema)
function generateUrl() {
  // define characters
  const numbers = '1234567890'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()

  // collect all characters
  let collection = []
  collection = collection.concat(numbers.split('')).concat(lowerCaseLetters.split('')).concat(upperCaseLetters.split(''))

  // generate 5 characters in random
  let randomCharacters5 = ''
  for (let i = 0; i < 5; i++) {
    randomCharacters5 += collection[Math.floor(Math.random() * collection.length)]
  }

  // generate url
  let shorterUrl = 'https://tzbin-url/'
  shorterUrl += randomCharacters5

  // return the generated url
  return shorterUrl
}
module.exports = generateUrl
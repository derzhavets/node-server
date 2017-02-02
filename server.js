const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

// app.use((req, res, next) => {
//   res.render('maintenance')
// })

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home page',
    welcomeMessage: 'Hello Express Application!'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About page'
  })
})

app.get('/posts', (req, res) => {
  res.render('posts')
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Nothing works, fuck it :('
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})

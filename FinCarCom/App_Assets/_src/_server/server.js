
//! This is the server-side entrypoint.

const express = require('express')
    , app = express()
    , path = require('path')
    , env = require('./config/env')
    , port = env.islocaldev ? env.port : 80


// map our static assets folder to our /_build folder
app.use(express.static(path.normalize(path.join(__dirname, '../../_build'))))

// setup some middleware
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


// this is our single entrypoint for the app
app.get('/', (req, res) => {
  res.render('index', { env })
})

// this sets up and handles all our application's /api calls
app.use('/api', require('./routers/apiRouter'))

// this will handle all odd, server-side urls
// that are not considered valid
app.get('*', (req, res) => {
  console.log('bad url:', req.url);
  res.redirect('/')
  //res.render('404-status', { env })
})



// ok, let's start this biatch up
app.listen(port)
console.log(`Server running at http://localhost:${port}/`)
// console.log(__dirname);

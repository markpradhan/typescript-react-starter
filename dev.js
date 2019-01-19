// Libs
import express from 'express'
import webpack from 'webpack'
import portfinder from 'portfinder'
import colors from 'colors'
import path from 'path'
import config from './webpack.config' // eslint-disable-line

const indexHTML = path.join(__dirname + '/src/entries/main/index.html')

/* eslint-disable no-console */
const port = 3000

const app = express()
const compiler = webpack(config)

// set default port
portfinder.basePort = port

app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  }),
)

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(indexHTML)
})

// Opens the port on the given port or +1 if its taken
portfinder.getPort(function(err, port) {
  console.log('[app] Running on port '.yellow + `${port}`.underline.white)
  app.listen(port, function(err) {
    if (err) {
      console.log(err)
    }
  })
})

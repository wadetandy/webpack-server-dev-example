import { createServer } from 'http'

import app from './app'

const server = createServer(app)
let currentApp = app

const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

if (module.hot) {
  module.hot.accept('./app', () => {
    console.log('hot reloading app')

    // tslint:disable-next-line
    let newApp = require('./app').default

    server.removeListener('request', currentApp)
    server.on('request', newApp)
    currentApp = newApp
  })
}

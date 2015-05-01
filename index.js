import Hapi from 'hapi'
import app from './lib'

var server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 3000
})

server.on('response', (request) => {
  console.log(`${request.info.remoteAddress} - ${request.response.statusCode} ${request.method.toUpperCase()} ${request.url.path}`)
})

app(server)

server.start(() => {
  console.log('Server running at:', server.info.uri)
})

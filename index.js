import Hapi from 'hapi'
import app from './lib'

var server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 3000
})

app(server)

server.start(() => {
  console.log('Server running at:', server.info.uri)
})

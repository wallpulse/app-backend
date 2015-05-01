import twit from 'twit'
import socketio from 'socket.io'

import sioRoutes from './socketio'

const e = process.env

const twitter = new twit({
  access_token: e.ACCESS_TOKEN,
  access_token_secret: e.ACCESS_TOKEN_SECRET,
  consumer_key: e.CONSUMER_KEY,
  consumer_secret: e.CONSUMER_SECRET
})

export default function (server) {
  const io = socketio(server.listener)

  server.decorate('server', 'socketio', () => io)
  server.decorate('server', 'twitter', () => twitter)

  sioRoutes(server, io)

  ;[
    'admin',
    'tweets'
  ].forEach(route => {
    require(`./routes/${route}`)(route, server)
  })

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: (request, reply) => {
      reply('not found').code(404)
    }
  })
}

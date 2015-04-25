export default function (server) {
  [
    'admin'
  ].forEach(m => {
    require('./routes/' + m)(m, server)
  })
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: (request, reply) => {
      reply('not found').code(404)
    }
  })
}

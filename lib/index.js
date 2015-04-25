export default function (server) {
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: (request, reply) => {
      reply('not found').code(404)
    }
  })
}

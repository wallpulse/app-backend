export default function (name, server) {
  server.route({
    method: 'GET',
    path: `/${name}/{p*}`,
    handler: (request, reply) => {
      reply('hey ho!').code(200)
    }
  })
}

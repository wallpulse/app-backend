import Boom from 'boom'

export default function (name, server) {
  server.route({
    method: 'GET',
    path: `/${name}`,
    handler: (request, reply) => {
      const query = request.query.q || request.query.s
      if (!query) return reply(Boom.badRequest('invalid query'))
      server.twitter().get('search/tweets', {
        q: query,
        count: 100
      }, (err, data, response) => {
        if (err) return reply(Boom.badRequest('twitter error: ' + err.message))
        reply(data.statuses.reverse().filter(v => !v.retweeted_status))
      })
    }
  })
}

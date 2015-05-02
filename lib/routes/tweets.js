import Boom from 'boom'
import smr from 'social-media-resolver'
import Parallizer from 'parallizer'
import async from 'async'

function resolveUrls (tweet, cb) {
  tweet.resolved_urls = {
    video: [],
    img: []
  }
  if (tweet.entities.urls.length === 0) return cb(null, tweet)
  var queue = new Parallizer(1, cb.bind(null, null, tweet))
  tweet.entities.urls.forEach(u => {
    queue.sadd(smr, u.expanded_url, (e, type, ru) => {
      if (!e) tweet.resolved_urls[type].push(ru)
    })
  })
}

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
      }, (error, data, response) => {
        if (error) return reply(Boom.badRequest('twitter error: ' + error.message))
        let statuses = data.statuses.reverse().filter(v => !v.retweeted_status)
        if (request.query.resolve === 'false') return reply(statuses)
        async.mapLimit(statuses, 5, resolveUrls, (err, results) => {
          if (!err) reply(results)
        })
      })
    }
  })
}

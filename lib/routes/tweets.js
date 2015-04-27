import Twit from 'twit'

const e = process.env

const twitter = new Twit({
  access_token: e.ACCESS_TOKEN,
  access_token_secret: e.ACCESS_TOKEN_SECRET,
  consumer_key: e.CONSUMER_KEY,
  consumer_secret: e.CONSUMER_SECRET
})

export default function (name, server) {
  server.route({
    method: 'GET',
    path: `/${name}`,
    handler: (request, reply) => {
      twitter.get('search/tweets', {
        q: request.query.s,
        count: 100
      }, (err, data, response) => {
        if (err) return reply(err)
        reply(data.statuses.reverse().filter(v => !v.retweeted_status))
      })
    }
  })
}

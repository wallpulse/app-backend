export default function (server) {
  [
    'tweets'
  ].forEach(route => {
    require(`./${route}`)(server)
  })
}

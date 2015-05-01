export default function (server) {
  const io = server.socketio()
  io.on('connection', socket => {
    console.log('new connection')
  })
}

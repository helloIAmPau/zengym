import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { query } from '@zengym/postgres';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: '/events',
  serveClient: false
});

io.engine.use(function(request, response, next) {
  if(request._query.sid !== undefined) {
    next();

    return;
  }

  request.user = {
    uid: 'fbbe8f68-8913-48c0-b834-0c0169bb6fa9'
  };
  next();
});

io.on('connection', function(socket) {
  const { uid } = socket.request.user;

  console.log(`${ uid } Joined`);
  socket.join(uid);
});

app.post('/emit/:room', function(request, response) {
  const { log_uid } = request.query;
  const { room } = request.params;

  query(`
select log_type from data.log_unified where uid = $1
  `, [ log_uid ]).then(function([{ log_type }]) {
    return io.to(room).emit(log_type);
  }).then(function() {
    response.end();
  });
});

httpServer.listen(80, '0.0.0.0', function() {
  console.log(`${ process.env.service } started @ http://0.0.0.0`);
});

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';

const socket = io('http://localhost:3031/');

const client = feathers();
client.configure(socketio(socket, {
  timeout: 50000,
  pingTimeout: 60000,
  transports: ['websocket'],
  forceNew: true,
  upgrade: false

}));
client.configure(authentication());

export default client;

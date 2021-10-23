import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { DbService } from '@db/db.service';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private dbService: DbService) {}

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('JoinToRoom')
  async joinToRoom(@MessageBody() { room, id, name, rol }, @ConnectedSocket() client) {
    client.join(room);
    this.dbService.addUser(id, name);
    this.dbService.addUserToRoom(room, { rol, id });
    const data = this.dbService.getUsersInARoom(room);
    client.to(room).emit('UserJoined', data);
  }

  @SubscribeMessage('updateConnectionToRoom')
  async updateConnection(@MessageBody() room, @ConnectedSocket() client) {
    client.join(room);
  }

  @SubscribeMessage('UsersInARoom')
  async usersInRoom(@MessageBody() room) {
    return this.dbService.getUsersInARoom(room);
  }

  @SubscribeMessage('UserUpdate')
  async updateUser(@MessageBody() { id, name }) {
    this.dbService.addUser(id, name);
    this.server.emit('AUserUpdated');
  }

  @SubscribeMessage('RevealCards')
  async revealCards(@MessageBody() { room, reveal }, @ConnectedSocket() client) {
    client.to(room).emit('RevealCards', reveal);
  }

  @SubscribeMessage('UpdatePoint')
  async updatePoint(@MessageBody() { room, id, point }, @ConnectedSocket() client) {
    this.dbService.updatePoint(room, { id, point, rol: 2 });
    client.in(room).emit('AUserUpdated');
    return this.dbService.getUsersInARoom(room);
  }

  @SubscribeMessage('RefreshPoints')
  async refreshPoint(@MessageBody() room, @ConnectedSocket() client) {
    this.dbService.refreshPoint(room);
    client.in(room).emit('AUserUpdated');
    return this.dbService.getUsersInARoom(room);
  }
}

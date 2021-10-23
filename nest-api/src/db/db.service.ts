import { Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

@Injectable()
export class DbService {
  private DB: any;
  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.DB = new JsonDB(new Config('db', false, true, '/'));
  }

  private add(url: string, data: any) {
    this.DB.push(url, { ...data });
    this.DB.save();
    return data;
  }

  private get(url: string) {
    try {
      return this.DB.getData(url);
    } catch (e) {
      return null;
    }
  }

  addUser(id: string, name: string) {
    this.add(`/users/${id}`, { name });
  }

  addUserToRoom(room: string, { rol, id }: { id: string; rol: number }) {
    const docs = this.get(`/rooms/${room}`);
    if (!docs || !docs.some(doc => doc.id === id)) {
      this.add(`/rooms/${room}[]`, { rol, id, point: 99 });
    }
  }

  getUsersInARoom(room: string) {
    const docs = this.get(`/rooms/${room}`);
    const users = this.get('/users');
    return docs.map(doc => {
      return {
        ...doc,
        ...users[doc.id],
      };
    });
  }

  updatePoint(room: string, { id, point, rol }) {
    const idx = this.DB.getIndex(`/rooms/${room}`, id);
    this.add(`/rooms/${room}[${idx}]`, { point, id, rol });
  }

  refreshPoint(room: string) {
    this.get(`/rooms/${room}`).map((user, idx) => {
      this.add(`/rooms/${room}[${idx}]`, { ...user, point: 99 });
    });
  }
}

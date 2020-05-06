import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketServerOn = false;
  private user: User;
  constructor(private socket: Socket) {
    this.setUser();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('connected to server');
      this.socketServerOn = true;
    });
    this.socket.on('disconnect', () => {
      console.log('disconnected from server');
      this.socketServerOn = false;
    });
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  emit(event: string, payload?: any, callback?: any) {
    console.log('emitting to server', event);
    this.socket.emit(event, payload, callback);
  }

  loginWS(name: string) {
    return new Promise((resolve) => {
      this.emit('config-user', { name }, (res) => {
        console.log(res);
        this.user.name = name;
        this.saveUser();
        resolve();
      });
    });
  }

  saveUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  setUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loginWS(this.user.name);
    } else {
      this.user = { name: null };
    }
  }

  getUser() {
    return this.user;
  }
}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketServerOn = false;
  private user: User;
  constructor(private socket: Socket, private router: Router) {
    this.setUser();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('connected to server');
      this.socketServerOn = true;
      this.setUser();
    });
    this.socket.on('disconnect', () => {
      console.log('disconnected from server');
      this.socketServerOn = false;
    });
  }

  listen(event: string): Observable<any> {
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

  logoutWS() {
    this.user = { name: null };
    localStorage.removeItem('user');
    const payload = {
      name: 'not-identified',
    };
    this.emit('config-user', payload, () => {});
    this.router.navigateByUrl('');
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

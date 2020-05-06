import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketServerOn = false;
  constructor(private socket: Socket) {
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
}

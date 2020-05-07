import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private webSocketService: WebsocketService) {}

  sendMessage(message: string) {
    const payload = {
      from: this.webSocketService.getUser().name,
      content: message,
    };

    this.webSocketService.emit('message', payload);
  }

  getMessages() {
    return this.webSocketService.listen('new-message');
  }

  getPrivateMessages() {
    return this.webSocketService.listen('private-message');
  }

  getActiveUsers(): Observable<User> {
    return this.webSocketService.listen('active-users');
  }
}

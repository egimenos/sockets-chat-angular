import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private webSocketService: WebsocketService) {}

  sendMessage(message: string) {
    const payload = {
      from: 'ernesto',
      content: message,
    };

    this.webSocketService.emit('message', payload);
  }

  getMessages() {
    return this.webSocketService.listen('new-message');
  }
}

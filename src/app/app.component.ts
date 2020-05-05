import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sockets-test';

  constructor(
    private wsService: WebsocketService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatService.sendMessage('test payload');
  }
}

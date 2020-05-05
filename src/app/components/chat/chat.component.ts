import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  content: string;
  constructor(private chatService: ChatService) {}

  send() {
    console.log(this.content);
    this.chatService.sendMessage(this.content);
    this.content = '';
  }

  ngOnInit(): void {}
}

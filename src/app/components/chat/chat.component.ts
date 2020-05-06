import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/interfaces/chat-message';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy, DoCheck {
  content: string;
  messagesSubscription: Subscription;
  element: HTMLElement;
  messages: ChatMessage[] = [];
  constructor(private chatService: ChatService) {}

  send() {
    if (this.content.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.content);
    this.content = '';
  }

  ngOnInit(): void {
    this.element = document.getElementById('chat-messages');
    this.messagesSubscription = this.chatService
      .getMessages()
      .subscribe((msg: ChatMessage) => {
        this.messages = this.messages.concat(msg);
        this.element.scrollTop = this.element.scrollHeight;
      });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

  ngDoCheck(): void {
    this.element.scrollTop = this.element.scrollHeight;
  }
}

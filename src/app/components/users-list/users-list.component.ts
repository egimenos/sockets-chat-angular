import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  activeUsers$: Observable<User>;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.activeUsers$ = this.chatService.getActiveUsers();
  }
}

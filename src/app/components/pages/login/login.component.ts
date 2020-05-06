import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name = '';

  constructor(
    private websocketService: WebsocketService,
    private router: Router
  ) {}

  login() {
    this.websocketService
      .loginWS(this.name)
      .then(() => this.router.navigateByUrl('/messages'));
  }

  ngOnInit(): void {}
}

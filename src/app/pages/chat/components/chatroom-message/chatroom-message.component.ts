import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../../classes/message';

@Component({
  selector: 'app-chatroom-message',
  templateUrl: './chatroom-message.component.html',
  styleUrls: ['./chatroom-message.component.scss']
})
export class ChatroomMessageComponent implements OnInit {

  @Input() message: Message;
  constructor() { }

  ngOnInit() {
  }

}

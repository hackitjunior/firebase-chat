import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  // TODO replace with firebase data
  public dummyData = [
    {
      message: 'Mensaje 1',
      createdAt: new Date(),
      sender: {
        firstName: 'Alberto',
        lastName: 'Silva',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    },
    {
      message: 'Mensaje 2',
      createdAt: new Date(),
      sender: {
        firstName: 'Alberto',
        lastName: 'Guzmán',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}

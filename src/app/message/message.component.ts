import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

    
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;
  delkey:string;
 
  constructor(private authService: AuthService, private chatService:ChatService) {
    
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit(chatMessage = this.chatMessage) {
    if(this.chatMessage){
      this.chatService.message_come = true;
    }
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    this.delkey = chatMessage.$key;

   window.setTimeout(()=>{
      this.chatService.message_come = false;
    },1000)

    // console.log(this.chatMessage)
  }

  messageselect(event){
    // console.log(event.target.offsetParent.childNodes[0].innerText);
    let key = event.target.offsetParent.childNodes[0].innerText;
   this.deletemessage(key);
  }

  deletemessage(key){ 
    this.chatService.deletesinglechat(key);
  }

}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollToBottomDirective } from './scroll-to-bottom-directive.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective|undefined;
  
  chatStarted : boolean = false;
  messages : string[] = [];
  queryText : any;
  sendWait : boolean = false;

  messagesText: string[] = [
    "Merhaba",
    "Nasılsınız?",
    "İyi günler",
    "Ne yapıyorsunuz?",
    "Hava nasıl?",
    "Hayırlı olsun",
    "Teşekkür ederim",
    "İyi akşamlar",
    "Başarılar",
    "Güle güle"
  ];

  constructor(private sanitizer: DomSanitizer) { }
  
  ngOnInit() {
    this.messages = [];
  }

  getHour() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return `${hours}:${minutes}`;
  }

  getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * this.messagesText.length);
    return this.messagesText[randomIndex];
  }

  keyUp() {
    if(!this.sendWait)
      this.generateQuery();
  }

  generateQuery() {
    if(this.queryText == undefined || this.queryText == "") {
      alert("Please enter the message");
      return;
    }

    this.chatStarted = true;
    const userName = "Test";
    let message = {
      name : userName,
      text : this.queryText,
      time : this.getHour(),
      initial : userName.charAt(0).toUpperCase(),
      class : "right-msg",
      loading : ""
    };
    
    const mes = this.messageCreate(message);
    this.messages.push(mes);
    this.sendWait = true;
    this.queryText = "";
    this.generateAnswer();
  }

  generateAnswer() {
    // Belirli bir süre sonra sendWait'i false yap
    const userName = "Chat Bot";
    let message = {
      name : userName,
      text : "",
      time : this.getHour(),
      initial : userName.charAt(0).toUpperCase(),
      class : "left-msg",
      loading : " loading-text"
    };
    const mes = this.messageCreate(message);
    this.messages.push(mes);

    setTimeout(() => {
      let updateMes = this.messages[this.messages.length - 1];
      updateMes.loading = "";
      updateMes.text = "this.getRandomMessage()";
      this.sendWait = false;
    }, 5000); // 5000 ms (5 saniye) süreyle ekletildiğini varsayalım
  }

  messageCreate(message : any) {
    return `<div class="msg ${message.class}">
      <div class="msg-img">${message.initial}</div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${message.name}</div>
          <div class="msg-info-time">${message.time}</div>
        </div>
        <div class="msg-text${message.loading}">${message.text}</div>
      </div>
    </div>`;
  }

  sanitizeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

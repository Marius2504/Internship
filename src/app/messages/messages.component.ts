import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages:Message[]=[];
  pagination:Pagination;
  container='Unread';
  pageNumber=1;
  pageSize=5;
  loading=false;

  constructor(private messageService:MessageService) {
    this.loadMessages();
   }

  ngOnInit(): void {
  }

  loadMessages()
  {
    this.loading=true;
    return this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe({
      next:Response =>{
        this.pagination=Response.pagination,
        this.messages=Response.result,
        this.loading=false
      }});
  }
  pageChanged(event:any)
  {
    if(this.pageNumber!=event.pageNumber){
      this.pageNumber = event.pageNumber;
      this.loadMessages();
    }
    
  }
  deleteMessage(id:number)
  {
    this.messageService.deleteMessage(id).subscribe(()=>{
      this.messages.splice(this.messages.findIndex(m=>m.id==id),1);
    })
  }


}

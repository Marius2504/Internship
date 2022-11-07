import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { AccountService } from 'src/app/_services/account.service';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  members:Partial<Member[]>
  predicate='liked'
  pageNumber=1
  pageSize=5
  pagination:Pagination
  constructor(private memberService:MembersService,private accountService:AccountService) {
    
   }

  ngOnInit(): void {
    this.loadLikes()
  }
  loadLikes()
  {
    this.memberService.getLikes(this.predicate,this.pageNumber,this.pageSize)
    .subscribe((Response)=>{
      
      this.members=Response.result;
      this.pagination = Response.pagination;
    })
  }
  pageChanged(event:any)
  {
    this.pageNumber = event.page;
    this.loadLikes()

  }
  

}
/*
<div class="row">
    <div *ngFor="let member of members|async" class="col-2">
        <app-member-card [member]="member"></app-member-card>
    </div>
</div>
*/
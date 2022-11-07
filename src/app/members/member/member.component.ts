import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  members:Member[]
  pagination:Pagination;
  userParams:UserParams;
  user:User;
  genderList=[{value:'male',display:'Males'},{value:'female',display:'Females'}]
  constructor(private memberService:MembersService) {
    this.userParams=memberService.getUserParams();
   }

  ngOnInit(): void {
    this.loadMembers()
  }
  loadMembers()
  {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(Response=>{
      this.members = Response.result;
      //console.log(this.members);
      this.pagination = Response.pagination;
    })
  }

  resetFilters()
  {

    this.userParams = this.memberService.resetUserParams();
    this.loadMembers()
  }


  pageChanged(event:any)
  {
    this.userParams.pageNumber=event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();

  }
}


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import {of, pipe} from 'rxjs';
import {map, take} from 'rxjs/operators'
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl:string = environment.apiUrl
  members:Member[]=[]
  memberCache=new Map();
  user:User;
  userParams:UserParams

  constructor(private http:HttpClient,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user;
      this.userParams=new UserParams(user);
    })
   }

   addLike(username:string)
   {
    return this.http.post(this.baseUrl + 'likes/' +username,{});
   }

   getLikes(predicate:string,pageNumber:number,pageSize:number)
   {
    let params = getPaginationHeaders(pageNumber,pageSize);
    params = params.append('predicate',predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes',params,this.http);
   }

  getUserParams()
  {
    return this.userParams;
  }
  setUserParams(userParams:UserParams)
  {
    this.userParams=userParams;
  }

  resetUserParams()
  {
    this.userParams = new UserParams(this.user)
    return this.userParams;
  }

  getMembers(UserParams:UserParams)
  {
    //console.log(Object.values(UserParams).join("-"))
    var response = this.memberCache.get(Object.values(UserParams).join("-"));
    if(response)
    {
      return of(response);
    }
    let params = getPaginationHeaders(UserParams.pageNumber,UserParams.pageSize);

    params = params.append('minAge',UserParams.minAge.toString());
    params = params.append('maxAge',UserParams.maxAge.toString());
    params = params.append('gender',UserParams.gender);
    params = params.append('orderBy',UserParams.orderBy);
    //console.log('Bearer ' + JSON.parse(localStorage.getItem('user'))?.token)
    return getPaginatedResult<Member[]>(this.baseUrl + 'users',params,this.http)
    .pipe(map(response =>{
      this.memberCache.set(Object.values(UserParams).join("-"),response);
      return response;
    }))
  }

  getMember(username:string)
  {
    const member =[...this.memberCache.values()]
    .reduce((prev,curr)=>prev.concat(curr.result),[])
    .find((member:Member)=>member.userName == username)

    if(member) return of(member)
    console.log(member);
    return this.http.get<Member>(this.baseUrl +'users/' +username);
  }
  updateMember(member:Member)
  {
    return this.http.put(this.baseUrl + 'users/',member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
  setMainPhoto(photoId:number)
  {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId,{})
  }
  deletePhoto(photoId:number)
  {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}

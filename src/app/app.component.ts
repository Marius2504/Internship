import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title ='da'
  users:any
  constructor(private http:HttpClient){}
  ngOnInit(): void {
      this.http.get('https://localhost:44311/api/users').subscribe({
        next:Response => {this.users = Response, console.log(Response)}, 
        error:error =>console.log(error)
      })
  }
}

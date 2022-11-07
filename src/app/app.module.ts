import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  title ='da'
  constructor(private http:HttpClient){}
  ngOnInit(): void {
      this.http.get('https://localhost:5000/api/users').subscribe(Response => {
        this.title = Response.toString()
      },error =>{
        console.log(error)
      })
  }
 }

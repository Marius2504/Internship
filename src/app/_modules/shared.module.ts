import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule} from '@kolkov/ngx-gallery'
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot()
    

  ],
  exports:[
    FormsModule,BsDropdownModule,TabsModule,FileUploadModule,BsDatepickerModule,
    PaginationModule,ButtonsModule,TimeagoModule,NgxGalleryModule
  ]
})
export class SharedModule { }

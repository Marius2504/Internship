import { Injectable } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequest=0

  constructor(private spinnerService:NgxSpinnerService) { }

  busy()
  {
    this.busyRequest++;
    this.spinnerService.show(undefined,{
      type:'line-scale-party',
      bdColor:'rgba(255,255,255,0)',
      color:'#333333',

    });
  }
  idle()
  {
    this.busyRequest--;
    if(this.busyRequest<=0)
    {
      this.busyRequest=0;
      this.spinnerService.hide();
    }
  }
}

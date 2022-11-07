import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveToast } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { NgxGalleryOptions} from '@kolkov/ngx-gallery'
import { NgxGalleryImage} from '@kolkov/ngx-gallery'
import { NgxGalleryAnimation} from '@kolkov/ngx-gallery'
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs:TabsetComponent;
  member:Member;
  galleryOptions:NgxGalleryOptions[];
  galleryImage:NgxGalleryImage[];
  activeTab:TabDirective;
  messages:Message[]=[]

  constructor(private memberService:MembersService, private route:ActivatedRoute,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.member=data.member;
    })
    this.route.queryParams.subscribe(params =>{
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })
    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ];
    this.galleryImage = this.getImages();
    
  }
  getImages():NgxGalleryImage[]{
      const imageUrls=[]
      for(const photo of this.member.photos){
        
        imageUrls.push({
          small:photo?.url,
          medium:photo?.url,
          big:photo?.url
        })
      }
      return imageUrls;
  }

  onTabActivated(data:TabDirective)
  {
    this.activeTab =data;
    if(this.activeTab.heading ==='Messages' && this.messages.length ==0)
    {
        this.loadMessages();
    }
  }
  loadMessages()
  {
    this.messageService.getMessageThread(this.member.userName).subscribe({
      next:Response=>this.messages=Response
    });
  }
  selectTab(tabId:number)
  {
    this.memberTabs.tabs[tabId].active=true;
  }
  

}

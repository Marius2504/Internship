import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './members/lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberComponent} from './members/member/member.component'
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedRelover } from './_resolvers/member-detailed.resolver';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'',
   runGuardsAndResolvers:'always',
   canActivate:[AuthGuard],
   children:[
    {path:'members',component:MemberComponent, canActivate:[AuthGuard]},
    {path:'members/:username',component:MemberDetailComponent, resolve:{member:MemberDetailedRelover}},
    {path:'member/edit',component:MemberEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},
    {path:'lists',component:ListsComponent},
    {path:'messages',component:MessagesComponent},
   ]
  },
  {path:'errors',component:TestErrorsComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

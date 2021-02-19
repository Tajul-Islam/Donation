import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AllDonationComponent} from './all-donation/all-donation.component';
import {AuthGuard} from './auth/auth.guard';
import { PostDonationComponent } from './post-donation/post-donation.component';
import {BloodGroupComponent} from './blood-group/blood-group.component';
import {MyPostComponent} from './my-post/my-post.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: AllDonationComponent, canActivate: [AuthGuard]},
  {path: 'donate', component: PostDonationComponent, canActivate: [AuthGuard]},
  {path: 'bloodgroup', component: BloodGroupComponent, canActivate: [AuthGuard]},
  {path: 'mypost', component: MyPostComponent, canActivate: [AuthGuard]},
  {path: '***', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

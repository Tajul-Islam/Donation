import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from './auth/auth.service';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  items: MenuItem[];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.items = [
      {
        label: 'Wall of Humanity',
        routerLink: '/home'
      },
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label: 'Blood Group',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: '/bloodgroup'
      },
      {
        label: 'Post Donation',
        icon: 'pi pi-fw pi-upload',
        routerLink: '/donate'
      }
      ,
      {
        label: 'My Post',
        icon: 'pi pi-fw pi-user',
        routerLink: '/mypost'
      }
    ];
  }
  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

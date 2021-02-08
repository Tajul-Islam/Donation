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
        label: 'Test',
        routerLink: 'home'
      },
      {
        label: 'Page 1',
        icon: 'pi pi-fw pi-home',
        routerLink: 'home'
      },
      {
        label: 'Page 2',
        icon: 'pi pi-fw pi-user'
      },
      {
        label: 'Page 3',
        icon: 'pi pi-fw pi-bars'
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

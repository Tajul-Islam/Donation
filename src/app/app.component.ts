import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Test';
  items: MenuItem[];
  ngOnInit() {
    this.items = [
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
}

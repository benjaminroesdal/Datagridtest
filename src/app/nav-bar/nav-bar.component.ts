import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  items: MenuItem[] = [];

  ngOnInit() {
      this.items = [
          {label: 'DataGrid', icon: 'pi pi-fw pi-home'},
          {label: 'Upload', icon: 'pi pi-fw pi-upload'}
      ];
  }

}

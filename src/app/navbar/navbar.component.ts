import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  actions: Array<any> = [
    { title: "Home", "route": "/admin/home", icon: "house" },
    { title: "Products", "route": "/admin/products", icon: "search" },
    { title: "New Product", "route": "/admin/newProduct", icon: "safef" }
  ];

  currentAction: any;

  // public isLoading: boolean = false;

  constructor(public appState: AppStateService, public loadingService: LoadingService, private router: Router) {
    // this.loadingService.isLoading$.subscribe({
    //   next: (value) => {
    //     this.isLoading = value;
    //   }
    // })
  }

  ngOnInit(): void {

  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  login() {
    this.router.navigateByUrl("/login");
  }

  logout() {
    this.appState.authState = {};
    this.router.navigateByUrl("/login");
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { CatalogItemsComponent } from './catalog-items/catalog-items.component';
import { AuthService } from './auth.service';
import { CartComponent } from './cart/cart.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CatalogItemsComponent, CartComponent],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'order-tracking-angular-app';

  constructor(private authService: AuthService) {} 

  ngOnInit(): void {}

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn(); 
  }

  login(): void {
    this.authService.login(); 
  }

  logout(): void {
    this.authService.logout(); 
  }

  getAccessToken(): boolean {
    return !!this.authService.getAccessToken(); 
  }


}

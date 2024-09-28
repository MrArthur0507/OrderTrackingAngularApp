import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { CatalogItemsComponent } from './catalog-items/catalog-items.component';
import { AuthService } from './auth.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CatalogItemsComponent, CartComponent, RouterLink],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'order-tracking-angular-app';
  cartItemCount = 0;
  constructor(private authService: AuthService, private cartService: CartService) {} 

  ngOnInit(): void {
    this.fetchCart();
  }

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

  fetchCart() {
    this.cartService.fetchCart().subscribe({
      next: (item) => {
        this.cartItemCount = item.items.length;
      }
    });
  }

}

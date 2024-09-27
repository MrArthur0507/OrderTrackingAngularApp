import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: any;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.fetchCart().subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => {
        console.error('Error fetching items', err);
      },
      complete: () => {
        console.log('Fetching finished');
      }
    });
  }
}

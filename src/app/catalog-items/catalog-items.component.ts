import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-catalog-items',
  standalone: true,
  imports: [],
  templateUrl: './catalog-items.component.html',
  styleUrl: './catalog-items.component.css'
})
export class CatalogItemsComponent implements OnInit {

  items: any[] = [];

  ngOnInit(): void {
    this.fetchItems();
  }

  constructor(private http: HttpClient, private cartService: CartService) {}

  fetchItems() {
    const apiUrl = 'http://localhost:5001/api/Catalog/getItems';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.items = data; 
      },
      error: (err) => {
        console.error('Error fetching items:', err); 
      },
      complete: () => {
        console.log('Request completed'); 
      }
    });
  }

  addToCart(item : any) {
    this.cartService.addToCart(item).subscribe({
      next:() => console.log("added"),
    });
  }

}

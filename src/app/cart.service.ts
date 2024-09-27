import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = "http://localhost:7000/api/Cart"; 

  constructor(private httpClient: HttpClient) { }

  fetchCart(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/getCart`);
  }
}
  

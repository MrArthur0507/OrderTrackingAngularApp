import { Routes } from '@angular/router';
import { CatalogItemsComponent } from './catalog-items/catalog-items.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: "cart", component: CartComponent},
    { path: '', component: CatalogItemsComponent}
];

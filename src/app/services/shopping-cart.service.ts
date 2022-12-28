import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private firebase: AngularFirestore, private productService: ProductService) {}

  addProduct(product: Product, userId: string): Promise<any> {
    console.log(`Agregando a ruta -> users/${userId}/shopping_cart/`);
    return this.firebase.collection(`users/${userId}/shopping_cart`).doc(product.id).set({
      name: product.name,
      description: product.description,
      price: product.price,
      img_url: product.img_url
    });
  }

  deleteProduct(userId: string, product: Product): Promise<any> {
    return this.firebase.collection(`users/${userId}/shopping_cart`).doc(product.id).delete()
    .then(() => {
      this.productService.addProduct(product).then(() => {});
    });
  }

  getProducts(userId: string): Observable<any> {
    // snapshotChanges() se ejecuta cada vez que detecta un cambio.
    return this.firebase.collection(`users/${userId}/shopping_cart`).snapshotChanges();
  }
}

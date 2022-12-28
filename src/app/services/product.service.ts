import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore) { }

  saveProduct(product: Product): Promise<any> {
    // Agrega un nuevo usuario a la colección de usuarios.
    // Si la colección no existe la crea y añade el usuario.
    return this.firebase.collection('products').add(product);
  }

  addProduct(product: Product): Promise<any> {
    return this.firebase.collection(`products`).doc(product.id).set({
      name: product.name,
      description: product.description,
      price: product.price,
      img_url: product.img_url
    });
  }

  removeFromInventory(product: Product): Promise<any> {
    return this.firebase.collection('products').doc(product.id).delete();
  }

  getProducts(): Observable<any> {
    // snapshotChanges() se ejecuta cada vez que detecta un cambio.
    return this.firebase.collection('products').snapshotChanges();
    // return this.firebase.collection('products').get();
  }
}

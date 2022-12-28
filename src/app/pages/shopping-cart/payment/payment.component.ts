import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  loadingSpinner: boolean = false;
  userCollectionId: string = '';
  totalPrice: number = 0;
  cartProducts: Product[] = [];
  currentUser: User = new User('', '', '', '', 0);

  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService
  ) { }

  pay(){
    this.loadingSpinner = true;
    this.getUserCollectionId().then(() => {
      this.getCurrentUser().then(() => {
        this.shoppingCartService.getProducts(this.userCollectionId).subscribe(doc => {
          this.cartProducts = [];
          this.totalPrice = 0;
          doc.forEach((product: any) => {
            this.totalPrice += Number(product.payload.doc.data().price);
            this.cartProducts.push(new Product(
              product.payload.doc.data().name,
              product.payload.doc.data().price, 
              product.payload.doc.data().description,
              product.payload.doc.data().img_url,
              product.payload.doc.id,
            ));
          });
          if (this.totalPrice <= this.currentUser.wallet) {
            this.userService.updateWallet(Number(this.currentUser.wallet) - Number(this.totalPrice), this.userCollectionId);
            this.cartProducts.forEach((product: any) => {
              this.shoppingCartService.deleteProduct(this.userCollectionId, product);
            })
            this.loadingSpinner = false;
            this.router.navigate(['/shopping-cart/confirmation'])
          } else {
            
          }
        });
      })
    })
    // this.router.navigate(['/shopping-cart/confirmation'])
    
  }

  getUserCollectionId() {
    return new Promise((resolve, reject) => {
      this.authService.getUserLogged().subscribe((userLogged) => {
        if (userLogged?.email != null) {
          this.userService.getUsers().subscribe((users) => {
            users.forEach((user: any) => {
              if (userLogged.email == user.payload.doc.data().email) {
                this.userCollectionId = user.payload.doc.id;
              }
            });
            resolve(this.userCollectionId);
          });
        }
      });
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.userService.getUsers().subscribe((res) => {
        res.forEach((user: any) => {
          if (this.userCollectionId == user.payload.doc.id) {
            this.currentUser = new User(
              user.payload.doc.data().firstName,
              user.payload.doc.data().secondName,
              user.payload.doc.data().email,
              user.payload.doc.data().password,
              user.payload.doc.data().wallet
            );
          }
        });
        resolve(this.currentUser);
      });
    });
  }

  codeInfo() {
    alert("El número de seguridad consta de tres dígitos y se encuentra en la parte posterior de la tarjeta");
  }

  ngOnInit(): void {
  }

}

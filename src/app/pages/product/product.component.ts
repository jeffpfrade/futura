import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  currentProduct: Product = new Product('', 0, '', '');
  alreadyAdded: boolean = false;
  loadingSpinner: boolean = false;
  userCollectionId: string = '';
  productId: string = '';
  amount: number = 1;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.productId = params['id'];
    });
  }

  addProductToCart() {
    this.amount = Number(
      (<HTMLInputElement>document.getElementById('amount')).value
    );
    if (this.amount == 0) {
      this.amount = 1;
    }
    if (this.userCollectionId == '') {
      this.router.navigate(['/sign-in']);
    } else {
      this.shoppingCartService
        .addProduct(this.currentProduct, this.userCollectionId)
        .then(() => {
          console.log(`Product added`);
        })
        .catch((err) => {
          console.log(err);
          this.toastr.error('Ha ocurrido un error');
        });
    }
  }

  getUserCollectionId() {
    return new Promise((resolve, reject) => {
      this.auth.getUserLogged().subscribe((userLogged) => {
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

  getCartProducts() {
    return new Promise((resolve, reject) => {
      this.shoppingCartService
        .getProducts(this.userCollectionId)
        .subscribe((doc) => {
          doc.forEach((product: any) => {
            if (this.currentProduct.id == product.payload.doc.id) {
              this.alreadyAdded = true;
            }
          });
          resolve(this.alreadyAdded);
        });
    });
  }

  getDetails() {
    return new Promise((resolve, reject) => {
      console.log('Cargando productos de Firebase ...');
      this.productService.getProducts().subscribe((doc) => {
        doc.forEach((product: any) => {
          if (this.productId == product.payload.doc.id) {
            this.currentProduct = new Product(
              product.payload.doc.data().name,
              product.payload.doc.data().price,
              product.payload.doc.data().description,
              product.payload.doc.data().img_url,
              product.payload.doc.id
            );
          }
        });
        resolve(this.currentProduct);
      });
    });
  }

  ngOnInit(): void {
    this.loadingSpinner = true;
    console.log('ID:' + this.productId);
    this.getDetails().then((data) => {
      console.log(data);
      this.getUserCollectionId().then((res) => {
        console.log(`User Collection Id: ${res}`);
        this.getCartProducts().then((res) => {
          console.log(res);
        });
      });
      this.loadingSpinner = false;
    });
  }
}

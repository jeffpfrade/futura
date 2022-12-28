import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {

  form: FormGroup;
  loadingSpinner: boolean = false;
  userCollectionId: string = '';
  currentUser: User = new User('', '', '', '', 0);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public auth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
    });
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

  addMoney(){
    if (this.form.value.amount >= 0 && typeof(this.form.value.amount) == 'number') {
      this.userService.updateWallet(Number(this.form.value.amount) + Number(this.currentUser.wallet), this.userCollectionId).then(res => {
        console.log("Money added");
        this.router.navigate(['/my-account/my-wallet']);
      })
    } else {
      alert("La cantidad a ingresar debe ser mayor a 0");
      this.form.reset();
    }
  }

  ngOnInit(): void {
    this.loadingSpinner = true;
    this.getUserCollectionId().then((res) => {
      this.getCurrentUser().then((data) => {
        console.log(data);
        this.loadingSpinner = false;
      });
    });
  }

}

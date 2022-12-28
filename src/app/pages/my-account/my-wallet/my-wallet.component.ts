import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {

  loadingSpinner: boolean = false;
  userCollectionId: string = '';
  currentUser: User = new User('', '', '', '', 0);

  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService
  ) { }

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

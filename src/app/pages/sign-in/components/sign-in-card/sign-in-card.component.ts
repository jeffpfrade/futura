import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in-card',
  templateUrl: './sign-in-card.component.html',
  styleUrls: ['./sign-in-card.component.css']
})
export class SignInCardComponent implements OnInit {

  loadingSpinner = false;
  error: any;
  email: any;
  password: any;
  fieldTextType: boolean = false;

  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  signIn(){
    this.loadingSpinner = true;
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.loadingSpinner = false;
        this.toastr.success('Se ha iniciado sesión!', '', {timeOut: 800});
        this.router.navigate(['/']).then(() => {});
      })
      .catch((err) => {
        console.log(`Sign In login Error: ${err}`);
        this.error = err;
        this.loadingSpinner = false;
      });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fieldPasswordType: boolean = false;
  fieldConfirmPasswordType: boolean = false;
  emailError = false;
  passwordError = false;
  email: any;
  ///////////////
  form: FormGroup;
  loadingSpinner = false;
  error: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      conditions: ['', Validators.required]
    });
  }

  /**
   * Registra un nuevo usuario a la base de datos.
   */
   async register() {
    this.loadingSpinner = true;
    await this.auth
      .createUserWithEmailAndPassword(
        this.form.value.email,
        this.form.value.password
      )
      .then(() => {
        // Añadimos el usuario a una colección de usuarios.
        const user: User = {
          firstName: this.form.value.firstName,
          secondName: this.form.value.secondName,
          email: this.form.value.email,
          password: this.form.value.password,
          wallet: 1000
        };
        this.userService
          .saveUser(user)
          .then(() => {
            this.toastr.success(
              'Usuario añadido a Firebase!, Usuario registrado.'
            );
            console.log('Usuario añadido a colección de usuarios...');
            // Evitamos que inicie sesion automáticamente.
            this.auth.signOut();
            this.loadingSpinner = false;
            // Redirigimos al inicio de sesion.
            this.router.navigate(['/sign-in']);
          })
          .catch((err) => {
            console.log(err);
            this.error = err;
          });
      })
      .catch((error) => {
        // Handle Errors here.
        this.error = error;
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          this.toastr.error(
            'El email ya existe.',
            'El usuario ya ha sido registrado'
          );
        } else {
          alert(errorMessage);
        }
        console.log(error);
        this.loadingSpinner = false;
        this.form.reset();
      });
    // Actualizamos el nombre.
    this.auth.currentUser.then((user) => {
      user
        ?.updateProfile({
          displayName: this.form.value.firstName,
        })
        .then(
          function () {
            // Update successful.
          },
          function (error) {
            // An error happened.
          }
        );
    });
  }

  toggleFieldPasswordType() {
    this.fieldPasswordType = !this.fieldPasswordType;
  }

  toggleFieldConfirmPasswordType() {
    this.fieldConfirmPasswordType = !this.fieldConfirmPasswordType;
  }

  ngOnInit(): void {
  }

}

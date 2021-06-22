import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// services
import { AuthService } from '../../services/auth.service';
// materials
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [''],
      first_name: [''],
      last_name: [''],
      password: [''],
    });
  }

  get f() { return this.registerForm.controls; }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openEmailActivationSnackBar() {
    this._snackBar.open("Activation email sent ", "OK, I'll check that NOW", {});
  }

  openIncorrectOperationSnackBar() {
    this._snackBar.open("This email address already registers", "OK", {
      duration: 2000,
    });
  }

  openSignupNotAllowedSnackBar() {
    this._snackBar.open("You are not allowed to sign up", "OK", {
      duration: 2000,
    });
  }

  register() {
    const email = this.f.email.value;
    const domainPattern = "(?<=@)[^.]+(?=\.)";
    const domain = email.match(domainPattern)[0];
    if (domain == "riverfortcapital" || domain == "terravista-partners") {
      this.authService.register(
        {
          email: this.f.email.value,
          first_name: this.f.first_name.value,
          last_name: this.f.last_name.value,
          password: this.f.password.value,
        }
      ).subscribe(success => {
        if (success) {
          this.openEmailActivationSnackBar();
          this.registerForm.reset();
          // this.router.navigate(['/dashboard']);
        } else {
          this.openIncorrectOperationSnackBar();
          this.registerForm.reset();
        }
      });
    } else {
      this.openSignupNotAllowedSnackBar();
      this.registerForm.reset();
    }
  }

}

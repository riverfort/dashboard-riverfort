import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// services
import { AuthService } from '../../services/auth.service';
// materials
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.authService.login(
      {
        email: this.f.email.value,
        password: this.f.password.value
      }
    ).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard'])
      } else {
        this.openIncorrectEmailOrPasswordSnackBar();
      }
    });
  }

  openIncorrectEmailOrPasswordSnackBar() {
    this._snackBar.open("Incorrect email or password", "OK", {
      duration: 2000,
    });
  }

}

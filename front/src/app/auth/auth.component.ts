import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  isSubmitting: boolean;
  isRegister: boolean;
  authForm: FormGroup;
  submitTitle: string;
  buttonTitle: string;
  optionText: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {
    this.authForm = fb.group({
      // 'email': ['', Validators.required, Validators.email],
      // 'password': ['', Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/)]
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.isRegister = data[data.length - 1].path === 'register';

      this.submitTitle = this.isRegister ? 'Register' : 'Login';
      this.buttonTitle = this.isRegister ? 'Login' : 'Register';
      this.optionText = this.isRegister ? 'Already have account ?' : 'Haven\'t account yet ?';

      // add form control for nickname if this is the register page
      if (this.isRegister) {
        this.authForm.addControl('nickname', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;

    const authData = this.authForm.value;
    const authType = this.isRegister ? 'register' : 'login';

    this.userService
    .attemptAuth(authType, authData)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        console.error('ERRIR ', err);
        this.isSubmitting = false;
      }
    );
  }
}

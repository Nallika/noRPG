import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PlayerService } from '../core/services/player.service';
import { ApiService } from '../core/services/api.service';
import { uniqValidator } from '../core/validators/uniq-validator';
import { authType } from '../types/generalTypes';

/**
 * Component that displayed register or login form.
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  authType: authType;
  isSubmitting: boolean;
  authForm: FormGroup;
  error: string;

  constructor(
    private playerService: PlayerService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {
    this.authForm = fb.group({
      'email': ['', [ Validators.required, Validators.email ]],
      'password': ['', [ Validators.required, Validators.pattern(/^(?=.*\d).{6,16}$/) ]]
    }, {updateOn: 'blur'});
  }

  get nickname(): FormControl {
    return this.authForm.get('nickname') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path === 'register' ? 'register' : 'login';
      // Dinamically change form for registration
      if (this.isRegister()) {
        this.authForm.addControl('nickname', new FormControl('', {
          validators: [Validators.required, Validators.maxLength(20)],
          asyncValidators: [uniqValidator.validate(this.apiService, 'nick')],
          updateOn: 'blur'
        }));

        this.email.addAsyncValidators([uniqValidator.validate(this.apiService, 'email')]);
      }
    });
  }

  isRegister() {
    return this.authType === 'register';
  }

  navigateTo() {
    const url = this.isRegister() ? 'login' : 'register';
    this.router.navigateByUrl(`/${url}`);
  }

  /**
   * Process user registration or login
   */
  submitForm() {
   this.error = '';
   this.authForm.markAllAsTouched();

   if (this.authForm.invalid) {
    return;
   }

    this.isSubmitting = true;
    const authData = this.authForm.value;

    // attemptAuth runs http.pos under the hood
    this.playerService
      .attemptAuth(this.authType, authData)
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (error) => {
          this.error = error.message;
          this.isSubmitting = false;
        }
      });
  }
}

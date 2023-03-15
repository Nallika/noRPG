import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PlayerService } from '../core/services/player.service';
import { authType } from '../types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  authType: authType;
  isSubmitting: boolean;
  authForm: FormGroup;
  submitTitle: string;
  buttonTitle: string;
  optionText: string;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {
    this.authForm = fb.group({
      'email': ['', [ Validators.required, Validators.email ]],
      'password': ['', [ Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/) ]]
    });
  }

  ngOnInit() {
    this.route.url.pipe().subscribe(data => {
      this.authType = data[data.length - 1].path === 'register' ? 'register' : 'login';

      // add form control for nickname if this is the register page
      if (this.isRegister()) {
        this.authForm.addControl('nickname', new FormControl('', [ Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$") ]));
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

  submitForm() {
    this.isSubmitting = true;

    const authData = this.authForm.value;

    this.playerService
      .attemptAuth(this.authType, authData)
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (error) => {
          console.error('ERRIR ', error);
          this.isSubmitting = false;
        }
      });
  }
}
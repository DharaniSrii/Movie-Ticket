import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import Validation from '../utils/Validation';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  signupForm!: FormGroup;
  loginForm!: FormGroup;
  adminLoginForm!: FormGroup;
  addTheaterForm!: FormGroup;
  addMovieForm!: FormGroup;
  hideLoginPwd = true
  hideSignUpPwd = true
  hideSignUpConfirmPwd = true
  tabIndex = 0 //Default login page

  constructor( private formBuilder: FormBuilder,  private toastMsg: ToastrService, private _snackBar: MatSnackBar ) { 

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
    
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]  
    },{
      validators: [Validation.match('password', 'confirmPassword')]
    })

    this.adminLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      passCode: ['', [Validators.required]]
    })

    this.addTheaterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      city:['',[Validators.required]],
      description: ['', [Validators.required]]
    })

    this.addMovieForm = this.formBuilder.group({
      theaterId: [''],
      theaterCity:[''],
      theaterName: ['', [Validators.required]],
      movieName:['',[Validators.required]],
      runTime:['', [Validators.required]],
      showDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }


  toggle()
  {
    this.tabIndex = (this.tabIndex +1) %2
    this.resetForms()
  }

  resetForms()
  {
    this.loginForm.reset()
    this.signupForm.reset()
    this.hideLoginPwd = true
    this.hideSignUpPwd = true
    this.hideSignUpConfirmPwd = true
    
    
  }
  setLocalStorageData(key: string, value: any)
  {
    localStorage.setItem(key, value)
  }
 removeAllLocalStorage()
 {
  localStorage.removeItem('Zr-Auth-Email')
  localStorage.removeItem('Zr-Auth-Username')
  localStorage.removeItem('Zr-Auth-AccessToken')
 }
  notifyError(msg: string, subtitle: string)
  {
     this._snackBar.open(msg+'\n'+subtitle,'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:5000,
      panelClass: ['error-snackbar'],
    });
  }

  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 6000,
    horizontalPosition: 'left',
    verticalPosition: 'bottom'
  };

  notifySuccess(msg: string, subtitle: string)
  {
    this._snackBar.open(msg+'\n'+subtitle,'', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:6000,
      panelClass : ['text-wrap']
    });
  }

  firebaseErrorParse(errorCode: string): string {

    let message: string;

    switch (errorCode) {
      case 'auth/wrong-password':
        message = 'Invalid login credentials.';
        break;
      case 'auth/network-request-failed':
        message = 'Please check your internet connection';
        break;
      case 'auth/too-many-requests':
        message =
          'We have detected too many requests from your device. Take a break please!';
        break;
      case 'auth/user-disabled':
        message =
          'Your account has been disabled or deleted. Please contact the system administrator.';
        break;
      case 'auth/requires-recent-login':
        message = 'Please login again and try again!';
        break;
      case 'auth/email-already-exists':
        message = 'Email address is already in use by an existing user.';
        break;
      case 'auth/user-not-found':
        message =
          'We could not find user account associated with the email address.';
        break;
      case 'auth/phone-number-already-exists':
        message = 'The phone number is already in use by an existing user.';
        break;
      case 'auth/invalid-phone-number':
        message = 'The phone number is not a valid phone number!';
        break;
      case 'auth/invalid-email  ':
        message = 'The email address is not a valid email address!';
        break;
      case 'auth/cannot-delete-own-user-account':
        message = 'You cannot delete your own user account.';
        break;
       default:
        message = 'Oops! Something went wrong. Try again later.';
        break;
    }

    return message;
  }
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  isEliteUser: boolean;
}

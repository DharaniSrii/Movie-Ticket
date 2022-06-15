import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { constants } from 'src/assets/constants';

import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  @ViewChild('loginFormRef') loginFormRef!: NgForm;

  constructor(
    private authService: AuthService, 
    public helper: HelperService,
    public backendService: BackendService,
    public snackBar: MatSnackBar,
    public router: Router
    )
    { }

  loginBtnFlag = 0 //0 enable 1 disbale with loader
  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loginFormRef.resetForm()
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  
  onLogin()
  {
    
    if(this.helper.loginForm.valid)
    {
      this.loginBtnFlag = 1
      const email  = this.helper.loginForm.value['email']+"".trim()
      const passowrd  = this.helper.loginForm.value['password']+"".trim()
      this.authService.signInUser(email, passowrd).then(data => {
        this.helper.notifySuccess("Login succesfull :)", "")
        this.authService.isUserLogin = true
        this.router.navigate(['ticket-booking'])
        this.loginBtnFlag = 0
      })
      .catch(err=>{
        
        var err_msg = this.helper.firebaseErrorParse(err.code)

        if(err.code == "auth/wrong-password")
        {
          this.helper.loginForm.controls['password'].reset()
        }
        else 
        {
          this.helper.loginForm.reset()
        }
        this.helper.notifyError(err_msg, "")
        this.loginBtnFlag = 0
      })     
    }
  }
}

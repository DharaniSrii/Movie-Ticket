import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  @ViewChild('signupFormRef') signupFormRef!: NgForm;
  submitFlag = 0

  constructor(
    private authService: AuthService,
    public helper: HelperService
  ) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.signupFormRef.resetForm()
    });

  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }




  onSignUp() {
    if (this.helper.signupForm.valid) {
      this.submitFlag = 1
      const email = this.helper.signupForm.value['email'] + "".trim()
      const passowrd = this.helper.signupForm.value['password'] + "".trim()
      const username = this.helper.signupForm.value['username'] + "".trim()

      this.authService.signUpUser(email, passowrd, username).then(res => { 
        this.submitFlag = 0
        this.helper.notifySuccess("Account created","")
        this.helper.toggle()
      })
        .catch(err => {
          var err_msg = this.helper.firebaseErrorParse(err.code)
          if (err.code == "auth/email-already-in-use") {
            this.helper.notifyError("The email address is already in use by another account", "")
            this.helper.signupForm.controls['email'].setErrors({ 'incorrect': true })
            this.submitFlag = 0
          }
          else {
            this.signupFormRef.resetForm()
            this.helper.notifyError(err_msg, "")
            this.submitFlag = 0
          }
        })
      // this.helper.resetForms()

    }
  }

}

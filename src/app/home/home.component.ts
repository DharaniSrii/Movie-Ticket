import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { constants } from 'src/assets/constants';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { HelperService } from '../services/helper.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})

export class HomeComponent implements OnInit {

  constructor(public helper: HelperService, private authService: AuthService, public backendService: BackendService, public router: Router) { }

  tabChangeSubject: Subject<void> = new Subject<void>();

  appName = constants.App_Name
 

  ngOnInit(): void {
    this.authService.afAuth.onAuthStateChanged(user =>{
      if(user)
      {
        console.log("User logged in", user.email)
        this.authService.isUserLogin = true
        this.helper.notifySuccess("Login Successfull", "")
        this.router.navigate(['ticket-booking'])
        
      }
      else
      {
        console.log("User log out")
        this.authService.isUserLogin = false
        this.helper.removeAllLocalStorage()
      }
    })
  }
  
 
  onTabChange()
  {
    this.tabChangeSubject.next()
    this.helper.resetForms()
  }

  test()
  {
    this.authService.SignOut()
  }
  
  
}
export namespace ErroAuthEn {
  export function convertMessage(code: string): string {
      switch (code) {
          case 'auth/user-disabled': {
              return 'Sorry your user is disabled.';
          }
          case 'auth/user-not-found': {
              return 'Sorry user not found.';
          }
          case 'auth/email-already-in-use': {
              return 'Email Id already in use';
          }
          default: {
              return 'Login error try again later.';
          }
      }
  }
}

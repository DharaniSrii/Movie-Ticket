import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from 'src/assets/constants';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor( public helper: HelperService, public router:Router, private authHelper: AuthService) { }
  submitFlag = 0
  @ViewChild('adminLoginFormRef') adminLoginFormRef!: NgForm;

  ngOnInit(): void {
  }

  onAdminLogin()
  {
    if(!this.helper.adminLoginForm.invalid)
    {
      const email  = this.helper.adminLoginForm.value['email']+"".trim()
      const passoword  = this.helper.adminLoginForm.value['password']+"".trim()
      const passCode  = this.helper.adminLoginForm.value['passCode']+"".trim()

      if(email == constants.Admin_Email && passoword == constants.Admin_Pass && passCode == constants.Admin_Code)
      {
        this.authHelper.adminLogin = true
        this.adminLoginFormRef.resetForm()
        this.router.navigate(['admin-control'])
      }
      else
      {
        this.authHelper.adminLogin = false
        this.helper.notifyError("Please check the credentials", "")
        this.helper.adminLoginForm.reset()
      }
    }
  }
}

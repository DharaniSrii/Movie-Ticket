import { Component } from '@angular/core';
import { constants } from 'src/assets/constants';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Authenticator';
  appName = constants.App_Name

  constructor(public authHelper: AuthService)
  {

  }
}

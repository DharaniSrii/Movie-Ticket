import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { HomeComponent } from './home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { AdminAddTheaterComponent } from './admin-add-theater/admin-add-theater.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { AdminAddMovieComponent } from './admin-add-movie/admin-add-movie.component';
import { BookMovieComponent } from './book-movie/book-movie.component';
import { AdminViewBookingComponent } from './admin-view-booking/admin-view-booking.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AdminLoginComponent,
    AdminControlComponent,
    AdminAddTheaterComponent,
    TicketBookingComponent,
    AdminAddMovieComponent,
    BookMovieComponent,
    AdminViewBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot({preventDuplicates: true,positionClass: 'inline'}),
    MatSnackBarModule,
    HttpClientModule,
    MatRippleModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

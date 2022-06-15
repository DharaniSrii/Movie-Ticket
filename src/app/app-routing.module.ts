import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddMovieComponent } from './admin-add-movie/admin-add-movie.component';
import { AdminAddTheaterComponent } from './admin-add-theater/admin-add-theater.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookMovieComponent } from './book-movie/book-movie.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserAuthGuardService } from './services/user-auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'login', redirectTo:'', component: LoginComponent},
  {path:'signup', redirectTo:'', component: SignupComponent},
  {path:'admin', component:AdminLoginComponent},
  {path:'admin-control', component:AdminControlComponent, canActivate : [AdminAuthGuardService]},
  {path:'admin-add-theater', component:AdminAddTheaterComponent,  canActivate : [AdminAuthGuardService]},
  {path:'admin-add-movie', component:AdminAddMovieComponent,  canActivate : [AdminAuthGuardService]},
  {path:'ticket-booking', component: TicketBookingComponent,  canActivate : [UserAuthGuardService]},
  {path:'book-movie', component: BookMovieComponent,  canActivate : [UserAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

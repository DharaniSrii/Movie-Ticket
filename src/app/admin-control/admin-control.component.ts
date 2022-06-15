import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export class AdminControlComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  addTheater()
  {
    this.router.navigate(['admin-add-theater'])
  }

  addMovie()
  {
    this.router.navigate(['admin-add-movie'])
  }

  viewBookings()
  {
    this.router.navigate(['admin-view-booking'])
  }
}

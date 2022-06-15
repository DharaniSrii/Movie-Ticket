import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  constructor() { }
  Username =""
  totalTickets=""
  totalAmount=""
  TheaterName=""
  TheaterCity=""
  BookingTime=""
  noOfSeats=""
  theaterId=""

  resetData()
  {
    this.Username =""
    this.totalTickets=""
    this.totalAmount=""
    this.TheaterName=""
    this.TheaterCity=""
    this.BookingTime=""
    this.noOfSeats=""
    this.theaterId =""
  }
}

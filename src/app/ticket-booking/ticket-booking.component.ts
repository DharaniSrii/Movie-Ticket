import { AfterViewInit, Component, ElementRef, OnInit, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements  AfterViewInit {
  
  constructor(public backendHelper: BackendService) { 
   
  }
  moviesList:any
  displayedColumns: string[] = [ 'movieName', 'theaterCity', 'showDate','theaterName', 'action' ];
  ngAfterViewInit() {
    this.updateMovieList()
    };

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.moviesList.filter = filterValue.trim().toLowerCase();
    }

    updateMovieList()
    {
      this.backendHelper.getAllMovieList().then(data=>{
        this.moviesList = new MatTableDataSource(data)
        
      })
    }

    onBookNow(data:any)
    {
      console.log(data)
    }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-admin-add-movie',
  templateUrl: './admin-add-movie.component.html',
  styleUrls: ['./admin-add-movie.component.css']
})

export class AdminAddMovieComponent implements OnInit {

  constructor(public helper: HelperService, public router:Router,public backendHelper: BackendService) { }
theaterNames: any;
@ViewChild('addMovieFormRef') addMovieFormRef!: NgForm;

theaterId = null
  ngOnInit(): void {
    this.backendHelper.getAllTheaterNames().then(data=>{
this.theaterNames = data
    })
  }
  submitFlag =0

  onAddMovie()
  {
    if(!this.helper.addMovieForm.invalid)
    {
      this.backendHelper.addMovies(this.helper.addMovieForm.value)
      this.addMovieFormRef.resetForm()
      this.helper.notifySuccess("Movie Added Succesfully","")
     
    }
    else
    {
      console.log("No")
    }
  }

  onTheaternameChange(data : any)
  {
    console.log(data)
    this.helper.addMovieForm.get('theaterId')?.setValue(data[0])
    this.helper.addMovieForm.get('theaterCity')?.setValue(data[2])
  }
}

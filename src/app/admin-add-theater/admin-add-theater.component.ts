import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-admin-add-theater',
  templateUrl: './admin-add-theater.component.html',
  styleUrls: ['./admin-add-theater.component.css']
})
export class AdminAddTheaterComponent implements OnInit, AfterViewInit {

  constructor(public helper: HelperService, public router:Router,public backendHelper: BackendService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.updateTheater()
  }
  
  submitFlag =0 
  cities = ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"];
  displayedColumns: string[] = [ 'Name', 'City', 'Description'];
  @ViewChild('addTheaterFormRef') addTheaterFormRef!: NgForm;
  selectedStates = this.cities; 
  data : any


  onAddTheater()
  {
    if(!this.helper.addTheaterForm.invalid)
    {
      this.backendHelper.addTheater(this.helper.addTheaterForm.value)
      this.addTheaterFormRef.resetForm()
      this.helper.notifySuccess("Theater Added","")
      this.updateTheater()
    }
  }

updateTheater()
{
this.backendHelper.getTheater().then(data=>{
  this.data = data
})
}




}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './helper.service';
import { constants } from 'src/assets/constants';
import { AuthService } from './auth.service';
import * as uuid from 'uuid';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http:HttpClient,
    private authService: AuthService,
    private Firebase: AngularFireDatabase
  ) { }

  dbRef = this.Firebase.database.ref(); 
  theaterList: any
  onlyTheaterNameList : any
  allMoviesList: any
  addTheater(data: any)
  {
    const uniqueID = uuid.v4();
    data['theaterId'] = uniqueID
    this.Firebase.list('theaters').push(data)
  }

  getTheater(): Promise<any>
  {
    return new Promise(resolve=>{
    this.dbRef.child('theaters').once("value", snapshot=>{
      if(snapshot.exists())
      {
        this.theaterList =(Object as any).values(snapshot.val()).reverse();
        console.log(JSON.parse(JSON.stringify(this.theaterList)))
        resolve(this.theaterList)
      }
    });

  })
  }

  getAllTheaterNames(): Promise<any>
  {
    return new Promise(resolve=>{
      this.dbRef.child('theaters').once("value", snapshot=>{
        if(snapshot.exists())
        {
          const keys = ["theaterId", "name", "city"];
          this.theaterList =(Object as any).values(snapshot.val()).reverse();
          this.onlyTheaterNameList = this.theaterList.map((d: { [x: string]: any; }) => keys.map((k) => d[k]))
          console.log(this.onlyTheaterNameList)
          resolve(this.onlyTheaterNameList)
        }
      });
  
    })
  }
  
  addMovies(data: any)
  {
    const uniqueID = uuid.v4();
    data['movieId'] = uniqueID
    this.Firebase.list('movies').push(data)
    console.log("Movie added")
  }

  getAllMovieList(): Promise<any>
  {
    return new Promise(resolve=>{ 

      this.dbRef.child('movies').once("value", snapshot=>{
        if(snapshot.exists())
        {
          this.allMoviesList =(Object as any).values(snapshot.val()).reverse();
          console.log(JSON.parse(JSON.stringify(this.allMoviesList)))
          resolve(this.allMoviesList)
        }
      });
    })
  }
}

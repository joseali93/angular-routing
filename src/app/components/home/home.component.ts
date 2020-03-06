import { ConsultService } from './../../services/consult.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  doctors;
  model
  constructor(private homeservice:ConsultService) { }

  ngOnInit() {
    this.getDoctors()
  }
  getDoctors(){
    // this.homeservice.getDoctors()
    // .subscribe(res => (this.doctors = res));
    this.homeservice.getDoctors()
    .subscribe(data => {
      this.doctors = data.map(e => {
          return {
            // id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            cost: e.payload.doc.data()['cost'],
            last: e.payload.doc.data()['last'],
          };
        })
        console.log(this.doctors);
      })      
    }
  

}

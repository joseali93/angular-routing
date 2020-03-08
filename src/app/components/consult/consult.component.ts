import { Component, OnInit, ViewChildren, QueryList, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { ConsultService } from 'src/app/services/consult.service';
import { filter } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css'],
  providers: [DecimalPipe]

})
export class ConsultComponent implements OnInit {

  filter = new FormControl('');
  doctors;
  displayedColumns: string[] = ['name', 'last', 'cost'];
  doctorsOri=[]
  dataSource = new MatTableDataSource();

  constructor(pipe: DecimalPipe,
    private homeservice: ConsultService) {
      this.dataSource = new MatTableDataSource(this.doctors);


  }

  ngOnInit(): void {
    this.getDoctors();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  getDoctors() {
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
            horario: e.payload.doc.data()['horario'],
            dias: e.payload.doc.data()['dias'],

          } as any;
        })
      this.dataSource = new MatTableDataSource(this.doctors);

        console.log('doctors',this.doctors);
        
      })
  }
  applyFilter(event: Event) {
    console.log(this.filter.value);
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filter.value.trim().toLowerCase();
  }
}

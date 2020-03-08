import { ConsultService } from './../../services/consult.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  doctors;
  model
  categories
  checkForm;
  selectedItems;
  selectedItems2;
  days = ['domingo','lunes','martes','miercoles','jueves','viernes', 'sabado']
  settings = {
    singleSelection: true,
    text: "Seleccione especialidad",
    selectAllText: ' All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "",
    searchBy	:['name'],
    labelKey:'name',
    primaryKey:'id'
  };
  settings2  = {
    singleSelection: true,
    text: "Seleccione doctor",
    selectAllText: ' All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "",
    searchBy	:['name'],
    labelKey:'name',
    primaryKey:'id'
  };
  constructor(private homeservice: ConsultService,
    public formBuilder: FormBuilder, ) {
    this.checkForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      doctor: ['', Validators.required],
      dia: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.getDoctors();
    this.getCategories();
  }
  getCategories() {
    this.homeservice.getCategories()
      .subscribe(data => {

        this.categories = data.map(e => {
          
          return {
            id: e.payload.doc.data()['id'],
            name: e.payload.doc.data()['name'],
          };
        })
      })
  }
  onItemSelect(item) {
    console.log('selecciono uno', item);
    this.homeservice.getEspecificDoctorbyCategory(item.id)
    .then((data:any )=> {
      console.log('data',data);
      this.doctors=data

    })
  }
  onDeSelectAll(item){
    console.log('quito seleccion',item);
    console.log(item.length);
    this.selectedItems=undefined
    
  }
  onItemSelect2(item) {
    console.log('selecciono uno part 2', item);
  
  }
  onDeSelectAll2(item){
    console.log('quito seleccion par 2',item);
    this.selectedItems2=undefined
    
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

          };
        })
      })
  }
  onSubmit() {
    if(this.checkForm.status ==='VALID'){
      var objFinal = {
        categoria:this.checkForm.value.categoria[0].name,
        doctor:this.checkForm.value.doctor[0].name + ' ' +this.checkForm.value.doctor[0].last,
        cost:this.checkForm.value.doctor[0].cost,
        dia:this.checkForm.value.dia,
        horario:this.checkForm.value.horario
      }
      this.homeservice.setCita(objFinal)
    }

  }

}

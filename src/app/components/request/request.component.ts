import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConsultService } from 'src/app/services/consult.service';
import { ToastrService } from 'ngx-toastr';
// configure pdf settings
import * as pdfMakeConfig from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMakeConfig.vfs = pdfFonts.pdfMake.vfs;

// import core lib
import * as pdfMake from 'pdfmake/build/pdfmake';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestForm;
  categories;
  selectedItems
  doctors
  settings2 = {
    singleSelection: true,
    text: "Seleccione la categoria",
    selectAllText: ' All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "",
    // searchBy	:['name'],
    labelKey: 'name',
    primaryKey: 'name'
  };
  constructor(
    public formBuilder: FormBuilder,
    private homeservice: ConsultService,
    private toastr: ToastrService
  ) {
    this.requestForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      DNI: ['', Validators.required],
      direccion: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getCategories()
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
  onSubmit() {
    console.log(this.requestForm);

    if (this.requestForm.status === 'VALID') {
      // var objFinal = {
      //   categoria:this.checkForm.value.categoria[0].name,
      //   doctor:this.checkForm.value.doctor[0].name + ' ' +this.checkForm.value.doctor[0].last,
      //   cost:this.checkForm.value.doctor[0].cost,
      //   dia:this.checkForm.value.dia,
      //   horario:this.checkForm.value.horario
      // }
      // this.homeservice.setCita(objFinal)
    }

  }
  onItemSelect2(event) {
    console.log('event,', event);
    console.log('selecciono uno', event);
    this.homeservice.getEspecificDoctorbyCategory(event.id)
      .then((data: any) => {
        console.log('data', data);
        this.doctors = data
        if(this.requestForm.status==='VALID'){
          var x = Math.floor((Math.random() * this.doctors.length));
          console.log(x);
          this.generatePdf(x)
          this.toastr.success(`el nombre del medico asignado es el siguiente : ${this.doctors[x].name}  ${this.doctors[x].last}`, 'Medico asignado');
          this.setInformation(this.doctors[x])
        } else {
          this.toastr.warning('completa la informacion')
        }
  
      })
  }
  setInformation(doctor){
    var obj ={
      user: this.requestForm.value,
      doctor:doctor
    }
    this.homeservice.setDomicilio(obj)

  }
  generatePdf(index) {

    const documentDefinition = {
      content: [
        'Este documento es generado automaticamente, como constancia de solicitud de medico a domicilio'+
        `La persona ${this.requestForm.value.nombre} ${this.requestForm.value.apellido} identificado con el DNI ${this.requestForm.value.DNI}`+
        `a la direccion ${this.requestForm.value.direccion} , el medico asignado es ${this.doctors[index].name} ${this.doctors[index].last}`,
      ]
    };
    pdfMake.createPdf(documentDefinition).download('solicitud.pdf');
  }

onDeSelectAll2(event){
  console.log('event,', event);

}
}

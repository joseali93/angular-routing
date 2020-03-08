import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConsultService } from 'src/app/services/consult.service';
// configure pdf settings
import * as pdfMakeConfig from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMakeConfig.vfs = pdfFonts.pdfMake.vfs;

// import core lib
import * as pdfMake from 'pdfmake/build/pdfmake';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quoteForm;
  showCotizacion:boolean=false
  selectedItems;
  settings2  = {
    singleSelection: true,
    text: "Seleccione categoria",
    selectAllText: ' All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "",
    // searchBy	:['name'],
    labelKey:'name',
    primaryKey:'name'
  };
  doctors
  constructor(
    public formBuilder: FormBuilder,
    private homeservice: ConsultService,
    private toastr: ToastrService

  ) {
    this.quoteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      DNI: ['', Validators.required],
      doctor: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.getDoctors()
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
        console.log(this.doctors);
        
      })
  }
  onItemSelect2(event){
    console.log('event,',event);
    
  }
  onDeSelectAll2(event){
    console.log('event,',event);
    
  }
  onSubmit() {
    console.log(this.quoteForm);
    
    if(this.quoteForm.status ==='VALID'){
      this.showCotizacion=true

      // var objFinal = {
      //   categoria:this.checkForm.value.categoria[0].name,
      //   doctor:this.checkForm.value.doctor[0].name + ' ' +this.checkForm.value.doctor[0].last,
      //   cost:this.checkForm.value.doctor[0].cost,
      //   dia:this.checkForm.value.dia,
      //   horario:this.checkForm.value.horario
      // }
      // this.homeservice.setCita(objFinal)
    }else{
      this.toastr.warning('completa la informacion')

    }

  }
  generatePdf(){
    console.log('entro');
    
    const documentDefinition = { 
      content: [
        'Esta cotización tiene validez de 3 horas ',
        {
        table: {
            body: [
                ['NOMBRE PACIENTE', 'APELLIDO PACIENTE', 'DNI','NOMRE DOCTOR', 'VALOR DE CONSULTA'],
                [this.quoteForm.value.nombre, this.quoteForm.value.apellido,this.quoteForm.value.DNI, this.quoteForm.value.doctor[0].name + ' '+this.quoteForm.value.doctor[0].last, this.quoteForm.value.doctor[0].cost]
            ]
        }
    }]
     };
    pdfMake.createPdf(documentDefinition).download('cotizacion.pdf');
   }
}

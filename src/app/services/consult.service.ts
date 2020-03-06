import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscribable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  constructor(   private firestore: AngularFirestore   ) {}

  getDoctors()  { 
    return this.firestore.collection("doctors").snapshotChanges();
  }
  setAppointment(data){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("appointment")
          .add(data)
          .then(res => {}, err => reject(err));
  });
  }
}

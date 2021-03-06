import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscribable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  constructor(private firestore: AngularFirestore) { }

  getDoctors() {
    return this.firestore.collection("doctors").snapshotChanges();


  }
  getDoctors2() {
    // return this.firestore.collection("doctors").snapshotChanges();
    var obj = []
    var reference = this.firestore.collection("doctors").ref;
    return reference.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return obj

        }
        snapshot.forEach(doc => {
          obj.push(doc.data())
          // console.log(doc.id, '=>', doc.data());
        });
        console.log('obj', obj)
        return obj

      })
      .catch(err => {
        console.log('Error getting documents', err);
      });;

  }
  getCategories() {
    return this.firestore.collection("categories").snapshotChanges();
  }
  getEspecificDoctorbyCategory(idcategory) {
    var obj = []
    var reference = this.firestore.collection("doctors").ref;
    return reference.where("category", "==", idcategory).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return obj

        }
        snapshot.forEach(doc => {
          obj.push(doc.data())
          // console.log(doc.id, '=>', doc.data());
        });
        console.log('obj', obj)
        return obj

      })
      .catch(err => {
        console.log('Error getting documents', err);
      });;

  }
  setCita(data,collecion='citas') {
    return this.firestore.collection("citas").add(data)
      .then(function (docRef) {
        return console.log("Document successfully written!",docRef);
      })
      .catch(function (error) {
        return console.error("Error writing document: ", error);
      });
  }
  setDomicilio(data) {
    return this.firestore.collection("domicilio").add(data)
      .then(function (docRef) {
        return console.log("Document successfully written!",docRef);
      })
      .catch(function (error) {
        return console.error("Error writing document: ", error);
      });
  }
  setCotizacion(data) {
    return this.firestore.collection("cotizacion").add(data)
      .then(function (docRef) {
        return console.log("Document successfully written!",docRef);
      })
      .catch(function (error) {
        return console.error("Error writing document: ", error);
      });
  }
}

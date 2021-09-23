import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private afs: AngularFirestore) { }

  updateContact(user:string, contact: any) {
    let owner_enterprise_email: string ='error@gmail.com';
    if (user!= '') {
      owner_enterprise_email=user;
    }
    return this.afs.doc('/contacts/' + contact.email)                        // on a successful signup, create a document in 'users' collection with the new user's info
      .set({
      
        name: contact.name,
        phone_number: contact.phone_number,
        cellphone_number: contact.cellphone_number,
        email: contact.email,
       
      })
  }

  /* getContact(email:string){
    var getOptions:any ={ email: email}
    let res : any;
    res = this.afs.doc('/contacts/' + email).valueChanges();
    console.log(res)
    console.log('khe');
    console.log(res.data())
    return res
  } */
}

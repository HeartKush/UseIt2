import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private afs: AngularFirestore) {


  }



  updateEnterprise(user:string, enterprise: any) {
    let owner_user_email: string ='error@gmail.com';
    let comercial_name: string = '';
    let website: string = '';
    let rol: string = 'Propietario';
    let owner_enterprise_email: string ='';
    if (user!= '') {
      owner_user_email=user;
    }
    return this.afs.doc('/enterprises/' + enterprise.nit)                        // on a successful signup, create a document in 'users' collection with the new user's info
      .set({
        nit: enterprise.nit,
        rol:rol,
        owner_user_email: owner_user_email,
        name: enterprise.name,
        comercial_name: comercial_name,
        address: enterprise.address,
        phone_number: enterprise.phone_number,
        email: enterprise.email,
        website: enterprise.website,
        country: enterprise.country,
        state: enterprise.state,
        city: enterprise.city,
        owner_id: owner_enterprise_email
      })
  }

  getEnterprise(nit:string){
    var getOptions:any ={ nit: nit}
    let res : any;
    res = this.afs.doc('/enterprises/' + nit).valueChanges();
    console.log(res)
    console.log('khe');
    console.log(res.data())
    return res
  }

}

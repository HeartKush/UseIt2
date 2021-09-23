import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../services/model/enterprise.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ContactService } from '../services/model/contact.service';

@Component({
  selector: 'app-contacs',
  templateUrl: './contacs.component.html',
  styleUrls: ['./contacs.component.scss']
})
export class ContacsComponent implements OnInit {
  users:any[]=[];
  contactsForm: FormGroup | any;

  constructor(private contactService: ContactService, private modalService: NgbModal, private router: Router, private firestoreModule: AngularFirestore, private afAuth: AngularFireAuth) { }


  ngOnInit(): void {
    this.contactsForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone_number': new FormControl('',Validators.required),
      'cellphone_number': new FormControl('', Validators.required),
    });
    this.afAuth.currentUser.then(_=>{
      console.log(_?.email);
      this.obtenerUsuarios(_?.email);
    });
  }
 /*  ngOnDestroy(): void {
    
    this.afAuth.currentUser.then(_=>{
      this.obtenerUsuarios(_?.email).unsubscribe();
    });
  } */


  obtenerUsuarios(userEmail:any){
    
    return this.firestoreModule.collection('users', ref => ref.where('email', '!=', userEmail)).snapshotChanges().subscribe(query =>{
     this.users=[];  
     query.forEach(user =>{
         console.log(user.payload.doc.data());
         this.users.push(user.payload.doc.data());
       })
     })
  
  
 }

 crearContacto() {
  if (this.contactsForm.invalid){
    console.log('invalid')
    return;
  }
  const auth = getAuth();
  let user: any = auth.currentUser;
  let user_email: string = '';
  if (user !== null) {
    user.providerData.forEach((profile: any) => {
      user_email = profile.email;
    });
  }
  let dos = this;
  this.contactService.updateContact(user = user_email, this.contactsForm.value).then(function (result: any) {
    if (result == null)
      dos.router.navigate(['/contactos']);
    else if (result.isValid == false)
      console.log('error')
  }).catch(() => {

  });
}
 open(content:any) {
  let dos = this;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
    if(result == 'Save click' ){
      console.log('si');
      dos.crearContacto();
    }
    console.log(`Closed with: ${result}`);
  }, (reason) => {
    console.log(`Dismissed ${this.getDismissReason(reason)}`)
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
}

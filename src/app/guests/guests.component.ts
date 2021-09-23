import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../services/model/enterprise.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit, OnDestroy {

  constructor(private enterpriseService: EnterpriseService, private modalService: NgbModal, private router: Router, private firestoreModule: AngularFirestore, private afAuth: AngularFireAuth) { }

  
  users:any[]=[];

  ngOnInit(): void {
    this.afAuth.currentUser.then(_=>{
      this.obtenerUsuarios(_?.email);
    });
  }
  ngOnDestroy(): void {
    
    this.afAuth.currentUser.then(_=>{
      this.obtenerUsuarios(_?.email).unsubscribe();
    });
  }


  obtenerUsuarios(userEmail:any){
    
    return this.firestoreModule.collection('users', ref => ref.where('email', '!=', userEmail)).snapshotChanges().subscribe(query=>{
     this.users=[];  
     query.forEach(user =>{
         console.log(user.payload.doc.data());
         this.users.push(user.payload.doc.data());
       })
     })
   
  
 }

 open(content:any) {
  let dos = this;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
}

}

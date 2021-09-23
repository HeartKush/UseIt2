import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../services/model/enterprise.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Country, State, City }  from 'country-state-city';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  enterprisesForm: FormGroup | any;
  ownerEnterprise: any;
  has_enterprise: boolean = false;
  guestEnterprises: any[]=[];
  userName: any;
  emailUser: any;
  users:any[]=[];

  constructor(private enterpriseService: EnterpriseService, private modalService: NgbModal, private router: Router, private firestoreModule: AngularFirestore, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    console.log(Country.getAllCountries());
    console.log(State.getAllStates());
    this.enterprisesForm = new FormGroup({
      'nit': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'comercial_name': new FormControl(''),
      'address': new FormControl('', Validators.required),
      'phone_number': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'website': new FormControl(''),
      'country': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required)
    });

    
    this.afAuth.currentUser.then(_=>{
      this.obtenerEmpresa(_?.email)
      this.obtenerUsuarios(_?.email);
    });
    
  }

  ngOnDestroy(): void {
    
    this.afAuth.currentUser.then(_=>{
      this.obtenerUsuarios(_?.email).unsubscribe();
    });
  }
  obtenerEmpresa(mail:any){
    return this.firestoreModule.collection('enterprises', ref => ref.where('owner_user_email', '==', mail)).snapshotChanges().subscribe(query=>{
      this.users=[];  
      if(query.length > 0) {
        console.log(query[0].payload.doc.data());
        this.ownerEnterprise = query[0].payload.doc.data();
        this.has_enterprise = true;
        this.enterprisesForm = new FormGroup({
          'nit': new FormControl(this.ownerEnterprise.nit, Validators.required),
          'name': new FormControl(this.ownerEnterprise.name, Validators.required),
          'comercial_name': new FormControl(this.ownerEnterprise.comercial_name),
          'address': new FormControl(this.ownerEnterprise.address, Validators.required),
          'phone_number': new FormControl(this.ownerEnterprise.phone_number, Validators.required),
          'email': new FormControl(this.ownerEnterprise.email, [Validators.required, Validators.email]),
          'website': new FormControl(this.ownerEnterprise.website),
          'country': new FormControl(this.ownerEnterprise.country, Validators.required),
          'state': new FormControl(this.ownerEnterprise.state, Validators.required),
          'city': new FormControl(this.ownerEnterprise.city, Validators.required)
        });
      }else {
        console.log('Ups! parece que aun no has creado una empresa');
      }
    });
  }
  obtenerUsuarios(userEmail:any){
     return this.firestoreModule.collection('users', ref => ref.where('email', '!=', userEmail)).snapshotChanges().subscribe(query=>{
      this.users=[];  
      query.forEach(user =>{
          this.users.push(user.payload.doc.data());
        })
      })
  }

  crearEmpresa() {
    if (this.enterprisesForm.invalid){
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
    this.enterpriseService.updateEnterprise(user = user_email, this.enterprisesForm.value).then(function (result: any) {
      if (result == null)
        dos.router.navigate(['/dashboard']);
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
        dos.crearEmpresa();
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

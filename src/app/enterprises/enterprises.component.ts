import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../services/model/enterprise.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Country, State, City }  from 'country-state-city';
interface Enterprise{ 
  nit: string,
  rol: string,
  owner_user_email: string,
  name: string
  comercial_name: string,
  address: string,
  phone_number: string,
  email: string,
  website: string,
  country: string,
  state: string,
  city: string,
  owner_id: string
}


@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {
  enterprisesForm: FormGroup | any;
  enterprise : any = '';
  countries : any[] = [];
  selected_country_code:string = '';
  states : any[] = [];
  cities : any[] = [];
  
  constructor(private enterpriseService: EnterpriseService, private modalService: NgbModal, private router: Router, private firestoreModule: AngularFirestore, private afAuth: AngularFireAuth) { }


  ngOnInit(): void {
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


  }
  testEnterprise(){
    let dos : any;
    dos = this.enterpriseService.getEnterprise('21121');
    
    console.log(dos)
  }
  crearEmpresa() {
    if (this.enterprisesForm.invalid)
      return;
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

  getStates(country:any){
    console.log(country)
    this.selected_country_code = country;
    this.states = State.getStatesOfCountry(country);

    console.log(this.states)
  }
  getCities(state:any){
    console.log(state);
    this.cities = City.getCitiesOfState(this.selected_country_code, state);
    console.log(this.cities);
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

import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../services/model/enterprise.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  enterprisesForm: FormGroup | any;
  constructor(private enterpriseService: EnterpriseService, private modalService: NgbModal, private router: Router) { }

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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnterpriseService } from '../services/model/enterprise.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from "firebase/auth";



@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {
  enterprisesForm: FormGroup | any;

  constructor(private enterpriseService: EnterpriseService, private router: Router, private afAuth: AngularFireAuth) { }

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

}

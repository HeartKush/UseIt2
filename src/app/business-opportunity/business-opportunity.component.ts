import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../services/model/enterprise.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAuth } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-business-opportunity',
  templateUrl: './business-opportunity.component.html',
  styleUrls: ['./business-opportunity.component.scss']
})
export class BusinessOpportunityComponent implements OnInit {

  constructor(private enterpriseService: EnterpriseService, private modalService: NgbModal, private router: Router, private firestoreModule: AngularFirestore, private afAuth: AngularFireAuth) { }


  ngOnInit(): void {
  }

  open(content:any) {
    let dos = this;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}

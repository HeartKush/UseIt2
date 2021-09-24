import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  item_selected:string = 'dashboard';
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {

    var items = document.querySelectorAll('.flex-column li a');
    items.forEach((item)=>{
        if ( item.getAttribute('data-current-item') == document.URL.replace('http://localhost:4200/','')){
            item.classList.add("active2");
            item.classList.remove("link-dark");        
        }else{
          item.classList.remove("active2");
          item.classList.add("link-dark"); 
        }
    });

  }

  logout(): void {
    this.afAuth.signOut();
}

}

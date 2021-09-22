import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
    BrowserAnimationsModule,
    RouterModule,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }


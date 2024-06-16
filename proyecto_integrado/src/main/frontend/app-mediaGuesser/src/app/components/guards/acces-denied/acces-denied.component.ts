import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "../../login/login.component";

@Component({
  selector: 'app-acces-denied',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './acces-denied.component.html',
  styleUrl: './acces-denied.component.css'
})
export class AccesDeniedComponent {

  constructor(private modalSrv: NgbModal) {
  }
  login(){
    this.modalSrv.dismissAll()
    this.modalSrv.open(LoginComponent,{
      centered:true,
      size: 'md'
    })
  }
}

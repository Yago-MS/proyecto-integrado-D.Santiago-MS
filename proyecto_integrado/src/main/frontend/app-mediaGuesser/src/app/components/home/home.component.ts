import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MediaTypeInterface} from "../../interfaces/mediaType.interface";
import {MediaTypeService} from "../../../utils/services/mediaType.service";
import {Router} from "@angular/router";
import {Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilterOptionsComponent} from "./filter-options/filter-options.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private modalSrv: NgbModal) {
  }
  showConfigModal(){
    this.modalSrv.open(FilterOptionsComponent, {
      centered: true,
      size: 'lg'
    })
  }

}

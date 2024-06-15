import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MediaTypeInterface} from "../../interfaces/mediaType.interface";
import {MediaTypeService} from "../../../utils/services/mediaType.service";
import {Router} from "@angular/router";
import {Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilterOptionsComponent} from "./filter-options/filter-options.component";
import {MediaInterface} from "../../interfaces/media.interface";
import {MediaService} from "../../../utils/services/media.service";
import {ConfigService} from "../../../utils/services/config.service";
import {TimeInterval} from "rxjs";

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
export class HomeComponent implements OnInit, OnDestroy {

  medias: MediaInterface[] = []
  apiUrl: string;
  imageUrl: string | undefined
  intervalId: any
  mediaCount: number = 0

  constructor(
    private modalSrv: NgbModal,
    private mediaService: MediaService,
    private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl()
  }

  ngOnInit() {
    this.mediaService.getAllMedia().subscribe(medias => {
      this.medias = medias
      if(medias.length)
      this.imageUrl = this.apiUrl + 'media/' + this.medias[this.mediaCount].imageUrl
      this.intervalId = setInterval(() => {
        this.mediaCount++
        if(this.mediaCount >= this.medias.length) this.mediaCount = 0
        this.imageUrl = this.apiUrl + 'media/' + this.medias[Math.floor(Math.random() * this.medias?.length)].imageUrl
      }, 2000)
    })
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showConfigModal() {
    this.modalSrv.open(FilterOptionsComponent, {
      centered: true,
      size: 'lg'
    })
  }

}

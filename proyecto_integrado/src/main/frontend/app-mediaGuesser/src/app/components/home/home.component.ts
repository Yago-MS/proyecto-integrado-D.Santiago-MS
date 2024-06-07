import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MediaTypeInterface} from "../../interfaces/mediaType.interface";
import {MediaTypeService} from "../../../utils/services/mediaType.service";
import {Router} from "@angular/router";
import {Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

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
export class HomeComponent implements OnInit{

  mediaTypes : MediaTypeInterface[] | undefined
  selectedMediaType: number[] | undefined;
  selectedDate: string = '';
  mode: FormGroup;


  constructor(
    private mediaTypeService:MediaTypeService,
    private router: Router,
  private formBuilder: FormBuilder) {
    this.mode = this.formBuilder.group({
      modeSelect: ['1']
    });
  }

  ngOnInit() {
    this.mediaTypeService.getAllMediaTypes().subscribe(mediaTypes =>
      this.mediaTypes = mediaTypes
    )
  }

  startGame() {
    const queryParams: any = {};
    if (this.selectedMediaType) {
      queryParams.mode = this.selectedMediaType;
    } else {
      queryParams.mode = this.mediaTypes?.map(mediaType => mediaType.id)
    }
    switch (this.mode.value.modeSelect){
      case '1':
        queryParams.selectedDate = 0
        break
      case '2':
        queryParams.selectedDate = 2000
        break
      case '3':
        queryParams.selectedDate = 2010
        break
      default:
        queryParams.selectedDate = 0
        break
    }
    this.router.navigate(['/game'], { queryParams });
  }


}

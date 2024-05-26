import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MediaTypeInterface} from "../../interfaces/mediaType.interface";
import {MediaTypeService} from "../../../utils/services/mediaType.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  mediaTypes : MediaTypeInterface[] | undefined
  selectedMediaType: number[] | undefined;
  selectedDate: string = '';


  constructor(
    private mediaTypeService:MediaTypeService,
    private router: Router) {

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
    if (this.selectedDate) {
      queryParams.date = this.selectedDate;
    } else {
      queryParams.date = 0
    }
    this.router.navigate(['/game'], { queryParams });
  }


}

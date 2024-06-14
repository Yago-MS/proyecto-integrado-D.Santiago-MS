import {Component, OnInit} from '@angular/core';
import {MediaTypeInterface} from "../../../interfaces/mediaType.interface";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MediaTypeService} from "../../../../utils/services/mediaType.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-filter-options',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.css'
})
export class FilterOptionsComponent implements OnInit{

  mediaTypes: MediaTypeInterface[] | undefined
  selectedMediaType: number[] | undefined;
  mode: FormGroup;
  useHints: boolean = false


  constructor(
    private mediaTypeService: MediaTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalSrv: NgbModal) {
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
    switch (this.mode.value.modeSelect) {
      case '1':
        queryParams.startYear = 0
        break
      case '2':
        queryParams.startYear = 2000
        break
      case '3':
        queryParams.startYear = 2010
        break
      default:
        queryParams.startYear = 0
        break
    }
    this.modalSrv.dismissAll()
    this.router.navigate(['/game'], {queryParams});
  }
}

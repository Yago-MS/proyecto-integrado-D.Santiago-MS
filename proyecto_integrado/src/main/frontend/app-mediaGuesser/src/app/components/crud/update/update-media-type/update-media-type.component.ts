import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MediaTypeInterface} from "../../../../interfaces/mediaType.interface";
import {MediaInterface} from "../../../../interfaces/media.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaService} from "../../../../../utils/services/media.service";
import {MediaTypeService} from "../../../../../utils/services/mediaType.service";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-media-type',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-media-type.component.html',
  styleUrl: './update-media-type.component.css'
})
export class UpdateMediaTypeComponent implements OnInit {

  mediaTypeId: number | undefined
  mediaTypeForm: FormGroup | undefined
  mediaType: MediaTypeInterface | undefined

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mediaTypeService: MediaTypeService,
    private router: Router,
    private toastService: ToastrService) {
  }

  ngOnInit() {

    //set media id
    this.route.params.subscribe(params => {
      this.mediaTypeId = params['id']
    })

    //form values
    if (this.mediaTypeId)
      this.mediaTypeService.getMediaTypeByID(this.mediaTypeId).subscribe(mediaType => {
          this.mediaType = mediaType
          this.mediaTypeForm = this.formBuilder.group({
            name: mediaType.name,
          })
        }
      )

  }

  onSubmit() {

    const update = this.mediaTypeForm?.value

    if (this.mediaTypeId)
      this.mediaTypeService.updateMediaType(this.mediaTypeId, {
        id: this.mediaTypeId,
        ...update
      }).subscribe(
        {
          next: () => {
            this.toastService.success("Tipo editado correctamente")
            this.router.navigate(['/panel'])
          },
          error: (e) => {
            this.toastService.error(e.error)
          }
        }
      )
  }

  onDelete() {
    if (this.mediaTypeId)
      this.mediaTypeService.deleteMediaType(this.mediaTypeId).subscribe({
        next: () => {
          this.toastService.success("Tipo borrado correctamente")
          this.router.navigate(["/panel"])
        },
        error: (e)=>{
          this.toastService.error(e.error)
        }
      })
  }
}

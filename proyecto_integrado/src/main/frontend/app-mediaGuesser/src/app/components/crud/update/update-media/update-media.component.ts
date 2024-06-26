import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MediaService} from "../../../../../utils/services/media.service";
import {MediaTypeService} from "../../../../../utils/services/mediaType.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaTypeInterface} from "../../../../interfaces/mediaType.interface";
import {NgForOf, NgIf} from "@angular/common";
import {MediaInterface} from "../../../../interfaces/media.interface";
import {ConfigService} from "../../../../../utils/services/config.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-media',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-media.component.html',
  styleUrl: './update-media.component.css'
})
export class UpdateMediaComponent implements OnInit {

  apiUrl : string;
  mediaTypes: MediaTypeInterface[] | undefined
  selectedFile: File | undefined
  mediaId: number | undefined
  mediaForm: FormGroup | undefined
  media: MediaInterface | undefined
  showImage: string | ArrayBuffer | null | undefined

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mediaService: MediaService,
    private mediaTypeService: MediaTypeService,
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
    private modalSrv: NgbModal,
    private toastService: ToastrService) {
    this.apiUrl = configService.getApiUrl()
  }

  ngOnInit() {
    //get media types
    this.mediaTypeService.getAllMediaTypes().subscribe(mediaTypes =>
      this.mediaTypes = mediaTypes)

    //set media id
    this.route.params.subscribe(params => {
      this.mediaId = params['id']
    })

    if(this.mediaId)
    this.mediaService.getMediaById(this.mediaId).subscribe(media =>
    this.media = media
    )

    //form values
    if (this.mediaId)
      this.mediaService.getMediaById(this.mediaId).subscribe(media => {
        this.mediaForm = this.formBuilder.group({
          name: media.name,
          releaseYear: media.releaseYear,
          typeId: media.typeId,
          image: ""
        })
      });

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader()
    reader.onload = (e) => {
      this.showImage = e?.target?.result
    }
    reader.readAsDataURL(event.target.files[0])
  }

  onSubmit() {
    const formFile = new FormData()
    if (this.selectedFile) {
      formFile.append('file', this.selectedFile)
      this.http.post<File>(this.apiUrl + 'api/uploadMedia', formFile).subscribe()
    }

    const update = this.mediaForm?.value

    console.log('update ==> ', update)
    console.log('formfile ==> ', formFile)

    if(this.mediaId)
    this.mediaService.editMediaById(this.mediaId, {
      id: this.media?.id,
      ...!this.selectedFile ? {imageUrl: this.media?.imageUrl} : {imageUrl: this.selectedFile.name.replaceAll(" ", "-")},
      ...update
    })
      .subscribe(
        {
          next: () => {
            this.toastService.success("Medio guardado correctamente")
            this.router.navigate(['/panel'])
          },
          error: (e)=>{
            this.toastService.error(e.error)
          }
        }
      )
  }

  onDelete(){
    if(this.mediaId){
      this.mediaService.deleteMediaById(this.mediaId).subscribe(
        {
          next:() => {
            this.toastService.success("Medio borrado correctamente")
            this.router.navigate(['/panel'])
          }
        }
      )
    }
  }
}

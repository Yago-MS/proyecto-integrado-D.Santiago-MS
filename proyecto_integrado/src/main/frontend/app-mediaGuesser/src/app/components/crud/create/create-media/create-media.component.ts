import {Component, OnInit} from '@angular/core';
import {MediaForm} from "../../../../../utils/form-builders";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MediaService} from "../../../../../utils/services/media.service";
import {HttpClient} from "@angular/common/http";
import {MediaTypeService} from "../../../../../utils/services/mediaType.service";
import {MediaTypeInterface} from "../../../../interfaces/mediaType.interface";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../../utils/services/config.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-media',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './create-media.component.html',
  styleUrl: './create-media.component.css'
})
export class CreateMediaComponent implements OnInit {


  apiUrl: string;
  mediaTypes: MediaTypeInterface[] | undefined;
  mediaForm = MediaForm(this.formBuilder)
  selectedFile: File | undefined

  constructor(
    private formBuilder: FormBuilder,
    private mediaService: MediaService,
    private mediaTypeService: MediaTypeService,
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
    private toastService: ToastrService) {
    this.apiUrl = configService.getApiUrl()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    console.log(this.mediaForm.value)
  }

  ngOnInit() {
    this.mediaTypeService.getAllMediaTypes().subscribe(mediaTypes =>
      this.mediaTypes = mediaTypes)
  }

  onSubmit() {
    this.mediaService.createMedia({
      ...this.mediaForm.value,
      imageUrl: this.selectedFile?.name.replaceAll(" ", "-")
    })
      .subscribe({
        next: () => {
          this.toastService.success("Medio creado correctamente")
          this.router.navigate(['/panel'])
        },
        error: (e) => {
          this.toastService.error(e.error)
        }
      })
    const formFile = new FormData()
    if (this.selectedFile)
      formFile.append('file', this.selectedFile, this.selectedFile.name.replaceAll(" ", "-"))
    this.http.post<File>( this.apiUrl + 'api/uploadMedia', formFile).subscribe()
  }
}

import {Component, OnInit} from '@angular/core';
import {MediaForm} from "../../../../../utils/form-builders";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MediaService} from "../../../../../utils/services/media.service";
import {HttpClient} from "@angular/common/http";
import {MediaTypeService} from "../../../../../utils/services/mediaType.service";
import {MediaTypeInterface} from "../../../../interfaces/mediaType.interface";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-media',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './create-media.component.html',
  styleUrl: './create-media.component.css'
})
export class CreateMediaComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private mediaService: MediaService,
    private mediaTypeService: MediaTypeService,
    private http: HttpClient,
    private router: Router) {
  }

  mediaTypes: MediaTypeInterface[] | undefined;
  mediaForm = MediaForm(this.formBuilder)
  selectedFile: File | undefined

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
      imageUrl: "http://192.168.121.205:8080/media/" + this.selectedFile?.name.replaceAll(" ", "-")
    })
      .subscribe(media =>
        console.log(media))
    const formFile = new FormData()
    if (this.selectedFile)
      formFile.append('file', this.selectedFile)
    this.http.post<File>('http://192.168.121.205:8080/api/uploadMedia', formFile).subscribe()
    this.router.navigate(['/panel'])
  }
}

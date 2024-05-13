import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MediaService} from "../../../../utils/services/media.service";
import {MediaTypeService} from "../../../../utils/services/mediaType.service";
import {UserService} from "../../../../utils/services/user.service";
import {UserTypeService} from "../../../../utils/services/userType.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [HttpClientModule]
})
export class CreateComponent implements OnInit{

  selectedFile: File | undefined;
  entityName: string | null = null
  form: FormGroup
  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private mediaTypeService: MediaTypeService,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private http: HttpClient,
    private formBuilder :FormBuilder,
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entityName = params['entity']

      console.log(this.entityName)
    })
    switch (this.entityName){
      case 'media':
        this.form.addControl('name', this.formBuilder.control('', Validators.required))
        this.form.addControl('releaseDate', this.formBuilder.control('', Validators.required))
        this.form.addControl('mediaType', this.formBuilder.control('', Validators.required))
        this.form.addControl('image', this.formBuilder.control('', Validators.required))
        return
      case 'mediaType':
        this.form.addControl('name', this.formBuilder.control('', Validators.required))
        break;
      case 'user':
        this.form.addControl('name', this.formBuilder.control('', Validators.required))
        this.form.addControl('credential', this.formBuilder.control('', Validators.required))
        this.form.addControl('userType', this.formBuilder.control('', Validators.required))
        this.form.addControl('profilePic', this.formBuilder.control('', Validators.required))
        break;
      case 'userType':
        this.form.addControl('name', this.formBuilder.control('', Validators.required))
    }
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
      const formData = new FormData();
      const formFile = new FormData()
      formData.append('media', this.form.value)
    if(this.selectedFile) {
      formFile.append('file', this.selectedFile)
    }
    this.mediaService.createMedia({"typeId": 1, "name" : "name", "releaseDate" : new Date(), "imageUrl": "./assets/medias/" + this.selectedFile?.name}).subscribe(media =>
      console.log(media)
    )
      this.http.post<File>('http://localhost:8080/api/upload', formFile).subscribe()
    }

}

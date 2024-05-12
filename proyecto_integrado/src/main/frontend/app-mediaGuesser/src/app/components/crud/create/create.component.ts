import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MediaService} from "../../../services/media.service";
import {MediaTypeService} from "../../../services/mediaType.service";
import {UserService} from "../../../services/user.service";
import {UserTypeService} from "../../../services/userType.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MediaInterface} from "../../../interfaces/media.interface";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [],
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
    })
    switch (this.entityName){
      case 'media':

    }
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>('http://localhost:8080/api/upload', formData)
    }
  }

}

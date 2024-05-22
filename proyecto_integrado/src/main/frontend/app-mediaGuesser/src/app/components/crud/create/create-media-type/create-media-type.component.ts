import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {HttpClient} from "@angular/common/http";
import {MediaTypeForm, UserTypeForm} from "../../../../../utils/form-builders";
import {MediaTypeService} from "../../../../../utils/services/mediaType.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-media-type',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-media-type.component.html',
  styleUrl: './create-media-type.component.css'
})
export class CreateMediaTypeComponent {
  constructor(
    private formBuilder: FormBuilder,
    private mediaTypeService: MediaTypeService,
    private router: Router) {
  }

  mediaTypeForm = MediaTypeForm(this.formBuilder)

  onSubmit() {
    this.mediaTypeService.createMediaType(this.mediaTypeForm.value)
      .subscribe(mediaType =>
        console.log(mediaType))
    this.router.navigate(['/panel'])
  }
}

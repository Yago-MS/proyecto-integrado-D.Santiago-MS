import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MediaTypeForm} from "../../../../../utils/form-builders";
import {MediaTypeService} from "../../../../../utils/services/mediaType.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
    private router: Router,
    private toastService: ToastrService) {
  }

  mediaTypeForm = MediaTypeForm(this.formBuilder)

  onSubmit() {
    this.mediaTypeService.createMediaType(this.mediaTypeForm.value)
      .subscribe({
        next: () => {
          this.toastService.success("Tipo editado correctamente")
          this.router.navigate(['/panel'])
        },
        error: (e) => {
          this.toastService.error(e.error)
        }
      })
  }
}

import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {HttpClient} from "@angular/common/http";
import {UserTypeForm} from "../../../../../utils/form-builders";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-user-type',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './create-user-type.component.html',
  styleUrl: './create-user-type.component.css'
})
export class CreateUserTypeComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userTypeService: UserTypeService,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastrService) {
  }

  userTypeFrom = UserTypeForm(this.formBuilder)

  onSubmit() {
    this.userTypeService.createUserType(this.userTypeFrom.value)
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

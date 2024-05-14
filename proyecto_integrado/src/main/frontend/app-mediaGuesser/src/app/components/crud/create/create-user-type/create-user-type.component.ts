import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {HttpClient} from "@angular/common/http";
import {UserTypeForm} from "../../../../../utils/form-builders";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user-type',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './create-user-type.component.html',
  styleUrl: './create-user-type.component.css'
})
export class CreateUserTypeComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userTypeService: UserTypeService,
    private http: HttpClient,
    private router: Router) {
  }

  userTypeFrom = UserTypeForm(this.formBuilder)

  onSubmit() {
    this.userTypeService.createUserType(this.userTypeFrom.value)
      .subscribe(userType =>
        console.log(userType))
    this.router.navigate(['/panel'])
  }
}

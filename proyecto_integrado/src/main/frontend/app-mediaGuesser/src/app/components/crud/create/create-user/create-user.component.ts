import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../../utils/services/user.service";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {UserTypeInterface} from "../../../../interfaces/userType.interface";
import {UserForm} from "../../../../../utils/form-builders";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-user',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastrService) {
  }

  userTypes: UserTypeInterface[] | undefined;
  userForm = UserForm(this.formBuilder)
  ngOnInit() {
    this.userTypeService.getAllUserTypes().subscribe(userTypes =>
      this.userTypes = userTypes)
  }

  onSubmit() {
    this.userService.createUser({
      maxScore: 0,
      ...this.userForm.value,
      imageUrl: "default.jpg"
    })
      .subscribe({
        next: () => {
          this.toastService.success("Usuario creado correctamente")
          this.router.navigate(['/panel'])
        },
        error: (e) => {
          this.toastService.error(e.error)
        }
      })
    const formFile = new FormData()}
}

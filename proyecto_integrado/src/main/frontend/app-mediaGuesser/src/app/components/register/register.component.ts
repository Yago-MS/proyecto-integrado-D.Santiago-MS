import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../utils/services/user.service";
import {UserTypeService} from "../../../utils/services/userType.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserTypeInterface} from "../../interfaces/userType.interface";
import {RegisterForm, UserForm} from "../../../utils/form-builders";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {catchError, throwError} from "rxjs";
import {Toast, ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    ToastrModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private router: Router,
    private toast: ToastrService) {
  }

  userForm = RegisterForm(this.formBuilder)
  userType: UserTypeInterface | undefined
  error : string | undefined

  ngOnInit() {
    this.userTypeService.getUserTypeByName("player").subscribe(userType =>
      this.userType = userType
    )
  }

  onSubmit() {
    this.userService.createUser({
        maxScore: 0,
        imageUrl: "default.jpg",
        typeId: this.userType?.id,
        ...this.userForm.value
      }).subscribe(
      {
        next: ()=>{
          this.toast.success('Usuario registrado correctamente!')
          this.router.navigate(['/login']).then(

          )
        },
        error: (error) => {
          alert(error.error)
        }
      }
    )
  }
}

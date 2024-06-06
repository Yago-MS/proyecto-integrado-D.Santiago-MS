import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../utils/services/user.service";
import {UserTypeService} from "../../../utils/services/userType.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserTypeInterface} from "../../interfaces/userType.interface";
import {RegisterForm, UserForm} from "../../../utils/form-builders";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private router: Router) {
  }

  userForm = RegisterForm(this.formBuilder)
  userType: UserTypeInterface | undefined

  ngOnInit() {
    this.userTypeService.getUserTypeByName("player").subscribe(userType =>
      this.userType = userType
    )
  }

  onSubmit() {
    this.userService.createUser({
      maxScore: 0,
      imageUrl: "http://192.168.0.95:8080/user/default.webp",
      typeId: this.userType?.id,
      ...this.userForm.value
    })
      .subscribe(user =>
        console.log(user))
    const formFile = new FormData()
    this.router.navigate(['/login'])
  }
}

import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../../utils/services/user.service";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {UserTypeInterface} from "../../../../interfaces/userType.interface";
import {UserForm} from "../../../../../utils/form-builders";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
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
    private router: Router) {
  }

  userTypes: UserTypeInterface[] | undefined;
  userForm = UserForm(this.formBuilder)
  selectedFile: File | undefined;

  ngOnInit() {
    this.userTypeService.getAllUserTypes().subscribe(userTypes =>
      this.userTypes = userTypes)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    console.log(this.userForm.value)
  }

  onSubmit() {
    this.userService.createUser({
      ...this.userForm.value,
      imageUrl: "http://localhost:8080/user/" + this.selectedFile?.name
    })
      .subscribe(user =>
        console.log(user))
    const formFile = new FormData()
    if (this.selectedFile)
      formFile.append('file', this.selectedFile)
    this.http.post<File>('http://localhost:8080/api/uploadProfile', formFile).subscribe()
    this.router.navigate(['/panel'])
  }
}

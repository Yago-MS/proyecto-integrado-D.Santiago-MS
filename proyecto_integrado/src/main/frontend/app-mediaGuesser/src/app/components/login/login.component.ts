import { Component } from '@angular/core';
import {LoginService} from "../../../utils/services/login.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginForm} from "../../../utils/form-builders";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {NgIf} from "@angular/common";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  loginForm = LoginForm(this.formBuilder);
  error: string | undefined;
  onSubmit() {
    this.loginService.login(this.loginForm.value).pipe(
      catchError(err => {
        this.error = err
        return throwError(err)
      })
    ).subscribe(response => {
      console.log(response)
      localStorage.setItem('user', JSON.stringify({
        image: response.imageUrl,
        type: response.typeId,
        name: response.name,
        maxScore: response.maxScore}))
      this.router.navigate(['/'])
      }
    )
  }

}

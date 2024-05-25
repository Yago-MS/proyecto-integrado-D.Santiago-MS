import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

const mediaFormFields = ['name', 'releaseDate', 'typeId', 'image']
const mediaTypeFormFields = ["name"]
const userFormFields = ['name', 'credential', 'typeId', 'image']
const userTypeFormFields = ['name']
const loginFormFields = ['name', "credential"]
const registerFormFields = ['name', "credential"]

export const MediaForm = (formBuilder: FormBuilder): FormGroup => {
  const form : {[key: string] : [string, (control: AbstractControl<any, any>) => ValidationErrors | null]}  = {}
  mediaFormFields.forEach(field => {
    form[field] = ['', Validators.required]
  });
  return formBuilder.group(form)
}

export const MediaTypeForm = (formBuilder: FormBuilder): FormGroup => {
  const form : {[key: string] : [string, (control: AbstractControl<any, any>) => ValidationErrors | null]}  = {}
  mediaTypeFormFields.forEach(field => {
    if(field === 'image'){
      form[field] = ['', Validators.nullValidator]
    } else {
      form[field] = ['', Validators.required]
    }
  });
  return formBuilder.group(form)
}

export const UserForm = (formBuilder: FormBuilder): FormGroup => {
  const form : {[key: string] : [string, (control: AbstractControl<any, any>) => ValidationErrors | null]}  = {}
  userFormFields.forEach(field => {
    if(field === 'image'){
      form[field] = ['', Validators.nullValidator]
    } else {
      form[field] = ['', Validators.required]
    }
  });
  return formBuilder.group(form)
}
export const UserTypeForm = (formBuilder: FormBuilder): FormGroup => {
  const form : {[key: string] : [string, (control: AbstractControl<any, any>) => ValidationErrors | null]}  = {}
  userTypeFormFields.forEach(field => {
    form[field] = ['', Validators.required]
  });
  return formBuilder.group(form)
}
export const LoginForm = (formBuilder: FormBuilder): FormGroup => {
  const form : {[key: string] : [string, (control: AbstractControl<any, any>) => ValidationErrors | null]}  = {}
  loginFormFields.forEach(field => {
    form[field] = ['', Validators.required]
  });
  return formBuilder.group(form)
}

export const RegisterForm = (formBuilder: FormBuilder): FormGroup => {
  const form : {[key: string] : [string, ((control: AbstractControl<any, any>) => ValidationErrors | null)[]]}  = {}
  registerFormFields.forEach(field => {
    form[field] = ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
  });
  return formBuilder.group(form)
}

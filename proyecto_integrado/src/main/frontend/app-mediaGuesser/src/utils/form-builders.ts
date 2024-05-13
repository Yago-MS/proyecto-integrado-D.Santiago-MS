import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export const MediaForm = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    name: ['', Validators.required],
    releaseDate: ['', Validators.required],
    mediaType: ['', Validators.required],
    image: ['', Validators.required]
  })
}

export const MediaTypeForm = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    name: ['', Validators.required],
  })
}


export const UserForm = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    name: ['', Validators.required],
    credential: ['', Validators.required],
    userType: ['', Validators.required],
    profilePic: ['', Validators.required],
  })
}

export const UserTypeForm = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    name: ['', Validators.required],
  })
}

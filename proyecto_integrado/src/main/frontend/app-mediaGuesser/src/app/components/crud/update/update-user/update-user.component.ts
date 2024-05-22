import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserInterface} from "../../../../interfaces/user.interface";
import {UserTypeInterface} from "../../../../interfaces/userType.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../../utils/services/user.service";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{


  userTypes: UserTypeInterface[] | undefined
  selectedFile: File | undefined
  userId: number | undefined
  userForm: FormGroup | undefined
  user: UserInterface | undefined

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    //get media types
    this.userTypeService.getAllUserTypes().subscribe(userTypes =>
      this.userTypes = userTypes)

    //set media id
    this.route.params.subscribe(params => {
      this.userId = params['id']
    })

    //form values
    if (this.userId)
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user
        this.userForm = this.formBuilder.group({
          name: user.name,
          credential: user.credential,
          typeId: user.typeId,
          image: user.imageUrl
        })
      });

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formFile = new FormData()
    if (this.selectedFile) {
      formFile.append('file', this.selectedFile)
      this.http.post<File>('http://localhost:8080/api/uploadProfile', formFile).subscribe()
    }
    this.router.navigate(['/panel'])

    const update = this.userForm?.value

    if(this.userId && this.user) {
      this.userService.updateUser(this.userId, {
        id: this.userId,
        maxScore: this.user?.maxScore,
        ...update.image ? {imageUrl: `http://localhost:8080/user/${this.selectedFile?.name}`} : {imageUrl: this.user.imageUrl},
        ...update
      })
        .subscribe(user =>
          console.log('user ==>', user))
    }
  }
}

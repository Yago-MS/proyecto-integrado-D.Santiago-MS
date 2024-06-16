import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserInterface} from "../../../../interfaces/user.interface";
import {UserTypeInterface} from "../../../../interfaces/userType.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../../utils/services/user.service";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {NgForOf, NgIf} from "@angular/common";
import {Toast, ToastrService} from "ngx-toastr";

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
  userId: number | undefined
  userForm: FormGroup | undefined
  user: UserInterface | undefined


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userTypeService: UserTypeService,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastrService) {
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
          image: undefined
        })
      });

  }

  onSubmit() {


    const update = this.userForm?.value

    if(this.userId && this.user) {
      this.userService.updateUser(this.userId, {
        id: this.userId,
        maxScore: this.user?.maxScore,
        ...update
      })
        .subscribe({
          next: () => {
            this.toastService.success("Usuario editado correctamente")
            this.router.navigate(['/panel'])
          },
          error: (e) => {
            this.toastService.error(e.error)
          }
        })
    }
  }
  onDelete(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(this.userId && this.userId != user.id) {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          this.toastService.success("Usuario borrado correctamente")
          this.router.navigate(['/panel'])

        },
        error: () => {
          this.toastService.error("Algo ha salido mal...")
        }
      })
    }else {
      this.toastService.error("¡No puedes borrarte a ti mismo!")
    }
  }
}

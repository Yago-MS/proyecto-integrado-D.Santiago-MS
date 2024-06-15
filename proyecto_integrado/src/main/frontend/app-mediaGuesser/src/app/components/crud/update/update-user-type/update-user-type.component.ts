import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MediaTypeInterface} from "../../../../interfaces/mediaType.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaTypeService} from "../../../../../utils/services/mediaType.service";
import {UserTypeService} from "../../../../../utils/services/userType.service";
import {UserTypeInterface} from "../../../../interfaces/userType.interface";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-user-type',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-user-type.component.html',
  styleUrl: './update-user-type.component.css'
})
export class UpdateUserTypeComponent implements OnInit{

  userTypeId: number | undefined
  userTypeForm: FormGroup | undefined
  userType: UserTypeInterface | undefined

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userTypeService: UserTypeService,
    private router: Router,
    private toastService: ToastrService) {
  }

  ngOnInit() {

    //set media id
    this.route.params.subscribe(params => {
      this.userTypeId = params['id']
    })

    //form values
    if(this.userTypeId)
      this.userTypeService.getUserTypeById(this.userTypeId).subscribe(userType => {
          this.userType = userType
          this.userTypeForm = this.formBuilder.group({
            name: userType.name,
          })
        }
      )

  }

  onSubmit() {

    const update = this.userTypeForm?.value

    if(this.userTypeId && this.userType?.name !== "player" && this.userType?.name !== "admin") {
      this.userTypeService.updateUserType(this.userTypeId, {
        id: this.userTypeId,
        ...update
      }).subscribe({
        next: () => {
          this.toastService.success("Tipo editado correctamente")
          this.router.navigate(['/panel'])
        },
        error: (e) => {
          this.toastService.error(e.error)
        }
      })
    } else {
      this.toastService.error("Este tipo de usuario no debe ser modificado")
    }
  }

  onDelete(){
    if(this.userTypeId)
      this.userTypeService.deleteUserType(this.userTypeId).subscribe({
        next: () => {
          this.toastService.success("Tipo borrado correctamente")
          this.router.navigate(['/panel'])

        },
        error: (e) => {
          this.toastService.error(e.error)
        }
      })
  }
}

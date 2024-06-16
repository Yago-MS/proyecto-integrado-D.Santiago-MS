import {Component, OnInit} from '@angular/core';
import {MediaService} from "../../../../utils/services/media.service";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MediaInterface} from "../../../interfaces/media.interface";
import {MediaTypeService} from "../../../../utils/services/mediaType.service";
import {UserService} from "../../../../utils/services/user.service";
import {UserTypeService} from "../../../../utils/services/userType.service";
import {UserInterface} from "../../../interfaces/user.interface";
import {UserTypeInterface} from "../../../interfaces/userType.interface";
import {MediaTypeInterface} from "../../../interfaces/mediaType.interface";
@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgOptimizedImage
  ],
  providers: [
    HttpClientModule
  ],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit{
  private entities: MediaInterface[] | UserInterface[] | UserTypeInterface[] | MediaTypeInterface[] = [];
  entityName:string | null = null;
  entityKeys: string[] = []
  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private mediaTypeService: MediaTypeService,
    private userService: UserService,
    private userTypeService: UserTypeService,
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entityName = params['entity']

      if(this.entityName){
        this.entityName === "media" && this.mediaService.getAllMedia().subscribe(entities => {
          this.entities = entities
          entities.length > 0 ? this.entityKeys = Object.keys(entities[0]) : this.entityKeys
        })
        this.entityName === "mediaType" && this.mediaTypeService.getAllMediaTypes().subscribe(entities => {
          this.entities = entities
          entities.length > 0 ? this.entityKeys = Object.keys(entities[0]) : this.entityKeys
        })
        this.entityName === "user" && this.userService.getAllUsers().subscribe(entities => {
          console.log(entities[0])
          this.entities = entities
          entities.length > 0 ? this.entityKeys = Object.keys(entities[0]) : this.entityKeys
        })
        this.entityName === "userType" && this.userTypeService.getAllUserTypes().subscribe(entities => {
          this.entities = entities
          entities.length > 0 ? this.entityKeys = Object.keys(entities[0]) : this.entityKeys
        })
      }
    })
  }
  getEntities(): any[]{
    return this.entities
  }
  onDelete(id: number){
    if(this.entityName){
      this.entityName === "media" && this.mediaService.deleteMediaById(id).subscribe(media =>
      console.log(media))
      this.entityName === "mediaType" && this.mediaTypeService.deleteMediaType(id).subscribe(type =>
      console.log(type))
      this.entityName === "user" && this.userService.deleteUser(id).subscribe(user =>
        console.log(user)
      )
      this.entityName === "userType" && this.userTypeService.deleteUserType(id).subscribe(type =>
      console.log(type))
    }
    window.location.reload()
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../utils/services/user.service";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import {ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [FormsModule, ImageCropperComponent, CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user') || '{}')
  credential: string | undefined;
  imagePrev: string | undefined;
  name: string | undefined;
  croppedImage: Blob | undefined;
  imageChangedEvent: any = '';

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.name = this.user.name;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event)

    if(event.blob && event.objectUrl) {
      this.croppedImage = event.blob
      this.imagePrev = event.objectUrl
    }

    console.log(this.croppedImage)
  }

  save() {
    const formFile = new FormData();
    if (this.croppedImage) {
      const blob = this.croppedImage;
      formFile.append('file', blob,  this.user.name + '-' + 'cropped-image.png');
      this.http.post<File>('http://192.168.0.95:8080/api/uploadProfile', formFile).subscribe();
    }

    this.userService.updateUser(this.user.id, {
      ...this.croppedImage && { imageUrl: `http://192.168.0.95:8080/user/${this.user.name}-cropped-image.png` },
      ...this.credential && { credential: this.credential },
      ...this.name && { name: this.name }
    }).subscribe(user => {
      console.log(user);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        image: user.imageUrl,
        maxScore: user.maxScore,
        name: user.name,
        type: user.typeId
      }));
      window.location.reload();
    });
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  cancel(){
    this.imagePrev = undefined
    this.croppedImage = undefined
    this.name = this.user.name
    this.credential = undefined
    this.imageChangedEvent = ''
  }
}

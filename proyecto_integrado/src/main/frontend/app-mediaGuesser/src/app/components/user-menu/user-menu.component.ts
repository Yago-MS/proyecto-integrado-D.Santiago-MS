import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../utils/services/user.service";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user') || '{}')
  credential: string | undefined
  uploadImage: File | undefined
  name: string | undefined

  constructor(private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.name = this.user.name
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click()
  }

  onFileSelected(event: any) {
    this.uploadImage = event.target.files[0];
    if (this.uploadImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result;
      };
      reader.readAsDataURL(this.uploadImage);
    }
  }

  save() {
    const formFile = new FormData()
    if (this.uploadImage) {
      formFile.append('file', this.uploadImage)
      this.http.post<File>('http://localhost:8080/api/uploadProfile', formFile).subscribe()
    }

    this.userService.updateUser(this.user.id, {
      ...this.uploadImage && {imageUrl: 'http://localhost:8080/user/' + this.uploadImage.name},
      ...this.credential && {credential: this.credential},
      ...this.name && {name: this.name}
    }).subscribe(user => {
      console.log(user)
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        image: user.imageUrl,
        maxScore: user.maxScore,
        name: user.name,
        type: user.typeId
      }))
      window.location.reload()
    })

  }

  logout() {
    localStorage.removeItem('user')
    window.location.reload()
  }
}

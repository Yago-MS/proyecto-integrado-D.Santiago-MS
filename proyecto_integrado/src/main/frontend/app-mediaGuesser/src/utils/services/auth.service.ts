import { Injectable } from '@angular/core';
import {UserTypeService} from "./userType.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userTypeService: UserTypeService
  ) { }
  isAdmin(): boolean {
    let isAdmin = false
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userTypeService.getUserTypeById(parseInt(user.type)).subscribe(type => {
        isAdmin = type.name === 'admin'
      }
    )
    return isAdmin
  }
}

import {Injectable} from '@angular/core';
import {UserTypeService} from "./userType.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userTypeService: UserTypeService
  ) {
  }

  async isAdmin(): Promise<boolean> {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user.type) {
      try {
        const type = await this.userTypeService.getUserTypeById(parseInt(user.type)).toPromise();
        return type?.name === 'admin';
      } catch (error) {
        console.error('Error fetching user type', error);
        return false;
      }
    }
    return false;
  }
}

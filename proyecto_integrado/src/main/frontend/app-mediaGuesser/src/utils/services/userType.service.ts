import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserInterface} from "../../app/interfaces/user.interface";
import {ConfigService} from "./config.service";
import {UserTypeInterface} from "../../app/interfaces/userType.interface";

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private readonly baseUrl : string;

  constructor(private http: HttpClient,
              private configService : ConfigService) {
    this.baseUrl = configService.getApiUrl() + 'api/userType'
  }

  getAllUserTypes(): Observable<UserTypeInterface[]> {
    return this.http.get<UserTypeInterface[]>(`${this.baseUrl}`);
  }

  getUserTypeById(id: number): Observable<UserTypeInterface> {
    return this.http.get<UserTypeInterface>(`${this.baseUrl}/${id}`);
  }
  getUserTypeByName(name: string): Observable<UserTypeInterface> {
    return this.http.get<UserTypeInterface>(`${this.baseUrl}/name/${name}`);
  }

  createUserType(user: UserTypeInterface): Observable<UserTypeInterface> {
    return this.http.post<UserInterface>(`${this.baseUrl}`, user);
  }

  updateUserType(id: number, user: UserTypeInterface): Observable<UserTypeInterface> {
    return this.http.put<UserTypeInterface>(`${this.baseUrl}/${id}`, user);
  }

  deleteUserType(id: number): Observable<UserTypeInterface> {
    return this.http.delete<UserTypeInterface>(`${this.baseUrl}/${id}`);
  }

}

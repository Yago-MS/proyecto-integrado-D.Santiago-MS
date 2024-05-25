import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserInterface} from "../../app/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private baseUrl = 'http://localhost:8080/api/userType';

  constructor(private http: HttpClient) { }

  getAllUserTypes(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}`);
  }

  getUserTypeById(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.baseUrl}/id/${id}`);
  }
  getUserTypeByName(name: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.baseUrl}/name/${name}`);
  }

  createUserType(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.baseUrl}`, user);
  }

  updateUserType(id: number, user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${this.baseUrl}/${id}`, user);
  }

  deleteUserType(id: number): Observable<UserInterface> {
    return this.http.delete<UserInterface>(`${this.baseUrl}/${id}`);
  }

}

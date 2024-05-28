import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserInterface} from "../../app/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}`);
  }

  getUserById(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.baseUrl}/${id}`);
  }

  createUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.baseUrl}`, user);
  }

  updateUser(id: number, user: object): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<UserInterface> {
    return this.http.delete<UserInterface>(`${this.baseUrl}/${id}`);
  }
}

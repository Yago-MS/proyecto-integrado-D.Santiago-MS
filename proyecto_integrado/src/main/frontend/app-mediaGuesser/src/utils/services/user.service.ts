import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserInterface} from "../../app/interfaces/user.interface";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl : string

  constructor(private http: HttpClient,
  private configService: ConfigService) {
    this.baseUrl = configService.getApiUrl() + 'api/user'
  }

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

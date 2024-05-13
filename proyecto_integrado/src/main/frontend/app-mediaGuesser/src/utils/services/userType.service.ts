import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private baseUrl = 'http://localhost:8080/api/userType';

  constructor(private http: HttpClient) { }

  getAllUserTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getUserTypeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUserType(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUserType(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUserType(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

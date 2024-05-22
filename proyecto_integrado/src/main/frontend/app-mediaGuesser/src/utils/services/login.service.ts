import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) { }

  login({name, credential} : {name: string, credential: string}): Observable<any> {
    const formData = new FormData();
    formData.append('username', name);
    formData.append('password', credential);

    return this.http.post<any>(this.loginUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error.error || 'Server error');
  }
}

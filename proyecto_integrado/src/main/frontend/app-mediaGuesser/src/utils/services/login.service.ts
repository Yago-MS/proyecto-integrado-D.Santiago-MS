import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl : string;

  constructor(private http: HttpClient,
              private configService: ConfigService) {
    this.baseUrl = configService.getApiUrl() + 'api/login'
  }

  login({name, credential} : {name: string, credential: string}): Observable<any> {
    const formData = new FormData();
    formData.append('username', name);
    formData.append('password', credential);

    return this.http.post<any>(this.baseUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error.error || 'Server error');
  }
}

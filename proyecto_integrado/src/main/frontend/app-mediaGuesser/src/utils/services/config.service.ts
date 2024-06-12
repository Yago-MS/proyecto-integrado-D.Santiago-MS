import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl!: string;

  constructor() {
    this.apiUrl = `http://${window.location.hostname}:8080/`
  }

  getApiUrl(): string {
    if(this.apiUrl) {
      return this.apiUrl
    } else {
      return 'http://localhost:8080/'
    }
  }
}

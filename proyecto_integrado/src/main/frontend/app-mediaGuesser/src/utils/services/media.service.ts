import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MediaInterface} from "../../app/interfaces/media.interface";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private baseUrl = 'http://localhost:8080/api/media';

  constructor(private http: HttpClient) { }

  getAllMedia(): Observable<MediaInterface[]> {
    return this.http.get<MediaInterface[]>(`${this.baseUrl}`);
  }

  getMediaById(id: number): Observable<MediaInterface> {
    return this.http.get<MediaInterface>(`${this.baseUrl}/${id}`);
  }

  createMedia(media: MediaInterface): Observable<MediaInterface> {
    return this.http.post<MediaInterface>(`${this.baseUrl}`, media);
  }

  editMediaById(id: number, media: any): Observable<MediaInterface> {
    return this.http.put<MediaInterface>(`${this.baseUrl}/${id}`, media);
  }

  deleteMediaById(id: number): Observable<MediaInterface> {
    return this.http.delete<MediaInterface>(`${this.baseUrl}/${id}`);
  }
}

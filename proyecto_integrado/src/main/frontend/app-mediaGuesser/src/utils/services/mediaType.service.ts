import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MediaTypeInterface} from "../../app/interfaces/mediaType.interface";

@Injectable({
  providedIn: 'root'
})
export class MediaTypeService {

  private baseUrl = 'http://192.168.121.205:8080/api/mediaType';

  constructor(private http: HttpClient) { }

  getAllMediaTypes(): Observable<MediaTypeInterface[]> {
    return this.http.get<MediaTypeInterface[]>(`${this.baseUrl}`);
  }

  getMediaTypeByID(id: number): Observable<MediaTypeInterface> {
    return this.http.get<MediaTypeInterface>(`${this.baseUrl}/${id}`);
  }

  createMediaType(mediaType: MediaTypeInterface): Observable<MediaTypeInterface> {
    return this.http.post<MediaTypeInterface>(`${this.baseUrl}`, mediaType);
  }

  updateMediaType(id: number, mediaType: MediaTypeInterface): Observable<MediaTypeInterface> {
    return this.http.put<MediaTypeInterface>(`${this.baseUrl}/${id}`, mediaType);
  }

  deleteMediaType(id: number): Observable<MediaTypeInterface> {
    return this.http.delete<MediaTypeInterface>(`${this.baseUrl}/${id}`);
  }
}

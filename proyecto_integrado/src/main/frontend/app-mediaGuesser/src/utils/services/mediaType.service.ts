import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MediaTypeInterface} from "../../app/interfaces/mediaType.interface";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class MediaTypeService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient,
              private configService : ConfigService) {
    this.baseUrl = configService.getApiUrl() + 'api/mediaType'
  }

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

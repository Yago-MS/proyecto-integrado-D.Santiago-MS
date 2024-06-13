import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {MediaInterface} from "../../app/interfaces/media.interface";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly baseUrl:string;

  constructor(private http: HttpClient,
              private configService: ConfigService) {
    this.baseUrl = configService.getApiUrl() + 'api/media'
  }

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

  getMediaAfterYearAndType(year: number, types: number[]){


    let params = new HttpParams()
      .set('startYear', year)
      .set('types', types.toString());

    return this.http.get<MediaInterface[]>(`${this.baseUrl}/afterAndType`, {params})
  }
}

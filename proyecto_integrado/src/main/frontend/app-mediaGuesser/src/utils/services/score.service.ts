import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ScoreInterface} from "../../app/interfaces/score.interface";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private readonly baseUrl : string;

  constructor(private http: HttpClient,
              private configService: ConfigService) {
    this.baseUrl = configService.getApiUrl() + 'api/score'
  }

  getAllScores(): Observable<ScoreInterface[]> {
    return this.http.get<ScoreInterface[]>(`${this.baseUrl}`);
  }

  createScore(score: ScoreInterface): Observable<ScoreInterface> {
    return this.http.post<ScoreInterface>(`${this.baseUrl}`, score);
  }

  deleteScore(id: number): Observable<ScoreInterface> {
    return this.http.delete<ScoreInterface>(`${this.baseUrl}/${id}`);
  }

  getTopScores(): Observable<ScoreInterface[]> {
    return this.http.get<ScoreInterface[]>(`${this.baseUrl}/top`)
  }
}

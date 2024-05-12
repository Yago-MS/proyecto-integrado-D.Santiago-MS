import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private baseUrl = 'http://localhost:8080/api/score';

  constructor(private http: HttpClient) { }

  getAllScores(): Observable<ScoreService[]> {
    return this.http.get<ScoreService[]>(`${this.baseUrl}`);
  }

  createScore(score: ScoreService): Observable<ScoreService> {
    return this.http.post<ScoreService>(`${this.baseUrl}`, score);
  }

  deleteScore(id: number): Observable<ScoreService> {
    return this.http.delete<ScoreService>(`${this.baseUrl}/${id}`);
  }
}

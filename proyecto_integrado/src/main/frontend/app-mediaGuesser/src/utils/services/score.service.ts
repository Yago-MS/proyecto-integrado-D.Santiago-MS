import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ScoreInterface} from "../../app/interfaces/score.interface";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private baseUrl = 'http://192.168.121.205:8080/api/score';

  constructor(private http: HttpClient) { }

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

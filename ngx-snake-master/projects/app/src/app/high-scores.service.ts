import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Score {
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class HighScoresService {
  private baseUrl = 'http://localhost:3000/scores/snake-game';

  constructor(private http: HttpClient) {}

  getHighScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.baseUrl).pipe(
      map(scores => scores.sort((a, b) => b.score - a.score).slice(0, 10))
    );
  }

  saveHighScore(score: Score): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl, score, { headers }).pipe(
      map(() => {
        return this.getHighScores();
      })
    );
  }
}
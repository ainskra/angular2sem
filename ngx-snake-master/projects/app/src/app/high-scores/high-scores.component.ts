import { Component, OnInit } from '@angular/core';
import { HighScoresService } from '../high-scores.service';

interface Score {
  name: string;
  score: number;
}

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScoresComponent implements OnInit {
  highScores: Score[] = [];
  sortAscending: boolean = true;

  constructor(private highScoresService: HighScoresService) {}

  ngOnInit(): void {
    this.fetchHighScores();
  }

  fetchHighScores(): void {
    this.highScoresService.getHighScores().subscribe(scores => {
      this.highScores = scores;
    });
  }

  sortScores(): void {
    this.highScores.sort((a, b) => this.sortAscending ? a.score - b.score : b.score - a.score);
    this.sortAscending = !this.sortAscending;
  }
}
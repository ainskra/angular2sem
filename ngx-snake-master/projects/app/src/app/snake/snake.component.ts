import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { NgxSnakeComponent } from 'ngx-snake';
import { PlayerDataService } from '../player-data.service';
import { HighScoresService } from '../high-scores.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
})
export class SnakeComponent implements OnInit {
  @ViewChild('game')
  private _snake: NgxSnakeComponent;

  private score;
  private status;
  private timeElapsed;
  private timer;
  public nickname: string;
  public colorPalette: string;

  constructor(
      private _hotkeysService: HotkeysService,
      private elRef: ElementRef,
      private renderer: Renderer2,
      private playerDataService: PlayerDataService,
      private highScoresService: HighScoresService,
      private route: ActivatedRoute
  ) {
      this._addHotkeys();
      this.score = 0;
      this.status = 'ready';
      this.timeElapsed = 0;
      this.timer = setInterval(() => {}, 0);
  }

  ngOnInit() {
      this.nickname = this.playerDataService.getPlayerName() || 'Player';
      this.colorPalette = this.route.snapshot.paramMap.get('colors') || 'normal';
  }

  public updateScore() {
      const score = this.elRef.nativeElement.querySelector('#score');
      this.renderer.setProperty(score, 'innerHTML', this.score);
  }

  public updateTime() {
      const time = this.elRef.nativeElement.querySelector('#time');
      this.renderer.setProperty(time, 'innerHTML', this.timeElapsed);
  }

  public updateStatus() {
      const status = this.elRef.nativeElement.querySelector('#status');
      this.renderer.setProperty(status, 'innerHTML', this.status);
  }

  public reset() {
      this.status = 'ready';
      this._snake.actionReset();
      this.score = 0;
      this.updateScore();
      this.updateStatus();
      this.timeElapsed = 0;
      this.updateTime();
      clearInterval(this.timer);
  }

  public stop() {
      this.status = 'paused';
      this._snake.actionStop();
      this.updateStatus();

      clearInterval(this.timer);
  }

  public start() {
      this.status = 'started';
      this._snake.actionStart();
      this.updateStatus();

      this.timer = setInterval(() => {
          this.timeElapsed++;
          this.updateTime();
      }, 1000);
  }

  public onGrow() {
      this.score++;
      this.updateScore();
  }

  public onGameOver() {
      this.saveHighScore();
      alert('Game over! Your score: ' + this.score);
      this.reset();
  }

  private saveHighScore() {
    const highScore = {
      name: this.nickname,
      score: this.score
    };
    this.highScoresService.saveHighScore(highScore).subscribe({
      next: (response) => console.log('High score saved successfully'),
      error: (error) => console.error('Error saving high score', error)
    });
  }

  private _addHotkeys() {
      this._hotkeysService.add(
          new Hotkey('up', (event: KeyboardEvent): boolean => {
              this._snake.actionUp();
              return false;
          })
      );

      this._hotkeysService.add(
          new Hotkey('left', (event: KeyboardEvent): boolean => {
              this._snake.actionLeft();
              return false;
          })
      );

      this._hotkeysService.add(
          new Hotkey('down', (event: KeyboardEvent): boolean => {
              this._snake.actionDown();
              return false;
          })
      );

      this._hotkeysService.add(
          new Hotkey('right', (event: KeyboardEvent): boolean => {
              this._snake.actionRight();
              return false;
          })
      );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  public nickname: string = '';
  public authCode: string = '';
  public colorPalette: string = 'normal';

  constructor(private router: Router, private playerDataService: PlayerDataService) {}

  startGame() {
    if (this.nickname.length >= 5 && this.authCode.length >= 5) {
      this.playerDataService.setPlayerName(this.nickname);
      this.router.navigate(['/game', this.colorPalette]);
    }
  }

  updateElementColor() {
    
  }
}
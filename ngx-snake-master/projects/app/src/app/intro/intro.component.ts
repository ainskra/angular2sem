import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  public introForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private playerDataService: PlayerDataService
  ) {
    this.introForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      authCode: ['', [Validators.required, Validators.minLength(5)]],
      colorPalette: ['normal']
    });
  }

  ngOnInit(): void {}

  startGame() {
    if (this.introForm.valid) {
      const { nickname, colorPalette } = this.introForm.value;
      this.playerDataService.setPlayerName(nickname);
      this.router.navigate(['/game', colorPalette]);
    }
  }

  updateElementColor() {
    
  }
}
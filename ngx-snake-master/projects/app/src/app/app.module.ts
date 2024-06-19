import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxSnakeModule } from 'ngx-snake';
import { HotkeyModule } from 'angular2-hotkeys';
import { IntroComponent } from './intro/intro.component';
import { AppRoutingModule } from './app-routing.module';
import { SnakeComponent } from './snake/snake.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { PlayerDataService } from './player-data.service';
import { HighScoresService } from './high-scores.service';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    SnakeComponent,
    HighScoresComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    HotkeyModule.forRoot(),
    NgxSnakeModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    PlayerDataService,
    HighScoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
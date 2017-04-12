import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { 
  MyTeamsPage, 
  TournamentsPage, 
  TeamsPage, 
  TeamDetailPage, 
  StandingsPage, 
  TeamHomePage, 
  GamePage,
  MapPage } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';

import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';


@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage, 
    TeamHomePage,
    GamePage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfcWCnbTYbl1k1uJW9cWC37OrvtZnIROU'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage, 
    TeamHomePage,
    GamePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    UserSettings,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

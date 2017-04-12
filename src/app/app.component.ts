import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage, TournamentsPage, TeamHomePage } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favoriteTeams: any[];


  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen, 
      private loadingController: LoadingController,
      private userSettings: UserSettings,
      private eliteApi: EliteApi,
      private events: Events) {
    
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();

      this.events.subscribe('favorites:changed', () => {
        this.refreshFavorites();
      });
    });
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }
  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    console.log(favorite);
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites((value => {
      this.favoriteTeams = value;
    }));
  }
}

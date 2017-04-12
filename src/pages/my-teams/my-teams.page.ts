import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {

  favorites = [];

  constructor(
      private navCtrl: NavController, 
      private loadingController: LoadingController, 
      private eliteApi: EliteApi,
      private userSettings: UserSettings ) { }

  goToTournaments() {    
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
        .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
  }

  ionViewWillEnter() {
    this.userSettings.getAllFavorites((value) => {
      this.favorites = value;
    });
  }


}

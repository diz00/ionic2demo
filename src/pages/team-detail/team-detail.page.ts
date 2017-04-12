import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';

//import { MyTeamsPage } from '../pages';
import { GamePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';


@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage  {
  allGames: any[];
  dateFilter: string;
  games: any[];
  team: any = {};
  teamStanding: any = {};
  useDateFilter = false;
  private tournamentData: any;

  isFollowing = false;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private eliteApi: EliteApi,
    private alertController: AlertController,
    private toastController: ToastController,
    private userSettings: UserSettings
  ) { }


  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tournamentData = this.eliteApi.getCurrentTournament();

    this.games = _.chain(this.tournamentData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentName,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      homeAway: (isTeam1 ? "vs." : "at"),
                      scoreDisplay
                    };
                  })
                  .value();
    
    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });

    this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
    
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }


  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unfavoriteTeam(this.team);

              let toast = this.toastController.create({
                message: 'You have unfollowed this team',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();


            }
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(this.team, this.tournamentData.tournament.id, this.tournamentData.tournament.name);
    }
  }

  refreshAll(refresher) {
    this.eliteApi.refreshCurrentTournament().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

}

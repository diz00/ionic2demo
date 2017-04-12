import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html'
})
export class TeamsPage {

  private allTeams: any;
  private allTeamDivisions: any;

  teams = [];
  queryText: string = '';

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi,
              private loadingController: LoadingController) { }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  ionViewDidLoad() {
    let selectedTournament = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTournament.id)
        .subscribe(data => {
          this.allTeams = data.teams;
          this.allTeamDivisions = 
              _.chain(data.teams)
               .groupBy('division')
               .toPairs()
               .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
               .value();

          this.teams = this.allTeamDivisions;
          loader.dismiss();
        });
    });
  }

  updateTeams() {
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });
    this.teams = filteredTeams;
  }


}

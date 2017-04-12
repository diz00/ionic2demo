import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.page.html'
})
export class StandingsPage {
  allStandings: any[];
  standings: any[];
  team: any;
  divisionFilter: String = 'division';


  constructor(private navCtrl: NavController, private navParams: NavParams, private eliteApi: EliteApi) {
    this.team = this.navParams.data;
    let tournamentData = this.eliteApi.getCurrentTournament();
    this.standings = tournamentData.standings;

    this.allStandings = tournamentData.standings;

    this.filterDivision();
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }

  filterDivision() {
    if(this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

}

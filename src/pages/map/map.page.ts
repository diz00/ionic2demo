import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.page.html'
})
export class MapPage {

    map: any;

    constructor(private navParams: NavParams, private eliteApi: EliteApi) {
        let games = this.navParams.data;
        let tournamentData = this.eliteApi.getCurrentTournament();
        let location = tournamentData.locations[games.locationId];

        this.map = {
            lat: location.latitude,
            lng: location.longitude,
            zoom: 12,
            markerLabel: games.location
        };
    }

    getDirections() {
        window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
    }

}
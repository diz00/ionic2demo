import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

    private baseUrl = 'https://elite-schedule-app-i2-a41bd.firebaseio.com';
    currentTournament: any = {};
    private tournamentData = {};

    constructor(private http: Http) { }

    getTournaments() {
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        })
    }


    getTournamentData(tournamentId, forceRefresh: boolean = false) : Observable<any> {
        if (!forceRefresh && this.tournamentData[tournamentId]) {
            this.currentTournament = this.tournamentData[tournamentId];
            console.log('** no need to make HTTP call, just return the data');
            return Observable.of(this.currentTournament);
        }

        // don't have data yet
        console.log('**about to make HTTP call');
        return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
                .map(response => {
                    this.tournamentData[tournamentId] = response.json();
                    this.currentTournament = this.tournamentData[tournamentId];
                    return this.currentTournament;
                })
    }

    getCurrentTournament() {
        return this.currentTournament;
    }

    refreshCurrentTournament() {
        return this.getTournamentData(this.currentTournament.tournament.id, true);
    }
}
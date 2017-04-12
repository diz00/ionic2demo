import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


@Injectable()
export class UserSettings {

    constructor(private storage: Storage, private events: Events) { }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team, tournamentId, tournamentName };

        this.storage.set(team.id, JSON.stringify(item))
            .then(() => this.events.publish('favorites:changed'));
    }

    unfavoriteTeam(team) {
        this.storage.remove(team.id)
            .then(() => this.events.publish('favorites:changed'));
    }
    isFavoriteTeam(teamId) {
        return this.storage.get(teamId).then(value => value ? true : false);    
    
    }

    getAllFavorites(callback) {
        let items = [];

        this.storage.forEach((v, k) => {
            items.push(JSON.parse(v));
        })
        .then(() => {
            callback(items.length ? items : null);
        });
    }
}
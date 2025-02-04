'use strict';

class Athlete {
    constructor(athleteId, name, sport, nationality) {
        this.docType = 'athlete';
        this.athleteId = athleteId;
        this.name = name;
        this.sport = sport;
        this.nationality = nationality;
    }
}

module.exports = Athlete;

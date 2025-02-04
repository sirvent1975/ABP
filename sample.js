'use strict';

class Sample {
    constructor(sampleId, athleteId, date, type, result) {
        this.docType = 'sample';
        this.sampleId = sampleId;
        this.athleteId = athleteId;
        this.date = date;
        this.type = type;
        this.result = result;
    }
}

module.exports = Sample;

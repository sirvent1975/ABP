'use strict';

const { Contract } = require('fabric-contract-api');
const Athlete = require('./athlete');
const Sample = require('./sample');

class BiologicalPassportContract extends Contract {

    async initLedger(ctx) {
        console.info('Initializing the ledger with sample data...');

        const athletes = [
            new Athlete('ATH123', 'John Doe', 'Cycling', 'USA'),
            new Athlete('ATH456', 'Jane Smith', 'Athletics', 'UK'),
        ];

        for (const athlete of athletes) {
            await ctx.stub.putState(athlete.athleteId, Buffer.from(JSON.stringify(athlete)));
            console.info(`Athlete ${athlete.athleteId} initialized`);
        }
    }

    async registerAthlete(ctx, athleteId, name, sport, nationality) {
        const exists = await this.athleteExists(ctx, athleteId);
        if (exists) {
            throw new Error(`The athlete ${athleteId} already exists`);
        }

        const athlete = new Athlete(athleteId, name, sport, nationality);
        await ctx.stub.putState(athleteId, Buffer.from(JSON.stringify(athlete)));
        console.info(`Athlete ${athleteId} registered`);
    }

    async recordSample(ctx, sampleId, athleteId, date, type, result) {
        const athleteExists = await this.athleteExists(ctx, athleteId);
        if (!athleteExists) {
            throw new Error(`Athlete ${athleteId} does not exist`);
        }

        const sample = new Sample(sampleId, athleteId, date, type, result);
        await ctx.stub.putState(sampleId, Buffer.from(JSON.stringify(sample)));
        console.info(`Sample ${sampleId} recorded for athlete ${athleteId}`);
    }

    async queryAthlete(ctx, athleteId) {
        const athleteJSON = await ctx.stub.getState(athleteId);
        if (!athleteJSON || athleteJSON.length === 0) {
            throw new Error(`Athlete ${athleteId} does not exist`);
        }
        return athleteJSON.toString();
    }

    async querySamplesByAthlete(ctx, athleteId) {
        const queryString = {
            selector: {
                docType: 'sample',
                athleteId: athleteId,
            },
        };

        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = [];

        while (true) {
            const res = await iterator.next();
            if (res.value) {
                const sample = JSON.parse(res.value.value.toString('utf8'));
                results.push(sample);
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(results);
            }
        }
    }

    async athleteExists(ctx, athleteId) {
        const athleteJSON = await ctx.stub.getState(athleteId);
        return athleteJSON && athleteJSON.length > 0;
    }
}

module.exports = BiologicalPassportContract;

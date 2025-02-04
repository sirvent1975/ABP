'use strict';

const { ChaincodeMockStub } = require('fabric-shim');
const { expect } = require('chai');
const BiologicalPassportContract = require('./index.js');

describe('BiologicalPassportContract', () => {
    let contract;
    let mockStub;

    beforeEach(() => {
        contract = new BiologicalPassportContract();
        mockStub = new ChaincodeMockStub('BiologicalPassportMockStub', contract);
    });

    it('should initialize the ledger with sample data', async () => {
        await contract.initLedger(mockStub.createContext());
        const athlete = await contract.queryAthlete(mockStub.createContext(), 'ATH123');
        expect(JSON.parse(athlete).name).to.equal('John Doe');
    });

    it('should register a new athlete', async () => {
        await contract.registerAthlete(mockStub.createContext(), 'ATH789', 'Alice Johnson', 'Swimming', 'Canada');
        const athlete = await contract.queryAthlete(mockStub.createContext(), 'ATH789');
        expect(JSON.parse(athlete).name).to.equal('Alice Johnson');
    });

    it('should record a biological sample', async () => {
        await contract.registerAthlete(mockStub.createContext(), 'ATH456', 'Jane Smith', 'Athletics', 'UK');
        await contract.recordSample(mockStub.createContext(), 'SAMP001', 'ATH456', '2025-01-01', 'Blood', 'Negative');
        const samples = await contract.querySamplesByAthlete(mockStub.createContext(), 'ATH456');
        expect(JSON.parse(samples)[0].sampleId).to.equal('SAMP001');
    });
});

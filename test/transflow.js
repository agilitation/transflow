process.env.NODE_ENV = 'test';

const fse = require('fs-extra');
const path = require('path');
const assert = require('assert');
const options = require('./transflow.config');
const transflow = require('../src/transflow');

const genDir = path.join(__dirname, 'data/gen');
const localeDir = path.join(__dirname, 'data/gen');


describe('Transflow Test Suite', () => {
    beforeEach((done) => {
        fse.removeSync(path.join(__dirname, 'data/gen'));
        fse.removeSync(path.join(__dirname, 'data/locale'));
        done();
    });

    it('creates the directories', done => {
        transflow(options);
        assert(fse.pathExistsSync(genDir), true);
        assert(fse.pathExistsSync(localeDir), true);
        done();
    });

    it('leaves text properties intact', done => {
        transflow(options);
        const json = JSON.parse(fse.readFileSync(path.join(genDir, 'fr', 'entry.json')));
        assert(json.noopProp === 'willnotbetranslated');
        done();
    })
});

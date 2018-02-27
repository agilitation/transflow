process.env.NODE_ENV = 'test';

const fse = require('fs-extra');
const path = require('path');
const assert = require('assert');
const options = require('./transflow.config');
const transflow = require('../src/transflow');

const srcDir = path.join(__dirname, 'data/src');
const genDir = path.join(__dirname, 'data/gen');
const localeDir = path.join(__dirname, 'data/locale');

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
  });

  it('create translation in french from default', done => {
    transflow(options);
    const jsonFile = path.join(genDir, 'fr', 'entry.json');
    const json = JSON.parse(fse.readFileSync(jsonFile, 'utf-8'));
    assert(json.simpleProp === 'simpleProp.defaultValue');
    done();
  });

  it('create translation in english', done => {
    transflow(options);
    const poFile = path.join(localeDir, 'en', 'entry.po');
    const jsonFile = path.join(genDir, 'en', 'entry.json');
    const poContent = fse.readFileSync(poFile, 'utf-8');
    const newPoContent = poContent.replace('TOBETRANSLATED', 'TRANSLATED');
    fse.writeFileSync(poFile, newPoContent);
    transflow(options);
    const json = JSON.parse(fse.readFileSync(jsonFile, 'utf-8'));
    assert(json.willBeTranslatedProp === 'TRANSLATED');
    done();
  });

  it('create english json', done => {
    transflow(options);
    const poFile = path.join(localeDir, 'en', 'personalDataTypes.po');
    const englishPoFile = path.join(srcDir, 'personalDataTypes-en.po');
    const jsonFile = path.join(genDir, 'en', 'personalDataTypes.json');
    fse.copySync(englishPoFile, poFile);
    transflow(options);
    const json = JSON.parse(fse.readFileSync(jsonFile, 'utf-8'));
    assert(Array.isArray(json), 'JSON must be array');
    assert.equal(json[0].label, 'Civil status', 'Label of first element should be "Civil status"');
    done();
  });

  it('handle arrays of arrays', done => {
    transflow(options);
    const jsonFile = path.join(genDir, 'fr', 'entry.json');
    const json = JSON.parse(fse.readFileSync(jsonFile, 'utf-8'));
    assert(Array.isArray(json.arrayOfArraysProp));
    assert.equal(json.arrayOfArraysProp.length, 2);
    assert(Array.isArray(json.arrayOfArraysProp[0]));
    assert.equal(json.arrayOfArraysProp[0].length, 2);
    done();
  });
});

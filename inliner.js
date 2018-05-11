#!/usr/bin/env node
const args = require('yargs').argv._;
const { Observable } = require('rx');
const { fs, inliner } = require('./utils');

const SOURCE_DIR = './src';
const DIST_DIR = './dist';

fs.readDir$(SOURCE_DIR)
  .flatMap(filename => fs.readFile$(SOURCE_DIR + '/' + filename).map((html) => ({ filename, html })))
  .flatMap(({ filename, html }) => inliner.inline$(html).map(output => ({ filename, output })))
  .flatMap(({ filename, output }) => fs.writeFile$(DIST_DIR + '/' + filename, output))
  .subscribe(
    filename => { console.log('Processed: ' + filename) },
    err => { console.log('Error: ', err) },
    () => { console.log('Done!') },
  )

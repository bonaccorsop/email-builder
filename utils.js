const { Observable } = require('rx');
const fs = require('fs');
const inlineCss = require('inline-css');


module.exports = {

  inliner: {
    inline$: (html) => Observable.fromPromise(inlineCss(html, { url: 'nan' }))
  },

  fs: {

    readDir$: (dir) => {
      return Observable.fromPromise(new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
          err ? reject(err) : resolve(files)
        });
      }))
      .flatMap(files => Observable.fromArray(files));
    },

    readFile$: (filename) => {
      return Observable.fromPromise(new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, buffer) => {
          err ? reject(err) : resolve(buffer.toString('utf8'), 'utf8')
        });
      }))
    },

    writeFile$: (filename, content) => {
      return Observable.fromPromise(new Promise((resolve, reject) => {
        fs.writeFile(filename, content, err => {
          err ? reject(err) : resolve(filename);
        });
      }))
    },

  }

}


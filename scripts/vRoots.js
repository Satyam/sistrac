const promisify = require('util').promisify;
const fs = require('fs');
const stat = promisify(fs.stat);
const mkDir = promisify(fs.mkdir);
const symlink = promisify(fs.symlink);
const join = require('path').join;
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));

const env = process.argv[2];

const folder = process.cwd();
const specs = join(folder, 'virtualRoots.js');
stat(specs)
  .catch(err => {
    if (err.code === 'ENOENT') process.exit(0);
    else throw err;
  })
  .then(() => {
    const vRoots = require(specs);
    const vMap = vRoots.map[env || vRoots.default];
    if (!vMap) {
      throw new Error('No config for ' + env + ' in ' + folder);
    }

    const vFolder = join(folder, vRoots.vFolder);
    return rimraf(vFolder)
      .then(() => mkdirp(vFolder))
      .then(() =>
        Promise.all(
          Object.keys(vMap).map(vRoot => {
            console.log(
              vFolder,
              join(folder, vMap[vRoot]),
              join(vFolder, vRoot),
            );
            symlink(
              join(folder, vMap[vRoot]),
              join(vFolder, vRoot),
              'junction',
            );
          }),
        ),
      );
  });

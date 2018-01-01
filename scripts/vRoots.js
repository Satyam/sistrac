const promisify = require('util').promisify;
const fs = require('fs');
const stat = promisify(fs.stat);
const mkDir = promisify(fs.mkdir);
const symlink = promisify(fs.symlink);
const join = require('path').join;
const rimraf = promisify(require('rimraf'));
const mkdirp = promisify(require('mkdirp'));

const env = process.argv[2] || 'default';

const folder = process.cwd();
const specs = join(folder, 'virtualRoots.js');
stat(specs)
  .catch(err => {
    if (err.code === 'ENOENT') process.exit(0);
    else throw err;
  })
  .then(() => {
    const vRoots = require(specs)[env];
    if (!vRoots) {
      console.warn('No config for ' + env + ' in ' + folder);
      process.exit(1);
    }
    const _ = join(folder, 'src/_');
    rimraf(_)
      .then(() => mkdirp(_))
      .then(() =>
        Promise.all(
          Object.keys(vRoots).map(vRoot =>
            symlink(join(folder, vRoots[vRoot]), join(_, vRoot), 'junction'),
          ),
        ),
      )
      .catch(err => console.warn(err));
  });

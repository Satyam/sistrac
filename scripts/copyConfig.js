var path = require('path');
var fs = require('fs');
['server', 'desktop'].forEach(folder =>
  fs.copyFileSync(
    path.join(process.cwd(), 'config.js'),
    path.join(process.cwd(), 'packages', folder, 'src/config.js'),
  ),
);

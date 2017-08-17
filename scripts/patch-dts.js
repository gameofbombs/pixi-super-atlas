var fs = require('fs');
var path = require('path');
var dtsPath = path.resolve(__dirname, '../dist/pixi-super-atlas.d.ts');

fs.readFile(dtsPath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/namespace pixi_atlas/g, 'module PIXI.atlas').replace(/pixi_atlas/, 'PIXI.atlas');

  fs.writeFile(dtsPath, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

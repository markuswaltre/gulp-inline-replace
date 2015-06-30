var path = require('path');
var fs = require('fs');
var through = require('through2');

const PLUGIN_NAME = 'gulp-inline-replace';

function gulpInlineReplace(args) {
  var base = args.base;
  var regex = args.regex;
  var files = [];

  return through.obj(function (file, enc, cb) {
      var relative = path.relative(file.base, file.path);

      fs.readFile(base + relative, enc, function(err, data) {
        if(!err) {
          file.contents = new Buffer(String(file.contents).replace(regex, data));
        }

        files.push(file);             
        cb();
      });

  }, function (cb) {
      var that = this;
      files.forEach(function (file) {
          that.push(file);
      });
      cb();
  });
}

module.exports = gulpInlineReplace;
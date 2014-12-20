#!/usr/bin/env node

var dist = require('../');
var fs = require('fs');
var version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version

var opt = require('optimist')
  .usage('Dist '+version+'\n$0 [opts]')
  .options('i', {
    alias: 'input',
    describe: 'Input file'
  })
  .options('f', {
    alias: 'filename',
    describe: 'Filename [required if using stdin]'
  })
  .options('c', {
    alias: 'copyright',
    describe: 'Copyright file'
  })
  .options('o', {
    alias: 'output',
    describe: 'Output directory',
    default: '.'
  })


var argv = opt.argv

if (argv.help) {
  return opt.showHelp();
}

var stdin = function(cb) {
  var buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(chunk){ buf += chunk; });
  process.stdin.on('end', function(){
    cb(buf);
  }).resume();
}

var complete = function(err, dev, prod) {
  if (err) {
    throw err;
  }
  console.log('Files created:');
  console.log(dev.filename + ' ('+dev.size+')');
  console.log(prod.filename + ' ('+prod.size+')');
}

if (argv.input) {
  dist({
    input: argv.input,
    out: argv.output,
    copyright: argv.copyright,
    complete: complete
  });
} else {
  stdin(function(str) {
    dist({
      source: str,
      filename: argv.filename,
      out: argv.output,
      copyright: argv.copyright,
      complete: complete
    });

  });


}

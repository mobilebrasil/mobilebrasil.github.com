var fs = require('fs');
var uglify = require('uglify-js');
var path = require('path')
var filesize = require('filesize');

var generateProd = function(source, copyright) {
  var out = copyright;
  var ast = uglify.parser.parse(source);
  ast = uglify.uglify.ast_mangle(ast);
  ast = uglify.uglify.ast_squeeze(ast);
  out += uglify.uglify.gen_code(ast);
  return out;
}

var getProdFilename = function(devFile) {
  var ext = path.extname(devFile);
  var basename = path.basename(devFile, ext);

  return basename + '.min' + ext;
}

var size = function(source) {
  var bytes = Buffer.byteLength(source);
  return filesize(bytes);
}

var dist = function(options) {


  if (options.input) {
    options.source = fs.readFileSync(options.input, 'utf8');
  } else {
    if (!options.filename && options.complete) {
      return options.complete(new Error('filename is required when using source'));
    }
  }

  options.copyright = (options.copyright) ? fs.readFileSync(options.copyright, 'utf8') + '\n' : '';

  var devFile = (options.input) ? path.basename(options.input) : options.filename;
  var devSource = options.copyright + options.source;

  var prodFile = getProdFilename(devFile);
  var prodSource = generateProd(options.source, options.copyright);

  var dev = {
    filename: devFile,
    source: devSource,
    size: size(devSource)
  }

  var prod = {
    filename: prodFile,
    source: prodSource,
    size: size(prodSource)
  }

  if (options.out) {
    dev.filename = path.join(options.out, dev.filename);
    prod.filename = path.join(options.out, prod.filename);

    fs.writeFileSync(dev.filename, dev.source);
    fs.writeFileSync(prod.filename, prod.source);

  }


  if (options.complete) {
    options.complete(null, dev, prod)
  }
}

module.exports = dist;

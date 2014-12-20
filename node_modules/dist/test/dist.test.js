var assert = require('assert');
var fs = require('fs');

var dist = require('../');

var fixtureDir = __dirname + '/fixtures/';

var fixtureInput = fixtureDir + 'input.js';
var fixtureCopyright = fixtureDir + 'copyright.js';

var readFixture = function(file) {
  return fs.readFileSync(fixtureDir + file, 'utf8');
}

suite('dist', function() {


  suite('input file', function() {

    test('pass in inputfile, should generate dev and prod versions', function(done) {
      dist({
        input: fixtureInput,
        complete: function(err, dev, prod) {


          assert.equal(typeof dev, 'object');
          assert.equal(dev.filename, 'input.js');
          assert.equal(dev.source, readFixture('out/input.js'));
          assert.equal(dev.size, '199.00B');

          assert.equal(typeof prod, 'object');
          assert.equal(prod.filename, 'input.min.js');
          assert.equal(prod.source, readFixture('out/input.min.js'));
          assert.equal(prod.size, '139.00B');

          done();
        }
      });
    });

    test('copyright', function(done) {
      dist({
        input: fixtureInput,
        copyright: fixtureCopyright,
        complete: function(err, dev, prod) {

          assert.equal(typeof dev, 'object');
          assert.equal(dev.filename, 'input.js');
          assert.equal(dev.source, readFixture('out/input.copyright.js'));

          assert.equal(typeof prod, 'object');
          assert.equal(prod.filename, 'input.min.js');
          assert.equal(prod.source, readFixture('out/input.copyright.min.js'));

          done();
        }
      });
    });
    
    test('out', function(done) {
      dist({
        input: fixtureInput,
        out: '/tmp/',
        copyright: fixtureCopyright,
        complete: function(err, dev, prod) {

          assert.equal(dev.filename, '/tmp/input.js');
          assert.ok(fs.existsSync(dev.filename));
          assert.equal(fs.readFileSync(dev.filename, 'utf8'), readFixture('out/input.copyright.js'));

          assert.equal(prod.filename, '/tmp/input.min.js');
          assert.ok(fs.existsSync(prod.filename));
          assert.equal(fs.readFileSync(prod.filename, 'utf8'), readFixture('out/input.copyright.min.js'));

          done();
        }
      });
    });
  });

  suite('source', function() {
    
    test('should return error if no filename when using source', function(done) {
      dist({
        source: readFixture('input.js'),
        complete: function(err, dev, prod) {
          assert.notEqual(err, null);
          done();
        }
      });
      
    });

    test('pass in source and filename, should generate dev and prod versions', function(done) {
      dist({
        source: readFixture('input.js'),
        filename: 'input.js',
        complete: function(err, dev, prod) {

          assert.equal(typeof dev, 'object');
          assert.equal(dev.filename, 'input.js');
          assert.equal(dev.source, readFixture('out/input.js'));

          assert.equal(typeof prod, 'object');
          assert.equal(prod.filename, 'input.min.js');
          assert.equal(prod.source, readFixture('out/input.min.js'));

          done();
        }
      });
    });

    test('copyright', function(done) {
      dist({
        source: readFixture('input.js'),
        filename: 'input.js',
        copyright: fixtureCopyright,
        complete: function(err, dev, prod) {

          assert.equal(typeof dev, 'object');
          assert.equal(dev.filename, 'input.js');
          assert.equal(dev.source, readFixture('out/input.copyright.js'));

          assert.equal(typeof prod, 'object');
          assert.equal(prod.filename, 'input.min.js');
          assert.equal(prod.source, readFixture('out/input.copyright.min.js'));

          done();
        }
      });
    });
    
    test('out', function(done) {
      dist({
        source: readFixture('input.js'),
        filename: 'input.js',
        out: '/tmp/',
        copyright: fixtureCopyright,
        complete: function(err, dev, prod) {

          assert.equal(dev.filename, '/tmp/input.js');
          assert.ok(fs.existsSync(dev.filename));
          assert.equal(fs.readFileSync(dev.filename, 'utf8'), readFixture('out/input.copyright.js'));

          assert.equal(prod.filename, '/tmp/input.min.js');
          assert.ok(fs.existsSync(prod.filename));
          assert.equal(fs.readFileSync(prod.filename, 'utf8'), readFixture('out/input.copyright.min.js'));

          done();
        }
      });
    });
  });
  
  
  

  
});


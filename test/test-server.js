var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {

  it('should list items on GET', function (done) {
    chai.request('http://localhost:3000')
      .get('/items')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].id.should.be.a('number');
        res.body[0].name.should.be.a('string');
        res.body[0].name.should.equal('Broad beans');
        res.body[1].name.should.equal('Tomatoes');
        res.body[2].name.should.equal('Peppers');
        done();
      });
  });

  it('should add an item on POST', function () {
    chai.request('http://localhost:3000')
      .post('/items')
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].id.should.be.a('number');
        res.body[0].name.should.be.a('string');

        done();
      });
  });

  it('should edit an item on put', function () {
    chai.request('http://localhost:3000')
      .put('/items')
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].id.should.be.a('number');
        res.body[0].name.should.be.a('string');
        done();
      });
  });

  it('should delete an item on delete', function () {
    chai.request('http://localhost:3000')
      .delete('/items')
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].id.should.be.a('number');
        res.body[0].name.should.be.a('string');
        done();
      });
  });
});

exports.app = app;
exports.storage = storage;
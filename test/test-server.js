global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);


describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({ name: 'Broad beans' }, function() { console.log(1) });
            Item.create({ name: 'Peppers' }, function() { console.log(2) });
            Item.create({ name: 'Tomatoes' }, function() { console.log(3) });
            done();
        });
    });
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                console.log(res.body);
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                done();
            });
    });
    // it('should add an item on POST', function(done) {
    //     chai.request(app)
    //         .post('/items')
    //         .send({
    //             'name': 'Kale'
    //         })
    //         .end(function(err, res) {
    //             should.equal(err, null);
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('name');
    //             res.body.should.have.property('id');
    //             res.body.name.should.be.a('string');
    //             res.body.id.should.be.a('number');
    //             res.body.name.should.equal('Kale');
    //             storage.items.should.be.a('array');
    //             storage.items.should.have.length(4);
    //             storage.items[3].should.be.a('object');
    //             storage.items[3].should.have.property('id');
    //             storage.items[3].should.have.property('name');
    //             storage.items[3].id.should.be.a('number');
    //             storage.items[3].name.should.be.a('string');
    //             storage.items[3].name.should.equal('Kale');
    //             done();
    //         });
    // });
    // it('should edit an item on put');
    // it('should delete an item on delete');
    // it('POST to an ID that exists');
    // it('POST without body data');
    // it('POST with something other than valid JSON');
    // it('PUT without an ID in the endpoint');
    // it('PUT with different ID in the endpoint than the body');
    // it('PUT to an ID that doesn\'t exist');
    // it('PUT without body data');
    // it('PUT with something other than valid JSON');
    // it('DELETE an ID that doesn\'t exist');
    // it('DELETE without an ID in the endpoint');
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});
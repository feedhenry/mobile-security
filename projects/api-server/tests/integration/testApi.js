const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const bluebird   = require('bluebird');
const assert     = require('assert');
const request = require('supertest');
const routes = require('../../routes');

mongoose.Promise = bluebird;
const mongodbrul = 'mongodb://localhost:27017/testapp';

describe('test apis', () => {
  let noteId;
  const app = express();

  before((done) => {
    mongoose.connect(mongodbrul)
      .then(() => {
        mongoose.connection.db.dropDatabase();
      })
      .then(() => {
        app.use(bodyParser.json());
        app.use('/', routes);
        done();
      });
  });

  it('should return empty notes', (done) => {
    request(app)
      .get('/note')
      .expect(200)
      .expect( (res) => {
        assert.equal(res.body.length, 0);
      })
      .end(done);
  });

  it('should create note', (done) => {
    request(app)
      .post('/note')
      .send({ title: 'test', body: 'test' })
      .expect(201)
      .end((err) => {
        if (err) {
          return done(err);
        }
        request(app)
          .get('/note')
          .expect(200)
          .expect( (res) => {
            assert.equal(res.body.length, 1);
            noteId = res.body[0]._id;
          })
          .end(done);
      });
  });

  it('should read note', (done) => {
    request(app)
      .get(`/note/${noteId}`)
      .expect(200)
      .expect( (res) => {
        assert.equal(res.body.title, 'test');
      })
      .end(done);
  });

  it('should upate note', (done) => {
    request(app)
      .put(`/note/${noteId}`)
      .send({ title: 'updated' })
      .expect(204)
      .end( (err) => {
        if (err) {
          return done(err);
        }
        request(app)
          .get(`/note/${noteId}`)
          .expect(200)
          .expect((res) => {
            assert.equal(res.body.title, 'updated');
          })
          .end(done);
      });
  });

  it('should delete note', (done) => {
    request(app)
      .delete(`/note/${noteId}`)
      .expect(204)
      .end( (err) => {
        if (err) {
          return done(err);
        }
        request(app)
          .get(`/note/${noteId}`)
          .expect(404)
          .end(done);
      });
  });

});

/* global describe, it, expect, afterEach, beforeAll */
'use strict';

const request = require('supertest');
const app = require('../../../app/index').listen();
const review = require('./review.meta');
const { signIn } = require('../signInCallback');

let cookie;
const route = '/review';

beforeAll((done) => {
  signIn(app)
    .then(_cookie => {
      cookie = _cookie;
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('POST ' + route, () => {
  it('should return not authenticated 401', async () => {
    const response = await request(app).post(route)
      .send(review);
    expect(response.status).toEqual(401);
  });

  it('should create a review 201', async () => {
    const response = await request(app).post(route)
      .send(review)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });

  it('should return bad request 400', async () => {
    const modified = { ...review, description: 10 };
    const response = await request(app).post(route)
      .send(modified)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });
});
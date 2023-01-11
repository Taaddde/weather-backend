const fastify = require('fastify');
const request = require('supertest');
const { faker } = require('@faker-js/faker');
require('should');
require('dotenv').config()

const { WeatherRoute } = require('../src/routes');

const handleFakeIp = (req, reply, next) => {
    Object.defineProperty(req, 'ip', { value: req.headers['x-forwarded-for'] });
    next();
}

describe('GET /location', () => {
    let app;

    beforeAll(async () => {
        app = fastify();
        app.addHook('onRequest',handleFakeIp);
        WeatherRoute(app);
        await app.listen({port: 0});
    });

    afterAll(async () => { await app.close() });

    test('Correctly detects the location by ipv4', async () => {
        const fakeIp = faker.internet.ipv4();
        const response = await request(app.server)
            .get('/location')
            .set('x-forwarded-for', fakeIp)

        response.statusCode.should.be.exactly(200);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.have.property('data');
        response.body.data.status.should.equal('success');
    });

    test('Correctly detects the location by ipv6', async () => {
        const fakeIp = faker.internet.ipv6();
        const response = await request(app.server)
            .get('/location')
            .set('x-forwarded-for', fakeIp)

        response.statusCode.should.be.exactly(200);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.have.property('data');
        response.body.data.status.should.equal('success');
    });

    test('Failure to detect a location with the wrong ip', async () => {
        const fakeIp = '010001011100101';
        const response = await request(app.server)
            .get('/location')
            .set('x-forwarded-for', fakeIp)

        response.statusCode.should.be.exactly(404);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.data.status.should.equal('fail');
    });
})

describe('GET /current/:city', () => {
    let app;

    beforeAll(async () => {
        app = fastify();
        WeatherRoute(app);
        app.addHook('onRequest',handleFakeIp);
        await app.listen({port: 0});
    });

    afterAll(async () => { await app.close() });

    test('Correctly current return data with city', async () => {
        const fakeCity = faker.address.cityName();
        const response = await request(app.server).get(`/current/${fakeCity}`);

        response.statusCode.should.be.exactly(200);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.have.property('data');
        response.body.data.should.have.property('weather');
        response.body.data.should.have.property('main');
    });

    test('Correctly current return data without city', async () => {
        const fakeIp = faker.internet.ipv6();
        const response = await request(app.server).get(`/current`).set('x-forwarded-for', fakeIp);

        response.statusCode.should.be.exactly(200);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.have.property('data');
        response.body.data.should.have.property('weather');
        response.body.data.should.have.property('main');
    });

    test('Failure current with wrong city', async () => {
        const fakeCity = 'Gotham City';
        const response = await request(app.server).get(`/current/${fakeCity}`);

        response.statusCode.should.be.exactly(404);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
    });
})

describe('GET /forecast/:city', () => {
    let app;

    beforeAll(async () => {
        app = fastify();
        WeatherRoute(app);
        app.addHook('onRequest',handleFakeIp);
        await app.listen({port: 0});
    });

    afterAll(async () => { await app.close() });

    test('Correctly forecast return data with city', async () => {
        const fakeCity = 'Montevideo';
        const response = await request(app.server).get(`/forecast/${fakeCity}`);

        response.statusCode.should.be.exactly(200);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.have.property('data');
        response.body.data.should.have.property('list');
        response.body.data.list.length.should.be.above(1);
    });

    test('Correctly forecast return data withouth city', async () => {
        const fakeIp = faker.internet.ipv6();
        const response = await request(app.server).get(`/forecast`).set('x-forwarded-for', fakeIp);

        response.statusCode.should.be.exactly(200);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.have.property('data');
    });

    test('Failure forecast with wrong city', async () => {
        const fakeCity = 'Azkaban';
        const response = await request(app.server).get(`/forecast/${fakeCity}`);

        response.statusCode.should.be.exactly(404);
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
    });
})
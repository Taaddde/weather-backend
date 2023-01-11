require('dotenv').config()
const fastify = require('fastify')
const fp = require('fastify-plugin');

const { WeatherRoute } = require('./routes')

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(WeatherRoute, { prefix: '/v1' })

    return app;
};

module.exports = { build };
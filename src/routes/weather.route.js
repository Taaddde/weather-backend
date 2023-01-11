const { WeatherController } = require('../controllers');


module.exports = (fastify, _, done = () => {}) => {
    fastify.get('/location', WeatherController.getLocation);
    fastify.get('/current/:city?', WeatherController.getCurrent);
    fastify.get('/forecast/:city?', WeatherController.getForecast);
      
    done();
};
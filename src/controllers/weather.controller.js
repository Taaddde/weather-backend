const { IpService, WeatherService } = require('../services')

const getLocation = async (req, res) => {
    const data = await IpService.getData(req.ip)

    res.send({ data });
};

const getCurrent = async (req, res) => {
    const { city } = req.params;
    let data = {};
    if (city) {
        data = await WeatherService.getCurrentByCity(city);
    } else {
        const { lat, lon } = await IpService.getData(req.ip);
        data = await WeatherService.getCurrentByCoords(lat, lon);
    }

    res.send({ data });
};


const getForecast = async (req, res) => {
    const { city } = req.params;
    let data = {};
    if (city) {
        data = await WeatherService.getForecastByCity(city);
    } else {
        const { lat, lon } = await IpService.getData(req.ip);
        data = await WeatherService.getForecastByCoords(lat, lon);
    }

    res.send({ data });
};

module.exports = {
    getLocation,
    getCurrent,
    getForecast
}
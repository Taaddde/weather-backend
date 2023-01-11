const getData = async (ip) => {
    const url = `http://ip-api.com/json/${ip}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

module.exports = {
    getData,
}
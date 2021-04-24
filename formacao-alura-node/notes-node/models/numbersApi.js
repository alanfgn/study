const axios = require('axios')

class NumbersApi {

    async getFactAboutId(id) {
        const { data } = await axios.get(`http://numbersapi.com/${id}`) 
        return data
    }
}

module.exports = new NumbersApi()
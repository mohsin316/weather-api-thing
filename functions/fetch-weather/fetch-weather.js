// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

//?acces_key="123"&query=1234,123&forecast_days=4

const axios = require('axios')

const handler = async (event) => {
  /*try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }*/
const {lat, long} = event.queryStringParameters;

const API_SECRET = process.env.API_SECRET
const url = `http://api.weatherstack.com/current?access_key=${API_SECRET}&query=${lat},${long}&forecast_days=4`

try {
  const {data} = await axios.get(url)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }

} catch (err) {
    const {status, statusText, headers, data} = error.respnse
    return {
      statusCode: status,
      body: JSON.stringify({status,statusText,headers,data})
    }
  }
}

module.exports = { handler }

const got = require('got');

async function lookupToken(tokenHeader) {
  const response = await got({
    url: 'http://127.0.0.1:8200/v0.1/auth/token/lookup-self',
    method: 'GET',
    headers: {
      'my-token': tokenHeader,
    },
    responseType: 'json',
  });
  return {
    timings: response.timings,
    statusCode: response.statusCode,
    statusMessage: response.statusMessage,
    body: response.body,
  };
}

module.exports = { lookupToken };

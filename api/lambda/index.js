const querystring = require('querystring');
const handleRequest = require('./http-request.js');
const handleReturn = require('./handle-return.js');

const baseUrl = 'query2.finance.yahoo.com';
const basePath = '/v8/finance/chart/';

exports.handler = async (event, context, callback) => {
  try {
    const params = event.rawQueryString;
    const obj = querystring.parse(event.rawQueryString);

    if (!params) {
      handleReturn.do(
        400,
        {
          message: `Missing params`
        },
        callback
      );
      return;
    }

    const resp = await handleRequest.doCall(
      'GET',
      baseUrl,
      encodeURI(`${basePath}${obj.symbol}?${params}`)
    );

    handleReturn.do(
      200,
      {
        ...resp,
        page: {
          number: 0,
          size: 999,
          totalElements: [].length,
          totalPages: 1
        }
      },
      callback
    );
  } catch (e) {
    handleReturn.do(
      400,
      {
        message: e
      },
      callback
    );
  }
};

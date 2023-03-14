const https = require('https');

exports.doCall = function (method, url, path, obj, headers = {}) {
  return new Promise((resolve, reject) => {
    const jsonObject = JSON.stringify(obj);
    headers = {
      ...headers,
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
      'Content-Type': 'application/json'
    };
    if (obj) {
      headers = {
        ...headers,
        'Content-Length': jsonObject.length
      };
    }

    const options = {
      hostname: url,
      port: 443,
      path,
      method,
      headers
    };
    const req = https.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(res.statusMessage);
      }
      let body = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('end', () => {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    if (obj) {
      req.write(jsonObject);
    }
    req.end();
  });
};

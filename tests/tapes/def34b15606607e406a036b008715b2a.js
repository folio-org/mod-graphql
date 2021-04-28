var path = require("path");

/**
 * GET /item-storage/items?query=barcode=(4539876054383 or 765475420716)
 *
 * accept: application/json
 * content-type: application/json
 * x-okapi-tenant: diku
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjUzMDAwZTM5LTliM2ItNWM2My1hYjE3LTcwMmJkMWM3ZGQ2MyIsImlhdCI6MTYxOTYwODU3OSwidGVuYW50IjoiZGlrdSJ9.qW59id7B4ijLBGZWBwiQ-LLXLHbkF_PHoCexhoMar5M
 * user-agent: node-fetch/1.0 (+https://github.com/bitinn/node-fetch)
 * accept-encoding: gzip,deflate
 * connection: close
 * host: folio-snapshot-okapi.dev.folio.org
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Wed, 28 Apr 2021 15:09:47 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "close");
  res.setHeader("vary", "origin");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-inventory-storage-20.3.0-SNAPSHOT.568 http://10.36.1.221:9134/item-storage/items.. : 200 5703us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQyixJzS1WslKI5gIAAAD//5xTy27bMBD8lUDXmgGfoqhbqqKAgcQp2vRUFAUfy5qIXqBkF0aQf+9KDVyjj0OrAw/kzs7szOqpSKGoC6mMjdZZopwwRJZVIIZqTsCxslJAQ4iy2BRfjpCnNPRFLTbFPq/QpRc9f4xh2X5oQ+q/Tu/BDzlsl6pSUcGZYkQYq4j0EElVMUqUUBScYKWgFJFxyB3kbUBxnz5vCmezHwIgXpdKaiU51azEOogR/JyO8GEP7RG57nOAjHWXb41t292hc5CboRuHHvoZ+z4V/nyPgLtmd/V22zxs73fF86Y4gc2NHed1yEVCP8zwosan7A+tXd52P2+n2c6HtW9vu0XqzTebZpR0NSb/eBhRUbDz8sApZ4RKwqsHxmppai6vJZevKK1xeCTvsC4n2z6cRlhdUwCMBcNI1FARWbFAHNWGlCpoWqmKe++x/wi5s8t4t4Ptz2DujPSlQLC3mGllOLFaUEIFgOIGXeIawRjfOGSbT7eDX2f7wSx8NKqMxLMQiWTUkcqBJVxHzZDWak8vvf4vcIvYPPTJ33gP04WfaZoTptRg9udd6GC2aKRdE8yAVoU3v/lKRc1ordS11uLF101xGMOfqy9S4L9Wvz59nJZNXMfBxQb8L4wTjij0lFjHNNGUu8C8", "base64"));
  res.write(new Buffer("DqEUS3ytneZmD/5x2y8ilzYPqfsbJ5XlmROZjsnDuyH180oprMR8eSDSRDxCxOxYxOCBl5LZEgyLxepVjHewrPI/KH3+DgAA//8=", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("3JQ/S4QxDIe/SnHv0Tbpnzh6k9O93ObYtCkcHOokOPjdTUXPE84XFCfHliYp5Pc879j3NHLzin0NkBX7KJZQuh2QdQK3hNy/YB++w95dxn5w5uyGt1xIA0wBbSXNsxNkjWZgjmMNe4xAJScXEQqscb/sDeqzZG4xlmJuMpJRW/hktrvlznj4sRiW/ey3Oes32110RHt4fD7VbfVg5rj7t5vdWA7Spiyuphp/oZOnejhWPspFkZwCX5xbEYmvERnVBUFQiZzJolZ1200kpUZV7fCHIjkrlqJ218RaYP00wkxySGR7J/CucehO/q2FPpeyYqH5OlyD2ySfP1b48goAAP//", "base64"));
  res.write(new Buffer("itUB1dMl+SWJOZDsBKqujXS4AAAAAP//", "base64"));
  res.write(new Buffer("UlAqSi0uzSnxzEvLB4pUoykB5s+0xOTUEqhrUzIT0/PyQd4AC9Ry1QIAAAD//wMAzIBxDv8HAAA=", "base64"));
  res.end();

  return __filename;
};

var path = require("path");

/**
 * GET /holdings-storage/holdings?limit=10&query=instanceId=="7fbd5d84-62d1-44c6-9c45-6cb173998bbd"
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

  res.setHeader("date", "Wed, 28 Apr 2021 15:09:46 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "close");
  res.setHeader("vary", "origin");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-inventory-storage-20.3.0-SNAPSHOT.568 http://10.36.1.221:9134/holdings-storage/holdings.. : 200 2892us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQysjPScnMSy8OSk3OL0opVrJSiOYCAAAA//+ckUtLAzEUhf9KydamJJlkZjI7H4gDImLdiUgeNzgwLzJpEUr/u3dKq4IUxCyyuJzv3JyTHWk8qUiwhS1Y4NSWuqRSC0mN1pwykDbPuLBWBbIkb1uIUzP0pOJL8h4P6OzKvo9CWRhiB7GeV7y8LknTT8n0DupZXgTrlS8lzYXnVEqXU+2kormzvMi0Lq31aDFC7EwPfbofnEm48gCrzAWt8kAd94FKziwtLRgqilBw4ZwpHEMYQgCXmi38C26RjUPfuEvnYDpmcKZtHzadhYhOj085U/mqlqosF1eF1AvBeI5sPyQ4Aqey18kk6DDI2fntEOvew8d5EhXrzTi2P32w0tRMqcGHXQ8evso+0TWyx5E1Ee5+jztIxptkSLUjLgIu8zd4YT7BBH69pKJ8ZlnFWaXUCqNeMFaxuaLN6P+s3u8/AQAA//8=", "base64"));
  res.write(new Buffer("0uECAAAA///s0rENwCAMRNGJLBljjBkHDN6C3UMRKU0ikSJd+jvpF+9EJskaNUfobASsKqC1I7QsHlrNqUvYQ8ZfInPrwjYCSClpZa5gZRygxb0SqcYcHpHtnn9kd2wE4wtk13rOAwAA//8=", "base64"));
  res.write(new Buffer("itUBlXAl+SWJOYjizUiHCwAAAP//", "base64"));
  res.write(new Buffer("UlAqSi0uzSnxzEvLB4pUoykxAqajxORUmH9TMhPT8/JBHgYL1HLVAgAAAP//AwDJNk9iOQUAAA==", "base64"));
  res.end();

  return __filename;
};

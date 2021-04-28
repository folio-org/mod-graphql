var path = require("path");

/**
 * GET /item-storage/items?query=barcode=1*
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

  res.setHeader("date", "Wed, 28 Apr 2021 15:09:48 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "close");
  res.setHeader("vary", "origin");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-inventory-storage-20.3.0-SNAPSHOT.568 http://10.36.1.221:9134/item-storage/items.. : 200 4208us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQyixJzS1WslKI5gIAAAD//5xU227jNhD9FUGvDW3eRJF+S71bIGj2gq77UCyKYkQOY2FlUZBkp0aQf+9QuWyy3T5sbUCQhHPODM+c0V3ZhnJT1lLIBgwwG3xkugLBGnTAYgSwuvZaS1VelH+dcJza1JcbUV2U+3HhZjH+/BOacPvUhba/mX5Dn8ZwlVGoYjRCKdY4kEwH7RkI71jwwpo66BCFI2ZM4wHHq0Ddff7zomxg9Ckg8QWnPwEwRvRze8JPe+xOVOTDGHAkwO7XQleCVytrraiKy8oWWnKui192xbu3l2/eFtsPH/8ohCSR3PI1nrDbQte9Px6aR4UX/NWi8ErgZfWvxG06DKnHfqaW70r/g4LzecDFn0pIUSuoWRO4Y9pxZE1dKybqYFWUjVERy3vqoD+SQTAvUyhJwe/H1Kcu3Zwfns8I4xaGB0D20Kfh/NzSlh6KbEGfZnw02bejP3aL5Puvb6cZ5uNyph4OeQKXJ2g7aDokdoA5v5JcCsY1k3Yn9EZVG65WTqifON9wnrs9EG5sods9HVNApRutBJOoc9BkYM4D0gXRGO/AutzdgOMBsqnXCfpnsmyc9obI0QN5RFAGteKMK8RKOpqNrF+T/XKqhRx9MNqjYMa5isiRM6vJZUs8kNJaVb/K1/8id8SlcbT+0nucspN35XFsSWE/z8Nmvb69vV11ya9u0mlN+qEd13Pya/TtwGth15SPmkuupVvt50NHml3bf9nh3zNpXNPtVMCLOTz5O30aSCK2/ikYuwwoUix86uclnOTLselan0f8PUCR+u5MqBEfojDt22E5u6J58Yq8lpiT2WjLHHDPuFEmGNO42Kjy/jEx7TRTE92WlvZhicumcsZ6h8yH4GnitWHOoWIWDQcMtuEhlMQ+4AwUK1i2aEQ6WHjzr5RxtRF8U9FOOf2YsovyOITvo19kUnyL/vn8+5Q/NMQAbWxtXU0h9DXTgJg/UpFJ7kXEUGm0Moe5g2ne7tF/uepzk1lm1x7+q6at7HNNqnRqPX5MbT8/eAqa2xx+7SJdQqQki+iYQWm0AINOxHJxNMZ3mHf3Bzq9/wcAAP//", "base64"));
  res.write(new Buffer("itUBFfIl+SWJOZASGFTWG+pwAQAAAP//", "base64"));
  res.write(new Buffer("UgBGbnFpTolnXlo+UKQaTYkhsPhNTE4tgRYAKZmJ6Xn5oPgEC9Ry1QIAAAD//wMA80lhUzwGAAA=", "base64"));
  res.end();

  return __filename;
};

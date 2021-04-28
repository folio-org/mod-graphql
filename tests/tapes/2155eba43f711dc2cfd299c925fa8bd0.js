var path = require("path");

/**
 * GET /instance-storage/instances/7fbd5d84-62d1-44c6-9c45-6cb173998bbd
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
  res.setHeader("x-okapi-trace", "GET mod-authtoken-2.8.0-SNAPSHOT.89 http://10.36.1.221:9178/instance-storage/instances/7fbd5d84-62d1-44c6-9c45-6cb173998bbd : 202 14781us, GET mod-inventory-storage-20.3.0-SNAPSHOT.568 http://10.36.1.221:9134/instance-storage/instances/7fbd5d84-62d1-44c6-9c45-6cb173998bbd : 200 3308us");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAIxW227bRhB9z1cM9NIWFRWSIinRfQgcO0bci20k7kNRFMVyd1baeLXL7i6tEEH+vcObQgUtED8Y1syeuZ458qcXAAslFnABi42sRC62WVSkIomyjBdRybM8KniVbNZlua0qsVh2gL+f0XllTQdLesvejUGU8SH+8lMMAG8bx7F/cHP/6+39YA0q6MH4muA7DPCzNei/8/CaVe0FhD2CUMwp9AOA6YDOsKCe8bHD+g78J/zVO1GoQDWNtsWNcj7A5QGd4szAm8G7GB977KPO4EqgCUoq6mwwfyIr2Z+ZboYiLTdlXhRpXhZJX88Z6rGt8XaYQS6SIpNZFcVVkkcZZmnEcJNHXHK5zdfJlolyQfjPY2puTXCqaoL9Krdhh3FoCrVQZreEt6jRTNlnwDt6OishrUra3zqJJGdllG1LKmGzjqN4jZinpZSYsnkJvqk+IA/T8Po9LGFcy2IJiweHO8NMgKM9dAXA4o3ZaWZE9+fb5mCdbTxIxfspk+2aFteeDFOnmnlP4+Jstqqx2XPfXXOo0PW9PLwr4rxY3Wb5dnvq/OzxrHGOyaZgHCOWrzHKqkxEjG3LaJPmKDZVioLxeeN1U+kxylk1vd3vxxIutXQo4HIFvxhby6mKWrOR1Xd4hD+se5o8ggW8lw/nwRdpnBT/k/zG4T8NGt6OG7gEOVlAoOdO1fNBzpDvmNnhCTVzgBs843lo2q+zRvFLztGfz75xqi9wH0J98fLl8XhcSauVXVm3ezn1pJV5esSPoX/55hQOHA7nDd+zRigLPjhkB2LrDxPyQNNwimn/vkZ+2towOPuM+jTPvvg7G4ahDoVCsDAElorkYja+TmuY4XPeE+VJvDZpJGMuoyyWRVSlGxGVkm0lMrlep8P2TuAb66i8W3EuBmfOM1e9bz01oK+/LGW6mjQpoWY79PATpDHww2oaPh3Kruk840s0u8llqNuvrn7q/0wVqXsjPBAjPWoJjcGPNMyAQrdQT8fJQi+atOtn0qU97GkxK3hrj/TZLTswfLCtbPQEIXYpD8LSumhHAqoWKBlw13DaF5C0ADs+HZkTQGT0Pa2i6Li3HaxLJRn9dq/gyjZagApQIWU11rFK45Koy6mQJVBPnQH2zYHE2KndPnjQ7Nh2Zf3G3BNcM8fbV3BPnyk0BeJ75g695h1VCO0SSGyIC4Fp3Z9ETVvoc1wzQ/IIVxoZdflqIhNtUMp7o/uLkkQ+nDR7XG7Hszl1WJqv12wTZQJTUu0ii7ZZUUTxJuOpZOU63p4rh8NnRaKnW9LkPkRwDQ5q2qV+39T0ZDi0k0coz4nxrv1PL+GCoiETva6swK9I2Xkb/3vdaYu4ZiNJ0jhNojiL0u1jvL5I4os8W5V5+WP37Tsw/YCBEYZ1zyetpQv9tiAXY5ROJL45cwfqJjX8a2D7ry7/Drl1wqfzloh0jSOhvKIvMuLJI7rDl6ZffP4XAAD//wMAt7rLYJ4IAAA=", "base64"));
  res.end();

  return __filename;
};

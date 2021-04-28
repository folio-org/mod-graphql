var path = require("path");

/**
 * GET /holdings-storage/holdings?limit=10&query=id=="65032151-39a5-4cef-8810-5350eb316300"
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
  res.setHeader("x-okapi-trace", "GET mod-inventory-storage-20.3.0-SNAPSHOT.568 http://10.36.1.221:9134/holdings-storage/holdings.. : 200 2398us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQysjPScnMSy8OSk3OL0opVrJSiOYCAAAA//+ckl9rgzAUxb9KyevMSDRR69voKBO67qF9G2NckysTNEpMy6D0u+9a2u5hHYz5EPBwfufc/DmwxrKCpVoksdSSJ3PQXBmseZ5LwXWiBVaJTBMhWMTe9+jHpneskBH78Cd0ShXfX0q2uvcd+nKqeH2LWOPGAM5gOdnrREKSWuS1qXOuVD3neUZ1oLUVKdhYAlLEgL4Dhy6segOBKk9wFSuZpcpwqdKUK5SWg4hzPkXmCrSFPCMY6xpNaPb4L7gl1veuMQ/G4Hjeg4G2Xe+6Cj0lPS/Ws2W52JYvawJcH/DsupzwJkDAjqaf9AMbL7/ErhqHM1mxY3RDj0m/GbPsfeksfv5eRI7Nbhjaay25pvxmDA0Nv+gtXi/kQpfEnqUKPD79lDsMYCEAKw7MeKQy+0gLzRuLWHKheJxvRVJIUWh9r7PsToji9FR2g/2z+3j8AgAA//8=", "base64"));
  res.write(new Buffer("itUBJdCS/JLEHETqNNThAgAAAP//", "base64"));
  res.write(new Buffer("UlAqSi0uzSnxzEvLB4pUoykBpsK0xORUmH9TMhPT8/JBHgYL1HLVAgAAAP//AwCyViDR+AIAAA==", "base64"));
  res.end();

  return __filename;
};

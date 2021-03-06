var path = require("path");

/**
 * GET /holdings-storage/holdings?query=id=="686a51c1-86a1-4b0d-9b53-97f0ef2b4058"
 *
 * accept: application/json
 * content-type: application/json
 * x-okapi-tenant: diku
 * x-okapi-token: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjEzODUxYzU3LThhNmMtNWQ0My05ZWYyLTg4MDgyOGExZWQ3NCIsInRlbmFudCI6ImRpa3UifQ.qpCtUVZPF_TPanLQNSBMR6Ypi6hlYfHqxhENJohDwAPUn3yS0R2Mj5HLGamznn7kqgq19k0qpt368J60EytJAQ
 * accept-encoding: gzip,deflate
 * user-agent: node-fetch/1.0 (+https://github.com/bitinn/node-fetch)
 * connection: close
 * host: localhost:9130
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("x-okapi-trace", "GET mod-authtoken-1.4.1-SNAPSHOT.21 http://10.0.2.15:9131/holdings-storage/holdings.. : 202 2829us, GET mod-inventory-storage-11.0.0-SNAPSHOT.114 http://10.0.2.15:9139/holdings-storage/holdings.. : 200 8365us");
  res.setHeader("content-type", "application/json");
  res.setHeader("accept", "application/json");
  res.setHeader("x-okapi-tenant", "diku");
  res.setHeader("accept-encoding", "gzip,deflate");
  res.setHeader("user-agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
  res.setHeader("host", "localhost:9130");
  res.setHeader("x-okapi-request-id", "434886/holdings-storage");
  res.setHeader("x-okapi-url", "http://10.0.2.15:9130");
  res.setHeader("x-okapi-permissions", "[\"inventory-storage.holdings.collection.get\"]");
  res.setHeader("x-okapi-user-id", "13851c57-8a6c-5d43-9ef2-880828a1ed74");
  res.setHeader("x-okapi-token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjEzODUxYzU3LThhNmMtNWQ0My05ZWYyLTg4MDgyOGExZWQ3NCIsInRlbmFudCI6ImRpa3UifQ.qpCtUVZPF_TPanLQNSBMR6Ypi6hlYfHqxhENJohDwAPUn3yS0R2Mj5HLGamznn7kqgq19k0qpt368J60EytJAQ");
  res.setHeader("connection", "close");
  res.setHeader("transfer-encoding", "chunked");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ewogICJob2xkaW5nc1JlY29yZHMiIDogWyB7CiAgICAiaWQiIDogIjY4NmE1MWMxLTg2YTEtNGIwZC05YjUzLTk3ZjBlZjJiNDA1OCIsCiAgICAiaW5zdGFuY2VJZCIgOiAiNjkyMmEyNmItMjgzMS00NGJhLTkzYTctNjNiM2Y5NmQ0NWFlIiwKICAgICJwZXJtYW5lbnRMb2NhdGlvbklkIiA6ICJmY2Q2NGNlMS02OTk1LTQ4ZjAtODQwZS04OWZmYTIyODgzNzEiLAogICAgImhvbGRpbmdzU3RhdGVtZW50cyIgOiBbIF0sCiAgICAibWV0YWRhdGEiIDogewogICAgICAiY3JlYXRlZERhdGUiIDogIjIwMTgtMDUtMDNUMDI6NDA6MzYuMzQ4KzAwMDAiLAogICAgICAiY3JlYXRlZEJ5VXNlcklkIiA6ICIxMzg1MWM1Ny04YTZjLTVkNDMtOWVmMi04ODA4MjhhMWVkNzQiLAogICAgICAidXBkYXRlZERhdGUiIDogIjIwMTgtMDUtMDNUMDI6NDA6MzYuMzQ4KzAwMDAiLAogICAgICAidXBkYXRlZEJ5VXNlcklkIiA6ICIxMzg1MWM1Ny04YTZjLTVkNDMtOWVmMi04ODA4MjhhMWVkNzQiCiAgICB9CiAgfSBdLAogICJ0b3RhbFJlY29yZHMiIDogMQp9", "base64"));
  res.end();

  return __filename;
};

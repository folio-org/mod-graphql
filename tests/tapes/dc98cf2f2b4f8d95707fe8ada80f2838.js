var path = require("path");

/**
 * GET /holdings-storage/holdings?query=instanceId=="7fbd5d84-62d1-44c6-9c45-6cb173998bbd"
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

  res.setHeader("x-okapi-trace", "GET mod-authtoken-1.4.1-SNAPSHOT.21 http://10.0.2.15:9131/holdings-storage/holdings.. : 202 1957us, GET mod-inventory-storage-11.0.0-SNAPSHOT.114 http://10.0.2.15:9139/holdings-storage/holdings.. : 200 4979us");
  res.setHeader("content-type", "application/json");
  res.setHeader("accept", "application/json");
  res.setHeader("x-okapi-tenant", "diku");
  res.setHeader("accept-encoding", "gzip,deflate");
  res.setHeader("user-agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
  res.setHeader("host", "localhost:9130");
  res.setHeader("x-okapi-request-id", "726572/holdings-storage");
  res.setHeader("x-okapi-url", "http://10.0.2.15:9130");
  res.setHeader("x-okapi-permissions", "[\"inventory-storage.holdings.collection.get\"]");
  res.setHeader("x-okapi-user-id", "13851c57-8a6c-5d43-9ef2-880828a1ed74");
  res.setHeader("x-okapi-token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjEzODUxYzU3LThhNmMtNWQ0My05ZWYyLTg4MDgyOGExZWQ3NCIsInRlbmFudCI6ImRpa3UifQ.qpCtUVZPF_TPanLQNSBMR6Ypi6hlYfHqxhENJohDwAPUn3yS0R2Mj5HLGamznn7kqgq19k0qpt368J60EytJAQ");
  res.setHeader("connection", "close");
  res.setHeader("transfer-encoding", "chunked");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ewogICJob2xkaW5nc1JlY29yZHMiIDogWyB7CiAgICAiaWQiIDogIjY1Y2IyYmYwLWQ0YzItNDg4Ni04YWQwLWI3NmYxYmE3NWQ2MSIsCiAgICAiaW5zdGFuY2VJZCIgOiAiN2ZiZDVkODQtNjJkMS00NGM2LTljNDUtNmNiMTczOTk4YmJkIiwKICAgICJwZXJtYW5lbnRMb2NhdGlvbklkIiA6ICJmY2Q2NGNlMS02OTk1LTQ4ZjAtODQwZS04OWZmYTIyODgzNzEiLAogICAgImNhbGxOdW1iZXIiIDogIlBSNjA1Ni5JNDU4OCBCNzQ5IDIwMTYiLAogICAgImhvbGRpbmdzU3RhdGVtZW50cyIgOiBbIF0sCiAgICAibWV0YWRhdGEiIDogewogICAgICAiY3JlYXRlZERhdGUiIDogIjIwMTgtMDUtMDNUMDI6Mzk6NTMuNjIxKzAwMDAiLAogICAgICAiY3JlYXRlZEJ5VXNlcklkIiA6ICIxMzg1MWM1Ny04YTZjLTVkNDMtOWVmMi04ODA4MjhhMWVkNzQiLAogICAgICAidXBkYXRlZERhdGUiIDogIjIwMTgtMDUtMDNUMDI6Mzk6NTMuNjIxKzAwMDAiLAogICAgICAidXBkYXRlZEJ5VXNlcklkIiA6ICIxMzg1MWM1Ny04YTZjLTVkNDMtOWVmMi04ODA4MjhhMWVkNzQiCiAgICB9CiAgfSwgewogICAgImlkIiA6ICJmYjdiNzBmMS1iODk4LTQ5MjQtYTk5MS0wZTRiNjMxMmJiNWYiLAogICAgImluc3RhbmNlSWQiIDogIjdmYmQ1ZDg0LTYyZDEtNDRjNi05YzQ1LTZjYjE3Mzk5OGJiZCIsCiAgICAicGVybWFuZW50TG9jYXRpb25JZCIgOiAiNTNjZjk1NmYtYzFkZi00MTBiLThiZWEtMjdmNzEyY2NhN2MwIiwKICAgICJjYWxsTnVtYmVyIiA6ICJQUjYwNTYuSTQ1ODggQjc0OSAyMDE2IiwKICAgICJob2xkaW5nc1N0YXRlbWVudHMiIDogWyBdLAogICAgIm1ldGFkYXRhIiA6IHsKICAgICAgImNyZWF0ZWREYXRlIiA6ICIyMDE4LTA1LTAzVDAyOjM5OjU2LjIyNyswMDAwIiwKICAgICAgImNyZWF0ZWRCeVVzZXJJZCIgOiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IiwKICAgICAgInVwZGF0ZWREYXRlIiA6ICIyMDE4LTA1LTAzVDAyOjM5OjU2LjIyNyswMDAwIiwKICAgICAgInVwZGF0ZWRCeVVzZXJJZCIgOiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IgogICAgfQogIH0gXSwKICAidG90YWxSZWNvcmRzIiA6IDIKfQ==", "base64"));
  res.end();

  return __filename;
};

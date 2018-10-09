var path = require("path");

/**
 * GET /item-storage/items?query=barcode=(1501666275552 or 1472383039757)
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

  res.setHeader("x-okapi-trace", "GET mod-authtoken-1.4.1-SNAPSHOT.21 http://10.0.2.15:9131/item-storage/items.. : 202 2369us, GET mod-inventory-storage-11.0.0-SNAPSHOT.114 http://10.0.2.15:9139/item-storage/items.. : 200 16337us");
  res.setHeader("content-type", "application/json");
  res.setHeader("accept", "application/json");
  res.setHeader("x-okapi-tenant", "diku");
  res.setHeader("accept-encoding", "gzip,deflate");
  res.setHeader("user-agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
  res.setHeader("host", "localhost:9130");
  res.setHeader("x-okapi-request-id", "898717/item-storage");
  res.setHeader("x-okapi-url", "http://10.0.2.15:9130");
  res.setHeader("x-okapi-permissions", "[\"inventory-storage.items.collection.get\"]");
  res.setHeader("x-okapi-user-id", "13851c57-8a6c-5d43-9ef2-880828a1ed74");
  res.setHeader("x-okapi-token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjEzODUxYzU3LThhNmMtNWQ0My05ZWYyLTg4MDgyOGExZWQ3NCIsInRlbmFudCI6ImRpa3UifQ.qpCtUVZPF_TPanLQNSBMR6Ypi6hlYfHqxhENJohDwAPUn3yS0R2Mj5HLGamznn7kqgq19k0qpt368J60EytJAQ");
  res.setHeader("connection", "close");
  res.setHeader("transfer-encoding", "chunked");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ewogICJpdGVtcyIgOiBbIHsKICAgICJpZCIgOiAiYWZkODU2NjQtZjcxMC00MzZlLWI5YTQtNTZhMzg0MDRlY2RmIiwKICAgICJob2xkaW5nc1JlY29yZElkIiA6ICI2ODZhNTFjMS04NmExLTRiMGQtOWI1My05N2YwZWYyYjQwNTgiLAogICAgImJhcmNvZGUiIDogIjE1MDE2NjYyNzU1NTIiLAogICAgInBpZWNlSWRlbnRpZmllcnMiIDogWyBdLAogICAgIm5vdGVzIiA6IFsgXSwKICAgICJzdGF0dXMiIDogewogICAgICAibmFtZSIgOiAiQXZhaWxhYmxlIgogICAgfSwKICAgICJtYXRlcmlhbFR5cGVJZCIgOiAiMWE1NGI0MzEtMmU0Zi00NTJkLTljYWUtOWNlZTY2YzlhODkyIiwKICAgICJwZXJtYW5lbnRMb2FuVHlwZUlkIiA6ICIyYjk0YzYzMS1mY2E5LTQ4OTItYTczMC0wM2VlNTI5ZmZlMjciLAogICAgIm1ldGFkYXRhIiA6IHsKICAgICAgImNyZWF0ZWREYXRlIiA6ICIyMDE4LTA1LTAzVDAyOjQwOjUxLjEyOCswMDAwIiwKICAgICAgImNyZWF0ZWRCeVVzZXJJZCIgOiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IiwKICAgICAgInVwZGF0ZWREYXRlIiA6ICIyMDE4LTA1LTAzVDAyOjQwOjUxLjEyOCswMDAwIiwKICAgICAgInVwZGF0ZWRCeVVzZXJJZCIgOiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IgogICAgfQogIH0sIHsKICAgICJpZCIgOiAiNmU1OGRmMTQtYTQ2My00ZDNmLTg1MzMtOTMzMjJhODBkMjBlIiwKICAgICJob2xkaW5nc1JlY29yZElkIiA6ICJhZGUzYWM3MS1jMjViLTQyOGMtODVkMi1mYWFiYWQwMmY3NDgiLAogICAgImJhcmNvZGUiIDogIjE0NzIzODMwMzk3NTciLAogICAgInBpZWNlSWRlbnRpZmllcnMiIDogWyBdLAogICAgIm5vdGVzIiA6IFsgXSwKICAgICJzdGF0dXMiIDogewogICAgICAibmFtZSIgOiAiQXZhaWxhYmxlIgogICAgfSwKICAgICJtYXRlcmlhbFR5cGVJZCIgOiAiMWE1NGI0MzEtMmU0Zi00NTJkLTljYWUtOWNlZTY2YzlhODkyIiwKICAgICJwZXJtYW5lbnRMb2FuVHlwZUlkIiA6ICIyYjk0YzYzMS1mY2E5LTQ4OTItYTczMC0wM2VlNTI5ZmZlMjciLAogICAgIm1ldGFkYXRhIiA6IHsKICAgICAgImNyZWF0ZWREYXRlIiA6ICIyMDE4LTA1LTAzVDAyOjQxOjAwLjI1OSswMDAwIiwKICAgICAgImNyZWF0ZWRCeVVzZXJJZCIgOiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IiwKICAgICAgInVwZGF0ZWREYXRlIiA6ICIyMDE4LTA1LTAzVDAyOjQxOjAwLjI1OSswMDAwIiwKICAgICAgInVwZGF0ZWRCeVVzZXJJZCIgOiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IgogICAgfQogIH0gXSwKICAidG90YWxSZWNvcmRzIiA6IDIKfQ==", "base64"));
  res.end();

  return __filename;
};

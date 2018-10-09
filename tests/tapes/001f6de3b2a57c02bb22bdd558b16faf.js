var path = require("path");

/**
 * GET /inventory/items?query=holdingsRecordId=="fb7b70f1-b898-4924-a991-0e4b6312bb5f"
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

  res.setHeader("x-okapi-trace", "GET mod-authtoken-1.4.1-SNAPSHOT.21 http://10.0.2.15:9131/inventory/items.. : 202 4979us, GET mod-inventory-8.0.0-SNAPSHOT.82 http://10.0.2.15:9140/inventory/items.. : 200 117043us");
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("connection", "close");
  res.setHeader("transfer-encoding", "chunked");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ewogICJpdGVtcyIgOiBbIHsKICAgICJpZCIgOiAiZDZmN2MxYmEtYTIzNy00NjVlLTk0ZWQtZjM3ZTkxYmM2NGJkIiwKICAgICJzdGF0dXMiIDogewogICAgICAibmFtZSIgOiAiQXZhaWxhYmxlIgogICAgfSwKICAgICJ0aXRsZSIgOiAiQnJpZGdldCBKb25lcydzIEJhYnk6IHRoZSBkaWFyaWVzIiwKICAgICJob2xkaW5nc1JlY29yZElkIiA6ICJmYjdiNzBmMS1iODk4LTQ5MjQtYTk5MS0wZTRiNjMxMmJiNWYiLAogICAgImJhcmNvZGUiIDogIjQ1Mzk4NzYwNTQzODMiLAogICAgInBpZWNlSWRlbnRpZmllcnMiIDogWyAiQ29weSAzIiBdLAogICAgIm5vdGVzIiA6IFsgXSwKICAgICJudW1iZXJPZlBpZWNlcyIgOiAiMSIsCiAgICAibWF0ZXJpYWxUeXBlIiA6IHsKICAgICAgImlkIiA6ICIxYTU0YjQzMS0yZTRmLTQ1MmQtOWNhZS05Y2VlNjZjOWE4OTIiLAogICAgICAibmFtZSIgOiAiYm9vayIKICAgIH0sCiAgICAicGVybWFuZW50TG9hblR5cGUiIDogewogICAgICAiaWQiIDogIjJiOTRjNjMxLWZjYTktNDg5Mi1hNzMwLTAzZWU1MjlmZmUyNyIsCiAgICAgICJuYW1lIiA6ICJDYW4gY2lyY3VsYXRlIgogICAgfSwKICAgICJ0ZW1wb3JhcnlMb2FuVHlwZSIgOiB7CiAgICAgICJpZCIgOiAiZThiMzExYTYtM2IyMS00M2YyLWEyNjktZGQ5MzEwY2IyZDBlIiwKICAgICAgIm5hbWUiIDogIkNvdXJzZSByZXNlcnZlcyIKICAgIH0sCiAgICAibWV0YWRhdGEiIDogewogICAgICAiY3JlYXRlZERhdGUiIDogIjIwMTgtMDUtMDNUMDI6NDA6MDUuMDE0KzAwMDAiLAogICAgICAiY3JlYXRlZEJ5VXNlcklkIiA6ICIxMzg1MWM1Ny04YTZjLTVkNDMtOWVmMi04ODA4MjhhMWVkNzQiLAogICAgICAidXBkYXRlZERhdGUiIDogIjIwMTgtMDUtMDNUMDI6NDA6MDUuMDE0KzAwMDAiLAogICAgICAidXBkYXRlZEJ5VXNlcklkIiA=", "base64"));
  res.write(new Buffer("OiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IgogICAgfSwKICAgICJsaW5rcyIgOiB7CiAgICAgICJzZWxmIiA6ICJodHRwOi8vbG9jYWxob3N0OjkxMzAvaW52ZW50b3J5L2l0ZW1zL2Q2ZjdjMWJhLWEyMzctNDY1ZS05NGVkLWYzN2U5MWJjNjRiZCIKICAgIH0sCiAgICAicGVybWFuZW50TG9jYXRpb24iIDogewogICAgICAiaWQiIDogIjUzY2Y5NTZmLWMxZGYtNDEwYi04YmVhLTI3ZjcxMmNjYTdjMCIsCiAgICAgICJuYW1lIiA6ICJBbm5leCIKICAgIH0KICB9IF0sCiAgInRvdGFsUmVjb3JkcyIgOiAxCn0=", "base64"));
  res.end();

  return __filename;
};

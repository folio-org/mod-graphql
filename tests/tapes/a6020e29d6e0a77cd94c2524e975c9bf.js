var path = require("path");

/**
 * GET /inventory/instances?query=id=="6922a26b-2831-44ba-93a7-63b3f96d45ae"
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

  res.setHeader("x-okapi-trace", "GET mod-authtoken-1.4.1-SNAPSHOT.21 http://10.0.2.15:9131/inventory/instances.. : 202 3179us, GET mod-inventory-8.0.0-SNAPSHOT.82 http://10.0.2.15:9140/inventory/instances.. : 200 23745us");
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("connection", "close");
  res.setHeader("transfer-encoding", "chunked");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ewogICJpbnN0YW5jZXMiIDogWyB7CiAgICAiQGNvbnRleHQiIDogImh0dHA6Ly9sb2NhbGhvc3Q6OTEzMC9pbnZlbnRvcnkvaW5zdGFuY2VzL2NvbnRleHQiLAogICAgImlkIiA6ICI2OTIyYTI2Yi0yODMxLTQ0YmEtOTNhNy02M2IzZjk2ZDQ1YWUiLAogICAgInRpdGxlIiA6ICJDb3VudHJ5IG1hZG5lc3MiLAogICAgInNvdXJjZSIgOiAiTG9jYWw6IE1PRFMiLAogICAgImluc3RhbmNlVHlwZUlkIiA6ICIyYjk0YzYzMS1mY2E5LTQ4OTItYTczMC0wM2VlNTI5ZmZlMmMiLAogICAgImlkZW50aWZpZXJzIiA6IFsgewogICAgICAiaWRlbnRpZmllclR5cGVJZCIgOiAiODI2MTA1NGYtYmU3OC00MjJkLWJkNTEtNGVkOWYzM2MzNDIyIiwKICAgICAgInZhbHVlIiA6ICIxNjQyMTE3MyIKICAgIH0sIHsKICAgICAgImlkZW50aWZpZXJUeXBlSWQiIDogIjgyNjEwNTRmLWJlNzgtNDIyZC1iZDUxLTRlZDlmMzNjMzQyMiIsCiAgICAgICJ2YWx1ZSIgOiAiOTc4OTgxMDg1NDMyNCIKICAgIH0sIHsKICAgICAgImlkZW50aWZpZXJUeXBlSWQiIDogIjgyNjEwNTRmLWJlNzgtNDIyZC1iZDUxLTRlZDlmMzNjMzQyMiIsCiAgICAgICJ2YWx1ZSIgOiAiMjAxMDM1MzUwNSIKICAgIH0gXSwKICAgICJjb250cmlidXRvcnMiIDogWyB7CiAgICAgICJjb250cmlidXRvck5hbWVUeXBlSWQiIDogIjJiOTRjNjMxLWZjYTktNDg5Mi1hNzMwLTAzZWU1MjlmZmUyYSIsCiAgICAgICJuYW1lIiA6ICJPbmcsIFlvbmcgTG9jay4iLAogICAgICAiY29udHJpYnV0b3JUeXBlSWQiIDogIiIsCiAgICAgICJjb250cmlidXRvclR5cGVUZXh0IiA6ICIiCiAgICB9IF0sCiAgICAibGlua3MiIDogewogICAgICAic2VsZiIgOiAiaHR0cDovL2xvY2FsaG9zdDo5MTMwL2ludmVudG9yeS9pbnN0YW5jZXMvNjkyMmEyNmItMjgzMS00NGJhLTkzYTctNjNiM2Y5", "base64"));
  res.write(new Buffer("NmQ0NWFlIgogICAgfQogIH0gXSwKICAidG90YWxSZWNvcmRzIiA6IDEKfQ==", "base64"));
  res.end();

  return __filename;
};

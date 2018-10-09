var path = require("path");

/**
 * GET /inventory/instances?query=id=="851c4f52-27a2-4ca0-a640-3c6fd0a04e7e"
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

  res.setHeader("x-okapi-trace", "GET mod-authtoken-1.4.1-SNAPSHOT.21 http://10.0.2.15:9131/inventory/instances.. : 202 7625us, GET mod-inventory-8.0.0-SNAPSHOT.82 http://10.0.2.15:9140/inventory/instances.. : 200 22472us");
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("connection", "close");
  res.setHeader("transfer-encoding", "chunked");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ewogICJpbnN0YW5jZXMiIDogWyB7CiAgICAiQGNvbnRleHQiIDogImh0dHA6Ly9sb2NhbGhvc3Q6OTEzMC9pbnZlbnRvcnkvaW5zdGFuY2VzL2NvbnRleHQiLAogICAgImlkIiA6ICI4NTFjNGY1Mi0yN2EyLTRjYTAtYTY0MC0zYzZmZDBhMDRlN2UiLAogICAgInRpdGxlIiA6ICJNaWNoZWxsZSBPYmFtYSIsCiAgICAic291cmNlIiA6ICJMb2NhbDogTU9EUyIsCiAgICAiaW5zdGFuY2VUeXBlSWQiIDogIjJiOTRjNjMxLWZjYTktNDg5Mi1hNzMwLTAzZWU1MjlmZmUyYyIsCiAgICAiaWRlbnRpZmllcnMiIDogWyB7CiAgICAgICJpZGVudGlmaWVyVHlwZUlkIiA6ICI4MjYxMDU0Zi1iZTc4LTQyMmQtYmQ1MS00ZWQ5ZjMzYzM0MjIiLAogICAgICAidmFsdWUiIDogIjE1OTg1MTE2IgogICAgfSwgewogICAgICAiaWRlbnRpZmllclR5cGVJZCIgOiAiODI2MTA1NGYtYmU3OC00MjJkLWJkNTEtNGVkOWYzM2MzNDIyIiwKICAgICAgInZhbHVlIiA6ICI5NzgwNDQ4NDUyNTYyIChwYmsuKSIKICAgIH0sIHsKICAgICAgImlkZW50aWZpZXJUeXBlSWQiIDogIjgyNjEwNTRmLWJlNzgtNDIyZC1iZDUxLTRlZDlmMzNjMzQyMiIsCiAgICAgICJ2YWx1ZSIgOiAiMDQ0ODQ1MjU2MSAocGJrLikiCiAgICB9LCB7CiAgICAgICJpZGVudGlmaWVyVHlwZUlkIiA6ICI4MjYxMDU0Zi1iZTc4LTQyMmQtYmQ1MS00ZWQ5ZjMzYzM0MjIiLAogICAgICAidmFsdWUiIDogIjIwMDkyNzk4OTEiCiAgICB9IF0sCiAgICAiY29udHJpYnV0b3JzIiA6IFsgewogICAgICAiY29udHJpYnV0b3JOYW1lVHlwZUlkIiA6ICIyYjk0YzYzMS1mY2E5LTQ4OTItYTczMC0wM2VlNTI5ZmZlMmEiLAogICAgICAibmFtZSIgOiAiRWR3YXJkcywgUm9iZXJ0YS4iLAogICAgICAiY29udHJpYnV0b3JUeXBlSWQiIDogIiIsCiAgICAgICJjb250cmlidXRvclR5cGVUZXg=", "base64"));
  res.write(new Buffer("dCIgOiAiIgogICAgfSwgewogICAgICAiY29udHJpYnV0b3JOYW1lVHlwZUlkIiA6ICIyYjk0YzYzMS1mY2E5LTQ4OTItYTczMC0wM2VlNTI5ZmZlMmEiLAogICAgICAibmFtZSIgOiAiQ2FsbCwgS2VuIiwKICAgICAgImNvbnRyaWJ1dG9yVHlwZUlkIiA6ICIiLAogICAgICAiY29udHJpYnV0b3JUeXBlVGV4dCIgOiAiIgogICAgfSBdLAogICAgImxpbmtzIiA6IHsKICAgICAgInNlbGYiIDogImh0dHA6Ly9sb2NhbGhvc3Q6OTEzMC9pbnZlbnRvcnkvaW5zdGFuY2VzLzg1MWM0ZjUyLTI3YTItNGNhMC1hNjQwLTNjNmZkMGEwNGU3ZSIKICAgIH0KICB9IF0sCiAgInRvdGFsUmVjb3JkcyIgOiAxCn0=", "base64"));
  res.end();

  return __filename;
};

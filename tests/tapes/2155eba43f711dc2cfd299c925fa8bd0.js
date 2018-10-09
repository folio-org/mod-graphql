var path = require("path");

/**
 * GET /instance-storage/instances/7fbd5d84-62d1-44c6-9c45-6cb173998bbd
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

  res.setHeader("x-okapi-trace", "GET mod-authtoken-1.4.1-SNAPSHOT.21 http://10.0.2.15:9131/instance-storage/instances/7fbd5d84-62d1-44c6-9c45-6cb173998bbd : 202 1459us, GET mod-inventory-storage-11.0.0-SNAPSHOT.114 http://10.0.2.15:9139/instance-storage/instances/7fbd5d84-62d1-44c6-9c45-6cb173998bbd : 200 4728us");
  res.setHeader("content-type", "application/json");
  res.setHeader("accept", "application/json");
  res.setHeader("x-okapi-tenant", "diku");
  res.setHeader("accept-encoding", "gzip,deflate");
  res.setHeader("user-agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
  res.setHeader("host", "localhost:9130");
  res.setHeader("x-okapi-request-id", "073568/instance-storage");
  res.setHeader("x-okapi-url", "http://10.0.2.15:9130");
  res.setHeader("x-okapi-permissions", "[\"inventory-storage.instances.item.get\"]");
  res.setHeader("x-okapi-user-id", "13851c57-8a6c-5d43-9ef2-880828a1ed74");
  res.setHeader("x-okapi-token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjEzODUxYzU3LThhNmMtNWQ0My05ZWYyLTg4MDgyOGExZWQ3NCIsInRlbmFudCI6ImRpa3UifQ.qpCtUVZPF_TPanLQNSBMR6Ypi6hlYfHqxhENJohDwAPUn3yS0R2Mj5HLGamznn7kqgq19k0qpt368J60EytJAQ");
  res.setHeader("connection", "close");
  res.setHeader("transfer-encoding", "chunked");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ewogICJpZCIgOiAiN2ZiZDVkODQtNjJkMS00NGM2LTljNDUtNmNiMTczOTk4YmJkIiwKICAic291cmNlIiA6ICJTYW1wbGUiLAogICJ0aXRsZSIgOiAiQnJpZGdldCBKb25lcydzIEJhYnk6IHRoZSBkaWFyaWVzIiwKICAiYWx0ZXJuYXRpdmVUaXRsZXMiIDogWyBdLAogICJlZGl0aW9uIiA6ICJGaXJzdCBBbWVyaWNhbiBFZGl0aW9uIiwKICAic2VyaWVzIiA6IFsgXSwKICAiaWRlbnRpZmllcnMiIDogWyB7CiAgICAidmFsdWUiIDogIm9jbjk1NjYyNTk2MSIsCiAgICAiaWRlbnRpZmllclR5cGVJZCIgOiAiNWQxNjRmNGItMGIxNS00ZTQyLWFlNzUtY2ZjZjg1MzE4YWQ5IgogIH0gXSwKICAiY29udHJpYnV0b3JzIiA6IFsgewogICAgIm5hbWUiIDogIkZpZWxkaW5nLCBIZWxlbiIsCiAgICAiY29udHJpYnV0b3JOYW1lVHlwZUlkIiA6ICIyYjk0YzYzMS1mY2E5LTQ4OTItYTczMC0wM2VlNTI5ZmZlMmEiLAogICAgInByaW1hcnkiIDogdHJ1ZQogIH0gXSwKICAic3ViamVjdHMiIDogWyAiSm9uZXMsIEJyaWRnZXQiLCAiUHJlZ25hbnQgd29tZW4iLCAiRW5nbGFuZCIsICJIdW1vcm91cyBmaWN0aW9uIiwgIkRpYXJ5IGZpY3Rpb24iIF0sCiAgImNsYXNzaWZpY2F0aW9ucyIgOiBbIHsKICAgICJjbGFzc2lmaWNhdGlvbk51bWJlciIgOiAiUFI2MDU2Lkk0NTg4IiwKICAgICJjbGFzc2lmaWNhdGlvblR5cGVJZCIgOiAiY2UxNzZhY2UtYTUzZS00YjRkLWFhODktNzI1ZWQ3YjJlZGFjIgogIH0gXSwKICAicHVibGljYXRpb24iIDogWyB7CiAgICAicHVibGlzaGVyIiA6ICJBbGZyZWQgQS4gS25vcGYiLAogICAgInBsYWNlIiA6ICJOZXcgWW9yayIsCiAgICAiZGF0ZU9mUHVibGljYXRpb24iIDogIjIwMTYiCiAgfSBdLAogICJ1cmxzIiA6IFsgXSwKICAiaW5zdGFuY2VUeXBlSWQiIDogIjJiOTRjNjMxLWZjYTktNDg5Mi1hNzMwLTAzZWU1MjlmZmUyYyIsCiAgInBoeXNpY2FsRGVzY3JpcHRpb25zIiA6IFsgIjIxOSBwYWdlcyA7IDIwIGNtLiIgXSwKICAibGFuZ3VhZ2VzIiA6IFsgImVuZyIgXSwKICAibm90ZXMiIDogWyAiQnJpZGdldCBKb25lcyBmaW5kcyBoZXJzZWxmIHVuZXhwZWN0ZWRseSBwcmVnbmFudCBhdCB0aGUgZWxldmVudGggaG91ci4gSG93ZXZlciwgaGVyIGpveWZ1bCBwcmVnbmFuY3kgaXMgZG9taW5hdGVkIGJ5IG9uZSBjcnVjaWFsIGJ1dCBhd2t3YXJkIHF1ZXN0aW9uIC0td2hvIGlzIHRoZSBmYXRoZXI/IENvdWxkIGl0IGJlIGhvbm9yYWJsZSwgZGVjZW50LCBub3RhYmxlIGh1bWFuIHJpZ2h0cyBsYXd5ZXIsIE1hcmsgRGFyY3k/IE9yLCBpcyBpdCBjaGFybWluZywgd2l0dHksIGFuZCB0b3RhbGx5IGRlc3BpY2FibGUsIERhbmllbCBDbGVhdmVyPyIgXSwKICAibWV0YWRhdGEiIDogewogICAgImNyZWF0ZWREYXRlIiA6ICIyMDE4LTA1LTAzVDAyOjM5OjUwLjA5MyswMDAwIiwKICAgICJjcmVhdGVkQnlVc2VySWQiIDogIjEzODUxYzU3LThhNmMtNWQ0My05ZWYyLTg4MDgyOGExZWQ3NCIsCiAgICAidXBkYXRlZERhdGUiIDogIjIwMTgtMDUtMDNUMDI6Mzk6NTAuMDkzKzAwMDAiLAogICAgInVwZGF0ZWRCeVVzZXJJZCIgOiAiMTM4NTFjNTctOGE2Yy01ZDQzLTllZjItODgwODI4YTFlZDc0IgogIH0KfQ==", "base64"));
  res.end();

  return __filename;
};

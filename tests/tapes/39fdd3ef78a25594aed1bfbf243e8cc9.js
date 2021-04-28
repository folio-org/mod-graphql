var path = require("path");

/**
 * GET /instance-storage/instances?query=title=ba*
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
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-okapi-trace", "GET mod-inventory-storage-20.3.0-SNAPSHOT.568 http://10.36.1.221:9134/instance-storage/instances.. : 200 4401us");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQyswrLknMS04tVrJSiOYCAAAA//+MVcluIzcQ/RWiL0kQUe5d3crB8HjBOItteJxDEAQBmyxKHFNkh2Rb0zD87ym2Fi+n0UEAi/VqeXxV/ZwokSyThexEJZqS1rnIaFnymra8rGjNu2xRtG3TdSKZJf8+gfPKmmSZzZK1m6AxXvr6q9HN28FxwLur29+vb9EQVNDx/AkhKwjkV2vA/+DJJ9aNSxLWQIRiTmFNs4TpAM6woJ7gIcKwzr//mSUgVMDM8ZRcKecDOduAU5wZcrm7StDLwxRlQigBJiipsGQ0PCdPTA+xCMtNW9V1XrV1lrx1exh7uI4tVSKrS1l2NO2yipZQ5pTBoqJcctlURdYw0SYvmIJbE5zqhmD3OQzbTH0r0EKZ1Yx8Bg0meed5gz7HVHnXItlFRiVnLS2bFlMtipSmBUCVt1JCzqZUfui+Ag9T/xN9M7JnE6PfOVgZZgLZ2s2U7tKsNDPxyT4PG+vs4IlUfGJpllwg1+PxHNvQzHukgLMDxc8fbDfDpgOH9d7d12lVz6/LqmmSj8hjVxyyRc04UFYVQMuuFJSxpqWLvAKx6HIQjE9d9UOn9+Ap63T26ynVmZYOBDmbk9+M7SVm6zWbZHUDW/KXdY9oEizArbx7GybJ06z+GP3KwX8DGD5G/s6IPByJAM+d6g9UvIHcMw==", "base64"));
  res.write(new Buffer("s4Kd+xsrcZM5KlLjezhrFD/jOE472gansIJ1CP3y5GS73c6l1crOrVudYLVamccH+BbQ5fKIJg52A0N+ZINQlvjggG1QPj8hZIMNOsW0/9IDPzIdSbBPoJNDxTc2RGZ2lZBgyS6UVDh3kYrD1B+fCDWHo77IqUy5pGUqa9rlC0FbyRoJTBZFHik/4K6sw0quxWG23pn3xn49eqxPX7xSOsk1z1rSsxV48gvJU8I380gf6nM1RGt0AbOKNoNd7Adp18+7hYHdGOEJqsODlmQw8A05CSD0SPrDBLAw7RN8nCec6zVZI7Vz8tlu8exmEUy+2lEO+gBBDShPhEXCkWpBupFgMsLdwJF2giNL2PZxy5wgKBk/aYDS7dpGWEwlGf67U3JuBy2ICqQDzGqsY52GGQqMYyEzgh1FA1kPG9xZTq3WwRPNtmMs6w/mHskFc3w8Jbd4xtAYiK+Z20xrZKtCGGcERxrfNjCtJ+H2yPaU44IZ3DjkXAPDLk/jCg5MylujUe8SxQOvTxaV8qoClldFwRa0FJDjpqtL2pR1TdNFyXPJ2iJt9oPq4EnhGtEjbjREBjfAPsuXocfbqP+dUSjPUZtu/HiB3kEhgSiRcyvgKKZoH/yffZxlccGmh8/TPKNpSfPmIS2WWbqsynlbtT/HT0ycCggM3VmyxE2F0/I9wOWEHL4zTfR+wY+cnRa5vwdunfD5rmJUyuBw75zjVsfHfQC32Xfz8j8AAAD//w==", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("rJZfT4MwFMW/Sh81odo/QFv3NNQQ46NmPrelbMsMJIRpovG7ezCoM7C5bHsjcLkt5Zz7Oz1SfWDMeSuoEYpRDHlHHTNwmZZWhCQNOpj9kKp2IfUaosdBwBx1QxymMYnJnYfuLWQ4D9V6Tq5I9jQjWpBL+Ghhq4o8BFS2S+gws6idQH9tu1iiS14DvlCUA47bzgcTgtEJcDVzOCezTe1XdeMXMEKn27xu2xLILcgLbFGgJK+f27eIQCwYdl+CBfqKtQf4tsD9fXAXn/XnEzAcPqLRsql7DUvspuqWxk2YYPDm3/CwZ0jgjHOeilgeFRGi34ZnN7c0MeY8z2b/9VYhMZwbRTGE0duWUI5PgdC0UKm30nUU3BU/up8aDf710Skk+llg2pSrUEXkHqMPQqnsCXv3Ahoo64RLbFf0rkVCrIPiknJVSvgZV9aUmgqp48Q5wZkdJLXRbDWIPduTynggGc8eY5CXLgjsNKYySRDruWaYRjgdkVql0zQ2XrsTQf6xsX5FOKM8HtAdB71J9xGc9IwaQUf/5Dh2JBdcykPY8f3ifuzYrD6EHZ8AAAD//w==", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("xFjLbhoxFP0VqyuQMBq/7XZFIAvapK8QVVXVxXhsJ1QUJAhNu+z/9aN6DKQhbYZAAuoqinV9fQdf3/NYYUdRJLSTdxSSDBNACIl7C+BqSSmruU8ybYkdfBN2/FFQeAWkM5tNwHgW/OYLdozLUXvRGyF+H+yw4WH9tu0IVgW0p1L3D8nKKhtlQi97IKsUVoG5cE91YQSPkcnS+zsDmDktrXrSyF3LxoXmTCij95QvXxU1kKT353NoLNAJnkdaoFK7klpmHK1Y4XjlHOPcHDRfo989bx71e04rxp3c01c33nQnJ90mkwaKvOaiH510r/e9Srrva0c+YcyheEDdc72LcrdiIBYuyKwBVRYDwaIpBPM0GWO8jUkHy/7dutKzG5AzCKOj0BX1aEgqEzrOqtyeTBSBxZiScHfYRU3ZbVCaxZipqb/Qnlc+WKq1h6RFS1EXHCDPVM4YLbQq5eHq/8ujOSmvKT0fD7OkPANIxRmlb/Fdk5AxLBtdnfBtAmCfQ59SenGVfZzedDK8ynG/fi4is+DE8knnA6XzsQcALv/7ePz+bG3l/HV/cNwjZ4PO4Hh9HTUgdSqXQeu13CzvZv68YqR9ikn7VOOnVX/CEY7oSGEOd4SQpl0o0sEcqz9EcmlYmZA1cDy9JErqk0FnFYG7UCWphX/YwKp/fjdOVvcSAReTFumPAJ6bPKtTNOfl6EeLMAfaYQWSvJuXU2DtchEqhBd1DtZRvEAZ18OrS7DpUZuwbEfgD2m8LPGs8u7mC1LFcoYOWYa1iXYt8glhjH8mjV6scpwVzRrra88e0zPUOf8aybgiU1xoOQVfWJDInUipdvlDnpMhft1sPgkqtvKf/gdD5Vo9jqEuN27LUG+jH8NQfwMAAP//", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("7FrNbuM2EH4VnhYJILqSqN/cEu8uNkDaGg6KLbDYAylRtrCSaYhy0xz7Sos+QR+lT9JvKDnxZuM0iZOeerEdieQMOcOZb77JiFBDpYq0jDMuQ1HwKPaRmzKgscBPhMjjUJZp9g1CDXcQ6h54+uPpfLqDTmdmrRHx5UrDgpI6BI1ZbDRTur/SGk8lW3dksN7xfquSHsg1bOCxVq7qCm8cM2g2jkNDqYphRJHjLsBKDXz9nJb32JW0zIkzFZub1glcSHI1x/DZTdfWVlsnxKhaO+bcQkqpiWulMS55UA/DIwZxbhBsenamm8ZReNpNnUpt5VBzruqN9fCgw/nDfzz2vjFd3RJVYtlc6uGXx36avJ0MYolkZGuD/S3ZVYdY3uF13a43BBwcH7i6xj4HhZG+2A+kyGmjf5eOHZka80V/h+j/P+QDD/nRpNZNVKx0kCupI17KMONRiqJFacCUMopClOthpmV5z6pbY7nTfCarNaJYU7RZlMZRkKbsfugZiVxVUBIlhML1rlIUoFWRInzLEBCx0EJX9+Hj11t5u+whqz4Ald3t8G6vC1JqnEQ8SAQC1z7MKDf90nSTQ5kpSjZ1K7vrgSjfQcIf5G819fEcmbfymCzIHViQEA2ViGy/algRwftFdXN5bpeoQ1LWPeLAR6TXWrYeg05pxEwHBdN4v24KZ21xaV9DvTsofCphIcAhNl0iySw5p5zWGZeVZMMauuEu23H+TgJJIXB1X1z/LMhcQqXQ6A1h6+hCL/SqpN4pNWZgC90dP3cehtzRjZ7sUY4aurdSqHSA//Ob+TsDn4bnz34FlE7YZIqPIAkPxvX/godnziddh+0c7sxuvZt6F6MXMXIr2Q+9Ltm50K8QbIFUqLe3rC2zS7Nm9YrN5KaxW8teI8p72+6frRcrl2fojzMa9WEIqlvcfYHI74D4ff3j8Sg6MwTdnXcPAPRDqdpDsHJWxkFQCsFjnaFaKWJMUzAWqtYiL0q/EGH0ZOz8KfuMIChQKnwKPt/0b4+i3hw/un3rEissNmbqmewsrf7C7UnvRt4l7O4ugj1hp3z+9x9/ssu/vr6evJkh6AG/O518nLBLJIOeO/gK6NOPSApe6AIeW4/uD88d/z3DY5eF6Ydfb9h5pxvn9AREKjeGYMi3k6XqjMTwAOkQ4Tby2VGI8bqcHHssThL/CZtFXC0rAWeLcZ0jFSuelxHirVZxGfvCV3m+u9mtQpa2ye5sE1sJ/CwJo5eWD7dqUU79XJ1bu6E1Bv6yDDLphxWPsxzWKpAmcpQevMilUnGRSu0aG/9VEReIExGeiHySZem2iOvlwlIBh+8LomNc+fS40u7OckNpN44+u/4FSG/oQQpI0iLHZReKx0iWXKog5akfqjJAeVYm4qGakMSIEz+bJN/3x58q5jnF5D8AAAD//w==", "base64"));
  res.write(new Buffer("itUBrUcDr2eA6lGyUjDR4QIAAAD//w==", "base64"));
  res.write(new Buffer("UlACxklpTolnXlo+UKQaTYmJjlIasBSHlV/ALkt6Xj4oziCmctUCAAAA//8DAAcfUfnnJgAA", "base64"));
  res.end();

  return __filename;
};

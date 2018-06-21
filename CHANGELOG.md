# Change history for mod-graphql

## 0.2.0 (IN PROGRESS)

* The `instances` query now returns a structure of a `records` array and a `totalCount`. Fixes MODGQL-3.
* URL-encode the CQL query in instances requests. Fixes MODGQL-8.
* Set up ESLint. Fixes MODGQL-11.
* Lint-clean the code. Fixes MODGQL-10.
* Move source-code down into new `src` directory. Fixes MODGQL-13.
* Fix regression: errors when instance records lack foreign keys. Fixes MODGQL-15.
* Emit diagnostics for (e.g.) malformed CQL. Fixes MODGQL-6.
* Support paging parameters in mod-graphql Instances search. Fixes MODGQL-16.
* Return holdings statements, with their items, along with instance records. Fixes MODGQL-18.
* Auto-generate GraphQL schemas from RAMLs and JSON Schemas. Fixes MODGQL-20.
* Auto-generate GraphQL resolvers from RAMLs and JSON Schemas. Fixes MODGQL-23.
* General work towards a useful test-suite. Fixes MODGQL-12.
* Set up test-suite for GraphQL schema generation. Fixes MODGQL-21.
* Abstract out common parts of tests. Fixes MODGQL-31.
* Add tests for two-level and three-level fetching. Fixes MODGQL-24.
* Document [procedure for uninstalling a running module](doc/remove-running-modules.md). Fixes MODGQL-5.
* Use `PROXY_OKAPI_URL` environment variable for instructing the yakbak proxy server, rather than re-using `OKAPI_URL` which is used here as in other places such as the various Okapi CLIs. Prevents the yakbak HTTP server from being bypassed in tests, and so fixes MODGQL-35.
* Get tests running within CI (be generating a good set of tapes). Fixes MODGQL-34.



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
* Parameterise which RAML drives mod-graphql. Fixes MODGQL-29.
* Handle RAML type-names with embedded hyphens. Fixes MODGQL-36.
* Add `schema` logging-category for dumping the generated GraphQL schema. Fixes MODGQL-37.
* Create single logger object, pass it down to wherever it's needed. Fixes MODGQL-38.
* Support '@' symbol in field-names. Fixes MODGQL-39.
* RAML/JSON-Schema translator can handle arrays with no `items` specification. Fixes MODGQL-40.
* Discard endpoints that define no JSON response (but continue reject those that define a JSON response with no schema specified). Fixes MODGQL-41.
* Correctly handle API paths that have parameters in the middle. Fixes MODGQL-44.
* Correctly handle API paths that have multiple parameters. Fixes MODGQL-45
* Skip over fields whose types are undefined. Fixes MODGQL-46.
* Extend mod-graphql so that its test-suite, broken by mod-inventory-storage, works once more. Fixes MODGQL-43.
* Document use of environment variables. Fixes MODGQL-48.
* Use logger to emit gathered API instead of checking options. Fixes MODGQL-27.
* Support RAML API body specifications with type `application/vnd.api+json` as well as `application/json`. Fixes MODGQL-49.
* Improve titles of RAML-to-GraphQL test-cases. Fixes MODGQL-51.
* Add `raml` logging-category for dumping the compiled RAML before analysing schemas. Fixes MODGQL-52.
* When `allowSchemaless` option is in effect, simply ignore endpoints that have no schema. Fixes MODGQL-53.
* Support RAML 1.0. Fixes MODGQL-50.
* Recognise two ways absence of RAML 1.0 schema is indicated. Fixes MODGQL-54.
* Spot and diagnose non-scalar JSON-Schema type. Related to MODGQL-55.
* Square brackets in parameter names are mapped to underscores. Fixes MODGQL-56.
* Omit leading baseURL from URLs gathered in API. Fixes MODGQL-57.
* Propagate all query parameters from GraphQL queries to corresponding back-end queries. Fixes MODGQL-59.
* Target mod-graphql on the RAML for mod-kb-ebsco. Fixes MODGQL-47.
* Use `util.inspect` to serialise JSON Schemas, as they may have circular references. Fixes part of MODGQL-61.
* Support new logging categories `api.comments`, `api.resources`, `api.types`. Fixes MODGQL-63.
* Share GraphQL-schema types when the same JSON Schema is referenced in multiple places. Fixes MODGQL-64.
* Omit constant leading path from generated type-names. Fixes MODGQL-66.
* Repair test-suite failure due to running in higher-level directory. Fixes MODGQL-65.
* Handle circular references in schemas. Fixes MODGQL-61.
* Skeleton specified by `folio:includedElement` supports dot-separated paths such as `holdingsRecords.0`. Fixes MODGQL-68.
* Add new document, [Example queries against mod-inventory-storage
](doc/example-queries.md). Fixes MODGQL-67.
* Handle circular references in schemas. Fixes MODGQL-61.
* Specify particular SHA1s for checkouts of modules whose RAMLs are used in `yarn test` (`mod-inventory-storage` and `raml-util`). Fixes MODGQL-69.
* Upgrade tests to cope with the RAML 1.0 now used by `mod-inventory-storage` and `raml-util`. Fixes MODGQL-70.
* Support "weak references" in JSON Schemas, specified as `folio:$ref`. Behaves the same as `$ref` in mod-graphql, but is ignored by RMB, circumventing its problem with cycles (RMB-265). Fixes MODGQL-71.
* Ability to combine APIs of multiple RAMLs. Fixes MODGQL-30.
* Add links from top-level README to other documentation. Fixes MODGQL-75.
* Support [item query that returns holdings and instance](doc/example-queries.md#get-holdings-record-and-instance-for-items). Fixes MODGQL-21.
* Change to top-level API: the exported object is no longer a running app, but a function which will start and return such an app. Allows the paths to the to-be-converted. RAML files to be passed in. Fixes MODGQL-79.
* Add new test-case 14, exercising the items API. Fixes MODGQL-76.
* Remove default ramlPaths from app. Fixes MODGQL-80.


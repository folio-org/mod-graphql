# Change history for mod-graphql

## 1.2.0 (IN PROGRESS)

* Add redundant copies of the `mod-inventory-storage` RAMLs, including the `raml-utils` submodule, in `tests/mod-inventory-storage-ramls`. This will make it much easier to run mod-graphql in a useful way from within Docker.
* GraphQL schema generation emits a `_dummy` string field as a member of empty objects. Fixes MODGQL-118.
* Correctly handle linking from array-valued fields (including doing nothing for an empty-array value). Fixes MODGQL-120.
* Add [`src/merge`](src/merge) area, showing how to merge an overlay JSON Schema to add link-fields to a schema that lacks them. Fixes MODGQL-119.
* Include mod-users APIs in Docker container.

## [1.1.0](https://github.com/folio-org/mod-graphql/tree/v1.1.0) (2018-10-25)
[Full Changelog](https://github.com/folio-org/mod-graphql/compare/v1.0.0...v1.1.0)

* In JSON Schemas, treat absence of `properties` the same as an empty set. Fixes MODGQL-89.
* `mod-graphql` can now read, combine and translate all 22 of the `mod-inventory-storage` RAMLs with their schemas. Fixes MODGQL-88.
* RAML conversion now fails when referenced trait files are absent. Fixes MODGQL-94.
* RAML conversion now fails when referenced JSON Schema files are absent. Fixes MODGQL-95.
* Reinstate `src/autogen/test/run-tests.js`: we still need this for `yarn regen`, which regenerates regression-test expectations. Undoes part of MODGQL-86.
* Correctly interpret paths of sub-schemas relative to parents. Fixes MODGQL-96.
* Add `ignoreRamlWarnings` option, so translation can continue after a RAML parse with no hard errors. Fixes MODGQL-97.
* RAML-parsing failures are now reported by throwing an exception, not by exiting the whole process. Fixes MODGQL-99.
* Support array-typed query parameters in RAML 1.0. Fixes MODGQL-98.
* `convertAPI` no longer emits diagnostic output, but throws a richer exception containining diagnostics. Fixes MODGQL-100.
* Check that RAML/JSON Schema conversion can handle all existing modules. Fixes MODGQL-93.
* Support array-valued types in JSON Schemas. Fixes MODGQL-102.
* Support array-typed array types (yes, really!). Fixes MODGQL-103.
* Extend `raml2graphql` with a new `-a api.yml` option to parse all the RAMLs specified in the API file. Fixes MODGQL-101.
* Add `-d=DIRECTORY` option to specify the path used, when `-a` is in effect, to find RAMLs named in the YAML API specification. Fixes MODGQL-106.
* Add `-s` option to skip RAMLs from modules that aren't checked out. Fixes MODGQL-105.
* Add `-m=REGEXP` option to limit RAMLs to those from matching modules when `-a` is in effect. Fixes MODGQL-104.
* Avoid registering undefined comments. This is necessary because `raml-1-parser` heplfully adds an undefined `version` comment if a RAML doesn't specify a version. Fixes MODGQL-108.
* Add ability to drive `mod-graphql` from an API file, and document this in the [README](README.md). Fixes MODGQL-107.
* `parseSchemaMap` supports RAML 1.0, enabling sub-schemas to be correctly located from RAML 1.0 files. Fixes MODGQL-109.
* `listAPIs` now omits module-sections for which `multiple` is set true in the API file. This avoids conflicts with multiple modules having the same API trying to define the same endpoint. Fixes MODGQL-110.
* `mergeResources` now reports the paths to both RAML files when two of them try to define the same resource. Fixes MODGQL-112.
* Add `RAML_EXCLUDE=regexp` environment variable and `-x regexp` option to exclude from the API list modules that match the specified regexp. Fixes MODGQL-113.
* No remaining duplicate resource-names now that MODGQL-110 is done, when MODGQL-113 facilities are used. Fixes MODGQL-111.
* Break the RAML-merging code out of `convertAPI.js` into its own source-file `mergeAPIs.js`. Fixes MODGQL-116.
* `mergeTypes` now reports which two RAML files are responsible for a type clash if one occurs. Fixes MODGQL-115.

## [1.0.0](https://github.com/folio-org/mod-graphql/tree/v1.0.0) (2018-10-12)
[Full Changelog](https://github.com/folio-org/mod-graphql/compare/v0.2.0...v1.0.0)

* Remove support for `LEGACY_RESOLVERS`. Fixes MODGQL-81.
* Remove old `yarn test2` code. That command still works, but now uses a mainstream test. Fixes MODGQL-86.

## [0.2.0](https://github.com/folio-org/mod-graphql/tree/v0.2.0) (2018-10-11)
First formal release.

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
* Set up test-suite for GraphQL schema generation. Fixes MODGQL-22.
* Abstract out common parts of tests. Fixes MODGQL-31.
* Add tests for two-level and three-level fetching. Fixes MODGQL-24.
* Document [procedure for uninstalling a running module](doc/remove-running-modules.md). Fixes MODGQL-5.
* Use `PROXY_OKAPI_URL` environment variable for instructing the yakbak proxy server, rather than re-using `OKAPI_URL` which is used here as in other places such as the various Okapi CLIs. Prevents the yakbak HTTP server from being bypassed in tests, and so fixes MODGQL-35.
* Add ability to use CQL and other variables in GraphQL for tests. Fixes MODGQL-32.
* Modify `yarn test` code so it sets up necessary mod-inventory-storage RAMLs/JSON Schemas. Fixes MODGQL-33.
* Get tests running within CI (by generating a good set of tapes). Fixes MODGQL-34.
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
* Support new logging categories `api.comments`, `api.resources`, `api.types`. Fixes MODGQL-63.
* Share GraphQL-schema types when the same JSON Schema is referenced in multiple places. Fixes MODGQL-64.
* Omit constant leading path from generated type-names. Fixes MODGQL-66.
* Repair test-suite failure due to running in higher-level directory. Fixes MODGQL-65.
* Skeleton specified by `folio:includedElement` supports dot-separated paths such as `holdingsRecords.0`. Fixes MODGQL-68.
* Add new document, [Example queries against mod-inventory-storage](doc/example-queries.md). Fixes MODGQL-67.
* Handle circular references in schemas, including use of `util.inspect` to serialise JSON Schemas. Fixes MODGQL-61.
* Specify particular SHA1s for checkouts of modules whose RAMLs are used in `yarn test` (`mod-inventory-storage` and `raml-util`). Fixes MODGQL-69.
* Upgrade tests to cope with the RAML 1.0 now used by `mod-inventory-storage` and `raml-util`. Fixes MODGQL-70.
* Support "weak references" in JSON Schemas, specified as `folio:$ref`. Behaves the same as `$ref` in mod-graphql, but is ignored by RMB, circumventing its problem with cycles (RMB-265). Fixes MODGQL-71.
* Ability to combine APIs of multiple RAMLs. Fixes MODGQL-30.
* Add links from top-level README to other documentation. Fixes MODGQL-75.
* Exercise multiple entry points to graph. Fixes MODGQL-25.
* Support [item query that returns holdings and instance](doc/example-queries.md#get-holdings-record-and-instance-for-items). Fixes MODGQL-21.
* Change to top-level API: the exported object is no longer a running app, but a function which will start and return such an app. Allows the paths to the to-be-converted. RAML files to be passed in. Fixes MODGQL-79.
* Add new test-case 14, exercising the items API. Fixes MODGQL-76.
* Add new test-case 15, exercising multiple RAMLs in a single API. Fixes MODGQL-73.
* Remove default ramlPaths from app. Fixes MODGQL-80.
* Add, use and document new `ramlpath` logging category. Fixes MODGQL-82.
* Add and use `configuredLogger` utility rather than raw `stripes-logger`. Fixes MODGQL-83.
* Recognise `LOGCAT` environment variable as well as `LOGGING_CATEGORIES`. Fixes MODGQL-84.
* Document combining APIs of multiple RAMLs. Fixes MODGQL-74.
* Rationalize mod-graphql documentation. Fixes MODGQL-77.
* Add documentation on [how to use GraphQL from Stripes](doc/using-graphql-from-stripes.md). Fixes MODGQL-19.


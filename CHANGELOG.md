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


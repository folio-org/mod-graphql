# Change history for mod-graphql

## 0.2.0 (IN PROGRESS)

* The `instances` query now returns a structure of a `records` array and a `totalCount`. Fixes MODGQL-3.
* URL-encode the CQL query in instances requests. Fixes MODGQL-8.
* Set up ESLint. Fixes MODGQL-11.
* Lint-clean the code. Fixes MODGQL-10.
* Move source-code down into new `src` directory. Fixes MODGQL-13.
* Fix regression: errors when instance records lack foreign keys. Fixes MODGQL-15.
* Emit diagnostics for (e.g.) malformed CQL. Fixes MODGQL-6.


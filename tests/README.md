# Note on inventory RAMLs and JSON Schemas



## The situation today

There are often two sets of inventory RAMLs and JSON Schemas, and you do _not_ want to get them mixed up:


### 1. [`input/mod-inventory-storage/ramls`](input/mod-inventory-storage/ramls)

This is the `ramls` directory of a dynamic copy of the whole `mod-inventory-storage` module, on the `graphql` branch, which gets checked out as part of the `yarn test` process. It was originally the only copy that `mod-graphql` ever used.

This is used in development and to run the tests. As a result, passing the tests -- which is required for deployment -- means that the `graphql` branch of `mod-inventory-storage` has to include all of the [GraphQL annotations](../src/autogen/README.md#option-1-json-schema-extensions) needed for the tests to run.


### 2. [`mod-inventory-storage-ramls`](mod-inventory-storage-ramls)

This is an old copy of the `ramls` directory from `mod-inventory-storage`, which was statically copied into the `mod-graphql` repository, and is always available and unchanging. This is what is used for actually running `mod-graphql` from Docker (e.g. as part of a FOLIO installation).

It introduced to make it easier for Docker to run mod-graphql with a useful set of RAMLs and JSON Schemas, not needing to pull in part of the `mod-inventory-storage` source code at deployment time. This has proved a mixed blessing. It makes this software easier to deploy, but means that the schemas it gets deployed with tend to drift from the master copies.


### ... which means?

Crucially, when adding a new annotation to one of the schemas (such as the `illPolicy` structure in [`mod-inventory-storage-ramls/holdingsrecord.json`](mod-inventory-storage-ramls/holdingsrecord.json), it is currently necessary to add it to _both_ copies: `input/mod-inventory-storage/ramls` (i.e. the `graphql` branch of `mod-inventory-storage-ramls`) so that the tests can pass; _and_ `mod-inventory-storage-ramls` so that the new annotation is included in the actual running software under Docker.

This is not ideal.


## The way forward

In the medium term, we should get rid of the local static copy and instead have the Docker deployment script clone the `graphql` branch of `mod-inventory-storage` and run off that.

In the longer term, we should of course change `mod-graphql` so that it probes Okapi at run-time to discover what modules are running and to obtain their RAMLs and JSON Schemas. This is the subject of [MODGQL-62 (Auto-configure based on APIs published by Okapi)](https://issues.folio.org/browse/MODGQL-62), which for a long while was blocked on [OKAPI-650 (Serve RAMLs and JSON Schemas that describe running interfaces)](https://issues.folio.org/browse/OKAPI-650), but is now free to proceed.



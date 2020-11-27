# create-schemas

Building on [earlier JSON Schema-merging experiments](../src/merge/README.md), this area contains a stand-alone utility that downloads the RAMLs and JSON Schemas for specified FOLIO back-end modules and applies overrides to them that direct mod-graphql on how to follow links. This constitutes an implementation of [MODGQL-122](https://issues.folio.org/browse/MODGQL-122).

[The `create-schemas.js` script](create-schemas.js) is driven by [a JSON configuration file](schemaconf.json) specifying which back-end modules are to be supported, which releases of those modules to use, and what overlays to add to the canonical versions of the release's JSON Schemas.


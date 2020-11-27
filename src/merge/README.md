# Merging JSON Schemas

At present, mod-graphl's gathering of related record (e.g. the holdings records associated with an instance, and the item records associated with those holdings) is driven by extensions to the JSON Schemas describing the links as "virtual fields": see
[documentation](https://github.com/folio-org/mod-graphql/blob/master/src/autogen/README.md#option-1-json-schema-extensions)
and
[example](https://github.com/folio-org/mod-inventory-storage/blob/2cb74a568f80aa84a156b5778c206cd7850f75eb/ramls/instance.json#L303-L316)

There is some disagreement over whether this is the right approach. Some people feel that these links are, fundamentally, part of the schema, so they belong in the JSON Schema. Others feel that they are not, and should be recorded (in machine-readable form) elsewhere.

To keep both options open, we investigated whether it's possible to maintain the link fields in a separate JSON-Schema files, and merge them at run-time with the core schemas. It turns out that this works well, and so it gives us a path to split the link fields out from the core schemas down the line if we decide that's what we want.

To see the process in action, use:

    node ./merge-schemas.js | diff ../../tests/mod-inventory-storage-ramls/instance.json -

See also:
[MODGQL-119](https://issues.folio.org/browse/MODGQL-119).
and
[MODGQL-122](https://issues.folio.org/browse/MODGQL-122).


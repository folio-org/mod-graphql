# Merging JSON Schemas

At present, mod-graphl's gathering of related record (e.g. the holdings records associated with an instance, and the item records associated with those holdings) is driven by extensions to the JSON Schemas describing the links as "virtual fields": see

* documentation: https://github.com/folio-org/mod-graphql/blob/master/src/autogen/README.md#option-1-json-schema-extensions
* example: https://github.com/folio-org/mod-inventory-storage/blob/master/ramls/instance.json#L303-L316

There is some disagreement over whether this is the right approach. Some people feel that these links are, fundamentally, part of the schema, so they belong in the JSON Schema. Others feel that they are not, and should be recorded (in machine-readable form) elsewhere.

To keep both options open, I will investigate to what extent it's possible to maintain the link fields in a separate JSON-Schema files, and merge them at run-time with the core schemas. If that works well, it gives us a path to split the link fields out from the core schemas down the line if we decide that's what we want.

I hope to come up with the example code showing how this would be done.

See MODGQL-119.

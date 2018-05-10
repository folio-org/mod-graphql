# Autogeneration of schemas and resolvers

We want to have mod-graphql configure itself by auto-generating its
GraphQL schemas and resolvers based on the RAMLs and JSON Schemas that
describe the underlying services.

Not all the information we need is included in those sources: for
example, nothing in the Instance schemas says that there are a bunch
of holdings records associated with it, let alone how to find those
holdings records. Accordingly, we will use some custom extensions to
JSON Schema.

The master of the Instance schema is [on
GithHub](https://github.com/folio-org/mod-inventory/blob/master/ramls/instance.json),
but we therefore use instead [a modified local copy](inputs/instance.json).


## See also

* https://github.com/folio-org/raml/blob/master/ramls/mod-users/addressTypes.raml
* https://spacetelescope.github.io/understanding-json-schema/structuring.html
* https://swagger.io/docs/specification/using-ref/


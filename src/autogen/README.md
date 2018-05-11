# Autogeneration of GraphQL schemas and resolvers


## Introduction

We want to have mod-graphql configure itself by auto-generating its GraphQL schemas and resolvers based on the RAMLs and JSON Schemas that describe the underlying services.

Not all the information we need is included in those sources:  example, nothing in the Instance schemas says that there are a  of holdings records associated with it, let alone how to find those holdings records. Accordingly, we will use some custom extensions to JSON Schema.

The master of the Instance schema is [on
GitHub](https://github.com/folio-org/mod-inventory/blob/master/ramls/instance.json),
but we therefore use instead [a modified local copy](inputs/instance.json).


## RAMLs and JSON Schemas

In the world of describing RESTful web-services, two kinds of files are involved: RAMLs describe the entry-points and sets of arguments which define the API; and JSON Schemas describe the format of the data. RAMLs link to JSON Schemas, and these link to each other as necessary to describe sub-structures.

By contrast, in GraphQL, a single interface file exists, the GraphQL schema, which describes both the entry-points and the available fields and sub-records.

Therefore, in order to generate GraphQL schemas, it will be necessary to start with FOLIO services' RAMLs, and follow through the relevant JSON Schemas. The former will map to query names, with their parameter sets, within the GraphQL schema's `Query` type' and the latter will provide the structures of types and fields.


## Schema inclusion

Including one JSON Schema in another is achieved using [the special `$ref` key](https://spacetelescope.github.io/understanding-json-schema/structuring.html), whose value is a [JSON Pointer](https://tools.ietf.org/html/rfc6901). JSON Pointers can take many forms, but in FOLIO we are using JSON Schemas in the context of a RAML, which we need in order to define the endpoints that will become GraphQL queries.

That gives us a well-defined approach to schema inclusion: the RAML declares _all_ the JSON Schemas that are going to be used in its header, giving a name to the contents of each; and then the schemas that are referenced can further reference each other. For example, [the RAML for the address-types endpoint](https://github.com/folio-org/raml/blob/master/ramls/mod-users/addressTypes.raml) declares:

	schemas:
	  - addresstype.json: !include ../../schemas/mod-users/addresstype.json
	  - ../metadata.schema: !include ../../schemas/metadata.schema

(and some others); it then specifies that the result of the `GET /addresstypes` operation is of the type defined by the `addressype` schema:

	/addresstypes:
	  /{addresstypeId}:
	    type:
	      collection-item:
	        exampleItem: !include ../../examples/mod-users/addresstype.sample
	        schema: addresstype.json

[That schema](https://github.com/folio-org/raml/blob/master/ramls/mod-users/addressTypes.raml) lists fields including `metadata`, which itself is of a type defined by another of the schemas, `../metadata.schema`:

	"metadata" : {
	  "$ref" : "../metadata.schema",
	  "readonly" : true
	}

That `$ref` only works because `../metadata.schema` was defined in the RAML.



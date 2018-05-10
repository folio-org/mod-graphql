# Autogeneration of schemas and resolvers


## Introduction

We want to have mod-graphql configure itself by auto-generating its GraphQL schemas and resolvers based on the RAMLs and JSON Schemas that describe the underlying services.

Not all the information we need is included in those sources:  example, nothing in the Instance schemas says that there are a  of holdings records associated with it, let alone how to find those holdings records. Accordingly, we will use some custom extensions to JSON Schema.

The master of the Instance schema is [on
GitHub](https://github.com/folio-org/mod-inventory/blob/master/ramls/instance.json),
but we therefore use instead [a modified local copy](inputs/instance.json).


## Schema inclusion

Including one JSON Schema in another is achieved using [the special `$ref` key](https://spacetelescope.github.io/understanding-json-schema/structuring.html), whose value is a [JSON Pointer](https://tools.ietf.org/html/rfc6901). JSON Pointers can take many forms, but in FOLIO we are using JSON Schemas in the context of a RAML, and that gives us a well-defined approach. The RAML declares _all_ the JSON schemas that are going to be used in its header, giving a name to the contents of each; and then the schemas that are referenced can further reference themselves. For example, [the RAML for the address-types endpoint](https://github.com/folio-org/raml/blob/master/ramls/mod-users/addressTypes.raml) declares:

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

But that only works because `../metadata.schema` was defined in the RAML. We do not have a way to make a JSON schema refer to another schema outside the context of a RAML.


## See also

* https://swagger.io/docs/specification/using-ref/


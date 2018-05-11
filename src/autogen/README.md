# Autogeneration of GraphQL schemas and resolvers


## Introduction

We want to have mod-graphql configure itself by auto-generating its GraphQL schemas and resolvers based on the RAMLs and JSON Schemas that describe the underlying services.


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


## JSON Schema extensions

Not all the information we need is included in standard RAML and JSON Schema: for example, nothing in the Instance schemas says that there are a set of holdings records associated with it, let alone how to find those holdings records. Accordingly, we will use some custom extensions to JSON Schema. (It may suffice to use RAML in its standard form.)

Since we are not using the standard form of JSON Schema, we will use the custom URL `https://github.com/folio-org/mod-graphql/json-schema` for the `$schema` identifier, in accordance with [section 6.4 of the specification](http://json-schema.org/latest/json-schema-core.html#rfc.section.6.4). We do not yet have a meta-schema, but may introduce one later.

The JSON Schema specification rather unhelpfully [says](http://json-schema.org/latest/json-schema-core.html#rfc.section.4.3.2):

> JSON Schema does not provide any formal namespacing system, but also does not constrain keyword names, allowing for any number of namespacing approaches.

We therefore use our own convention for extension keywords, giving them names prefixed with `folio:`. We tentatively introduce the following:

Keyword | Example | Description
--- | --- | ---
`folio:linkFromField` | "id" | If this is defined, then the field is a link field, and all the three following keywords must also be included. When the GraphQL resolver encounters this field, the value of the specified field in the main record is used as the query key in a search for linked records to be included.
`folio:linkBase` | "holdings-storage/holdings" | The base path at which searches that discover linked records are found. Should not include the leading `http:/` or hostname.
`folio:linkToField` | "instanceId" | The field within linked records that is searched for a value identical to that of the master record's link-from field.
`folio:includedElement` | "holdingsRecords | The field within linked records which is extracted and included as the linked content within the constructed master record.

As an example, a field with the specified keywords and values in the table above, and having `id` equal to `123`, would result in fetching subrecords from `/holdings-storage/holdings?query=instanceId=="123"`, and the top-level `holdingsRecord` element of each returned record being included in the main record,

The master of the Instance schema is [on
GitHub](https://github.com/folio-org/mod-inventory/blob/master/ramls/instance.json),
but we therefore use instead [a modified local copy](inputs/instance.json).


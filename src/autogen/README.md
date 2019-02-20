# Autogeneration of GraphQL schemas and resolvers

<!-- md2toc -l 2 README.md -->
* [Introduction](#introduction)
* [RAMLs and JSON Schemas](#ramls-and-json-schemas)
* [Schema inclusion](#schema-inclusion)
* [Representing actionable links between objects](#representing-actionable-links-between-objects)
    * [Option 1: JSON Schema extensions](#option-1-json-schema-extensions)
    * [Option 2: JSON Hyper-Schema](#option-2-json-hyper-schema)
        * [Issues with JSON Hyper-Schema](#issues-with-json-hyper-schema)


## Introduction

We want to have mod-graphql configure itself by auto-generating its GraphQL schemas and resolvers based on the RAMLs and JSON Schemas that describe the underlying services.


## RAMLs and JSON Schemas

In the world of describing RESTful web-services, two kinds of files are involved: RAMLs describe the entry-points and sets of arguments which define the API; and JSON Schemas describe the format of the data. RAMLs link to JSON Schemas, and these link to each other as necessary to describe sub-structures.

By contrast, in GraphQL, a single interface file exists, the GraphQL schema, which describes both the entry-points and the available fields and sub-records.

Therefore, in order to generate GraphQL schemas, it will be necessary to start with FOLIO services' RAMLs, and follow through to the relevant JSON Schemas. The former will map to query names, with their parameter sets, within the GraphQL schema's `Query` type' and the latter will provide the structures of types and fields.


## Schema inclusion

Including one JSON Schema in another is achieved using [the special `$ref` key](https://spacetelescope.github.io/understanding-json-schema/structuring.html), whose value is a [JSON Pointer](https://tools.ietf.org/html/rfc6901). JSON Pointers can take many forms, but in FOLIO we are using JSON Schemas in the context of a RAML, which we need in order to define the endpoints that will become GraphQL queries.

Because our RAMLs and JSON Schemas are also consumed by the [RAML Module Builder](https://github.com/folio-org/raml-module-builder), they also need to conform to an RMB-specific convention. The RAML declares in its header _all_ the JSON Schemas that are going to be used, both directly and indirectly, giving a name to the contents of each: the schemas that are referenced are then able to further reference each other. For example, [the RAML for the address-types endpoint](https://github.com/folio-org/raml/blob/master/ramls/mod-users/addressTypes.raml) declares:

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

[That schema](https://github.com/folio-org/raml/blob/master/schemas/mod-users/addresstype.json) lists fields including `metadata`, which itself is of a type defined by another of the schemas, `../metadata.schema`:

	"metadata" : {
	  "$ref" : "../metadata.schema",
	  "readonly" : true
	}

That `$ref` only works in RMB because `../metadata.schema` was defined in the RAML. The pre-declaration is not needed by the GraphQL Schema generator, but needs to be present in FOLIO RAMLs because oh their dual use.


## Representing actionable links between objects

Not all the information we need is included in standard RAML and JSON Schema: for example, nothing in the Instance schemas says that there are a set of holdings records associated with it, let alone how to find those holdings records. Accordingly, we will use extensions to JSON Schema. (It suffices to use RAML in its standard form.)

There are two candidate approaches: custom JSON Schema extensions, or using the draft JSON Hyper-Schema standard. At present, the software supports the former; issue [MODGQL-26](https://issues.folio.org/browse/MODGQL-26) is concerned with deciding whether JSON Hyper-Schema can give us a better way to express the same information.


### Option 1: JSON Schema extensions

Since we are not using the standard form of JSON Schema, we will use the custom URL `https://github.com/folio-org/mod-graphql/json-schema` for the `$schema` identifier, in accordance with [section 6.4 of the specification](http://json-schema.org/latest/json-schema-core.html#rfc.section.6.4). We do not yet have a meta-schema, but may introduce one later.

The JSON Schema specification rather unhelpfully [says](http://json-schema.org/latest/json-schema-core.html#rfc.section.4.3.2):

> JSON Schema does not provide any formal namespacing system, but also does not constrain keyword names, allowing for any number of namespacing approaches.

We therefore use our own convention for extension keywords, giving them names prefixed with `folio:`. We tentatively introduce the following:

Keyword | Example | Description
--- | --- | ---
`folio:linkFromField` | "id" | If this is defined, then the field is a link field, and all the three following keywords must also be included. When the GraphQL resolver encounters this field, the value of the specified field in the main record is used as the query key in a search for linked records to be included.
`folio:linkBase` | "holdings-storage/holdings" | The base path at which searches that discover linked records are found. Should not include the leading `http:/` or hostname.
`folio:linkToField` | "instanceId" | The field within linked records that is searched for a value identical to that of the master record's link-from field.
`folio:includedElement` | "holdingsRecords" | The field within linked records which is extracted and included as the linked content within the constructed master record. May be a dot-separated path of multiple indexes to be navigated, working down from the top: for example, `"holdingsRecords.0"` yields only the first element (element 0) of the holdings-records array.

As an example, a field with the specified keywords and values in the table above, and having `id` equal to `123`, would result in fetching subrecords from `/holdings-storage/holdings?query=instanceId=="123"`, and the top-level `holdingsRecord` element of each returned record being included in the main record.

The master copy of the inventory-storage module's schema is [on GitHub](https://github.com/folio-org/mod-inventory-storage/blob/master/ramls/instance-storage.raml). So is [the master of the Instance schema](https://github.com/folio-org/mod-inventory-storage/blob/master/ramls/instance.json),
but we use instead the modified copies of these files, and others, that are on [the `graphql` branch](https://github.com/folio-org/mod-inventory-storage/blob/graphql/ramls/).


### Option 2: JSON Hyper-Schema

At first glance, [the JSON Hyper-Schema specification](http://json-schema.org/latest/json-schema-hypermedia.html) seems to give us exactly what we need. The specification explains that:

> The primary mechanism introduced for specifying links is the Link Description Object (LDO), which is a serialization of the abstract link model defined in [RFC 8288, section 2](https://tools.ietf.org/html/rfc8288#section-2).

The LDO is [described in detail](http://json-schema.org/latest/json-schema-hypermedia.html#rfc.section.6) in the specification, but the principal fields include:

* `rel` -- a short string describing how the linked resource is related to the present one.
* `href` -- the location of the linked resource, expressed using a templating syntax to include the values of fields from the present record.
* `templateRequired` -- a list of fields whose presence for templating is mandatory.

The mandatory `rel` field can contain one of the many predefined short strings listed in [Link Relations](https://www.iana.org/assignments/link-relations/link-relations.xhtml), but the only one that seems approriate to our case is `related`, which is described merely as "Identifies a related resource". It is described in a little more detail in [section 4.2.7.2 of RFC 4287](https://tools.ietf.org/html/rfc4287#section-4.2.7.2), but this is still rather vague. It may be better for us to define our own values expressing _how_ the linked records are related -- e.g. "holdings records associated with an instance". If we do this, these more specific relations [should be expressed as URIs](https://tools.ietf.org/html/rfc8288#section-2.1.2): for example, `http://folio.org/relations/instance-holdings`.

The mandatory `href` field can contain sequences of the form `{NAME}`, which are substituted with the value of the specified field from the current record. For example, the query `/holdings-storage/holdings?query=instanceId=="123"` from the previous section could be generated, for a record with ID 123, using `"href": "/holdings-storage/holdings?query=instanceId=={id}"`.

(When substituting into such templates, absent fields are treated as empty strings. To force them to throw an error instead, they can be included in the array that is the value of the `templateRequired` field: in this case, `["id"]`.)

However, the details are less encouraging.

#### Issues with JSON Hyper-Schema

XXX links specified separately from fields

XXX implication of pointing to single record

XXX specifying which part of the result structure to take -- maybe doable with hash fragments?

XXX impossible to generate reverse links without parsing the `href`

XXX what else?


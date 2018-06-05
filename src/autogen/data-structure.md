# Intermediate data-structure for RAML-to-GraphQL conversion

<!-- md2toc -l 2 data-structure.md -->
* [Description](#description)
    * [Top level](#top-level)
    * [Comments](#comments)
    * [Resources](#resources)
    * [Types](#types)
* [Examples](#examples)
    * [Two string fields, one of them optional](#two-string-fields-one-of-them-optional)
    * [Array of strings](#array-of-strings)


RAML documents with their associated schemas are awkward to traverse and require a great deal of resolution: referenced JSON schemas, the sub-schemas that they contain, and so on. Sadly, various issues with the available libraries that perform these tasks mean that none of this is straightforward: for example, each `$ref` in a JSON schema has to be explicitly rewritten so it can find the referenced schema relative to the correct path.

We therefore compile all of this to a much simpler "Abstract Representation Object", or ARO, which contains all and only the information that we need to generate GraphQL schemas and resolver.

This document describes that structure. The ARO for a given RAML-with-JSON-Schemas can be seen by running `raml2graphql` with the `-v` command-line option, as in:

	./raml2graphql -v test/input/12-array-of-scalars.raml



## Description


### Top level

The ARO is represented as a JavaScript object with three keys:

* `comments` -- information that is of interest, which which in a GraphQL schema can only be represented as a comment: for example, the title and version of the RAML API. See [**Comments** below](#comments).
* `resources` -- See [**Resources** below](#resources).
* `types` -- See [**Types** below](#types).


### Comments

The set of comments is represented by a JavaScript array. Each element is itself an array of two elements:

0. The name of the comment (`title`, `version`, etc.)
1. The values of the comment. This is either null (if the RAML does not contain the relevant keyword) or an array containing zero or more string values.


### Resources

The set of resources is represented by a JavaScript array. Each element is a JavaScript object with the following keys:

* `level` (integer) -- an indication of how far down the hierarchy of RAML resources this was found: 0 for a top-level resource such as `/instance-storage`, 1 for a contained resource such as `/instance-storage/instances`, 2 for `/instance-storage/instances/{instanceId}`, etc. (Not presently used by the graphQL generators.)
* `queryName` (string) -- a human-readable name for the resource, generated from the RAML path but suitable for used as a GraphQL query.
* `args` (array) -- a list of the arguments that may be provided when querying the resource. Each is a three-element array with the following elements:
  0 (string) -- the name of the parameter.
  1 (string) -- the type of the parameter, which is either a simple GraphQL type such as `'Integer'` or the name of one of the types defined in the `types` array (see [below](#types)).
  2 (boolean) -- an indication of whether the argument is required when querying the resource.
* `type` (string) -- the type of the returned document when performing an HTTP GET on the resource. This is the name of the one of the types that are the keys of the `types` array (see [below](#types)).


### Types

The set of types is represented by a JavaScript object. The keys are the names of types used by operations, and the corresponding values are the types themselves.

A type is represented by an ordered array of zero or more fields. Each field is itself a four-element object with the following keys:

* `name` (string) -- the name of the field within its type (not necessarily globally unique).
* `mandatory` (boolean) -- if true, indicates that the present field is mandatory within the type; otherwise false.
* `arrayDepth` (integer) -- the number of levels of array nesting containing the object. This is usually 0, for simple objects, and occasionally 1, for arrays. It can be 2 for arrays of arrays, etc.
* `type` -- maybe either a string containing the name of a simple GraphQL type such as `'String'` or `'Int'`; or it may be another high-level type, which is itself represented by an array like that of the containing type.



## Examples


### Two string fields, one of them optional

Consider [a simple RAML API with associated schema](test/input/02-required-clause.raml): it provides a single resource, `/person`, the response for which contains two string fields: `name` is mandatory, and `address` is optional. The types array for this is represented as follows:
<!-- ./raml2graphql test/input/02-required-clause.raml -->

	"types": {
	  "Tgenerated1": [
	    {
	      "name": "address",
	      "required": false,
	      "arrayDepth": 0,
	      "type": "String"
	    },
	    {
	      "name": "name",
	      "required": true,
	      "arrayDepth": 0,
	      "type": "String"
	    }
	  ]
	}


### Array of strings

Consider an API like the previous one, but [with an additional optional field, `aliases`](test/input/12-array-of-scalars.raml). The types array is now represented as:

<!-- ./raml2graphql test/input/12-array-of-scalars.raml -->

	"types": {
	  "Tgenerated1": [
	    {
	      "name": "address",
	      "required": false,
	      "arrayDepth": 0,
	      "type": "String"
	    },
	    {
	      "name": "aliases",
	      "required": false,
	      "arrayDepth": 1,
	      "type": "String"
	    },
	    {
	      "name": "name",
	      "required": true,
	      "arrayDepth": 0,
	      "type": "String"
	    }
	  ]
	}



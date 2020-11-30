# create-schemas

This area contains a stand-alone utility that downloads the RAMLs and JSON Schemas for specified FOLIO back-end modules and applies overrides to them that direct mod-graphql on how to follow links. This constitutes an implementation of [MODGQL-122](https://issues.folio.org/browse/MODGQL-122). It is done entirely outside of `mod-graphql` itself, so that the new code is not a change to the software itself, but a new option for deployment.


## Overview

In short, you write [a JSON configuration file](schemaconf.json) specifying which back-end modules are to be supported, which releases of those modules to use, and what overlays to add to the canonical versions of the release's JSON Schemas. Then you run [the `create-schemas.js` script](create-schemas.js). It will download the RAMLS and JSON schemas of the specified releases of the specified modules, then apply the overlays specified in the configuration. `mod-graphql` can then be run against the resulting overlaid schemas which can include whatever new links we need. (As a bonus, this also implements a much more terse way of specifying link-fields in a single line -- see below.)


## Configuration file format

The configuration file is a JSON structure.

At the top level is an array containing one entry for each FOLIO back-end module that is to be supported.

Each entry is an object with three keys:
* `module` -- the name of the module: specifically, the name of the GitHub repository in which its source-code is found, which is almost always the same thing. Example: `mod-inventory-storage`
* `release` -- the three-part (_major_._minor_._patch_) version-number of the release to be used. Example: `19.4.0`
* `overlays` (optional): an array of overlays to be applied to the JSON Schemas of the module. See below. If omitted, then the RAMLs and JSON Schemas of the module are used as they appear in the specified release.

The `overlays` value is an object whose keys are the names of JSON Schema files in the module's `ramls` directory. Example: `instance.json`.

The values corresponding to these keys are themselves objects.

The keys in these objects are JSONPaths specifying where in the `properties` part of the JSON Schema the overlay is to be inserted. When the new link-field is to be at the top level (the most common case), it is simply the name of the new link-field element, e.g. `instanceTypeObject`. If it is further down the hierarchy, then it will be a `.`-separated sequence such as `alternativeTitles.items.properties.alternativeTitleTypeObject`.

Finally, the values associated with these JSONPaths are the overrides themselves, to be inserted into the schemas at the specific point. They can take two forms:
* They may be objects, in which case they are simply inserted as-is. This allows [the usual virtual-field elements](../src/autogen/README.md#option-1-json-schema-extensions) to be specified, but can also be used to insert any other object into the schema should the need arise.
* They may be specified as a single string as detailed below.

Overlay strings must be of the form "_schemaRef_ _linkBase_?_linkToField_=_linkFromField_ _includedElement_". This indicates a link yielding an object of the type specified by _schemaRef_, obtained by searching the Okapi service at _linkBase_ by the field called _linkToField_, using the value of the _linkFromField_ in the linked-from record and extracting the _includedElement_ part of the resulting response.

For example, the overlay string `callnumbertype.json call-number-types?id=itemLevelCallNumberTypeId callNumberTypes.0` specifies a link-field of the type specified by `callnumbertype.json`, obtained by searching `/call-number-types` by `id`, using the value of the linked-from record's `itemLevelCallNumberTypeId` field, and extracting `callNumberTypes.0` (i.e. the first element of the `callNumberTypes` array) from the response.


## Invocation

The script is run specifying the name of the configuration file as the only command-line argument, e.g.

	create-schemas.js schemaconf.json

As a result, each module whose name is specified in the configuration file appears as a directory of that name within the current working directory, each such module containing only a `ramls` directory, and that directory containing its contents as of the specified release as modified by the specified overlays.

Three command-line options are recognised, together with their negations:

* `--fetch`/`--no-fetch` (off by default): if true, force a re-fetch of the modules' RAML and JSON Schema files; otherwise, these files are fetched only if not already present.

* `--rewrite`/`--no-rewrite` (off by default): if true, then the JSON Schemas will be rewritten but the overlays not applied. This results in JSON Schemas that are semantically equivalent to those in the released modules, but with the format canonicalised.

* `--overlay`/`--no-overlay` (off by default): if true, then the overlays specified in the configuration file are applied; otherwise they are not.


## Using the resulting RAMLs and JSON Schemas

As usual, `mod-graphql` itself is configured by listing on its command-line the RAML files that should be supported in its GraphQL Schema (and so, implicitly, the JSON Schemas that those RAMLs reference). So if `create-schemas` is run in, say, a `schemas` subdirectory of `mod-graphql`, you might start the service using:

	LOGCAT=listen,url yarn start schemas/mod-*/ramls/*.raml


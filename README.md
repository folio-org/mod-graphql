# mod-graphql

Copyright (C) 2017-2020 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

[![Build Status](https://travis-ci.org/folio-org/mod-graphql.svg?branch=master)](https://travis-ci.org/folio-org/mod-graphql)

<!-- md2toc -l 2 README.md -->
* [Overview](#overview)
* [Installation](#installation)
* [Invocation](#invocation)
    * [Driving `mod-graphql` from an API file](#driving-mod-graphql-from-an-api-file)
* [Environment](#environment)
    * [`OKAPI_URL`, `OKAPI_TENANT`, `OKAPI_TOKEN`](#okapi_url-okapi_tenant-okapi_token)
    * [`PROXY_OKAPI_URL`](#proxy_okapi_url)
    * [`GRAPHQL_OPTIONS`](#graphql_options)
    * [`LOGGING_CATEGORIES`](#logging_categories)
    * [`RAML_DIR`](#raml_dir)
    * [`RAML_SKIP`](#raml_skip)
    * [`RAML_MATCH`](#raml_match)
    * [`RAML_EXCLUDE`](#raml_exclude)
    * [`CONSOLE_TRACE`](#console_trace)
    * [`NODE_OPTIONS`](#node_options)
* [Additional information](#additional-information)


## Overview

`mod-graphql` is a [FOLIO module](https://github.com/folio-org/okapi/blob/master/doc/guide.md#architecture), written in Node.js, that provides a [GraphQL](https://graphql.org/) service by HTTP POST to `/graphql/`. It can be interrogated using any GraphQL client library, such as [Apollo](https://github.com/apollographql/apollo-client/), and the graph it provides is auto-generated from the API description files ([RAML](https://raml.org/) and [JSON Schema](https://json-schema.org/)) of the modules that it's providing the GraphQL API for.

Using GraphQL instead of the individual modules' low-level RESTful WSAPIs makes it possible to link between different kinds of API object using rich structured queries such as the following, which finds bibliographic instances of books with "baby" in the title, and returns them along with the associated holdings statements and the barcodes of the individual items in each holding:

```
query {
  instance_storage_instances(query: "title=baby") {
    totalRecords
    instances {
      title
      holdingsRecords2 {
        callNumber
        holdingsItems {
          barcode
        }
      }
    }
  }
}
```

# Running `mod-graphql`

## Installation

It's the usual drill for an NPM module. First, install dependencies:

```
$ yarn install
```

Then run the tests:

```
$ yarn test
```


## Invocation

You can start `mod-graphql` using `yarn start`, providing as additional command-line arguments the paths to one or more RAML files that describe the APIs to be provided via GraphQL. For example:
```
yarn start ../mod-inventory-storage/ramls/instance-storage.raml
```

The module's functioning is affected by several environment variables, as detailed [below](#environment), so in practice a more typical invocation might be:
```
env OKAPI_URL=http://localhost:9130 LOGCAT=listen,url yarn start ../mod-inventory-storage/ramls/i*-storage.raml
```
<!--
Some FOLIO RAMLs that this can work on:
* ../mod-inventory-storage/ramls/instance-storage.raml
* ../mod-inventory-storage/ramls/item-storage.raml
* ../mod-inventory-storage/ramls/classification-type.raml
* ../mod-inventory-storage/ramls/locationunit.raml
* ../mod-inventory/ramls/inventory.raml
Some that presently fail:
* ../raml/ramls/mod-users/users.raml
-->

The simplest way to exercise the running module is by using [`folio-graphiql`](https://github.com/folio-org/folio-graphiql), a browser-based client for querying with GraphQL. See that module's documentation for details, and consult [Example GraphQL queries](doc/example-queries.md) for some ways to get started.

In addition to the main `mod-graphql` module, a commandline program `raml2graphql` is provided, which translates a set of RAML files, together with their referenced JSON Schemas, into a GraphQL schema which is emitted on standard output. The RAML files to be translated are provided as command-line arguments; further options can be seen by running `raml2graphql` with no arguments.

### Driving `mod-graphql` from an API file

Instead of listing all the RAML files to be handled on the command-line, it's possible to start `mod-graphql` in mode that begins by reading an API file that lists the RAMLs of the modules that are to be included. To do this, use the `-a` command-line options, followed the path to an API file, like this:

```
env RAML_DIR=.. RAML_SKIP=1 OKAPI_URL=http://localhost:9130 LOGCAT=listen,url yarn start -a api.yml
```

When started in this mode, `mod-graphql` assembles the list of RAMLs from the specified API file, and this assembly process is affected by the values of several evironment variables described below:
[`RAML_DIR`](#raml_dir),
[`RAML_SKIP`](#raml_skip)
and
[`RAML_MATCH`](#raml_match).

API files are written in YAML, and are described in the FOLIO document [How to configure the generation of API documentation](https://dev.folio.org/faqs/how-to-configure-api-doc-generation/). The FOLIO project maintains [A master API file](https://github.com/folio-org/folio-org.github.io/blob/master/_data/api.yml) describing the RAMLs of all the core FOLIO modules: the simplest way to create an API file for given installation of `mod-graphql` may be to copy that file and remove the parts that are not needed.


## Environment

The operation of `mod-graphql` is affected by several environment variables:

### `OKAPI_URL`, `OKAPI_TENANT`, `OKAPI_TOKEN`

These are used in the standard way, as with for example [the Okapi command-line client](https://github.com/thefrontside/okapi.rb):

* `OKAPI_URL`: specifies the URL of the Okapi service which is contacted in order to perform the underlying WSAPI operations needed to respond to GraphQL queries. When not specified, the Okapi URL is determined from the `X-Okapi-URL` header in the requests that are sent to `mod-graphql`, i.e. low-level WSAPI requests are sent to the same Okapi that sent the high-level GraphQL request. Typical value: `http://localhost:9130`.
* `OKAPI_TENANT`: specifies the name of a FOLIO tenant enabled for the specified Okapi service, which is used for all WSAPI operations. Typical value: `diku`.
* `OKAPI_TOKEN`: used to provide the value of a token from an established Okapi session associated with the specified tenant. Typical value: `eyJhbGciOiJIUzUx...v76BSXSlPh-m9AQA`.

If these are not explicitly set in the environment, their values are taken from a `.env` file in the working directory, if that file exists.

See [**Run mod-graphql in the host box**](doc/developing-with-a-vagrant-box.md#b-run-mod-graphql-in-the-host-box) for the required use of the `OKAPI_URL` environment variable when running Okapi inside a VM and mod-graphql outside it.

### `PROXY_OKAPI_URL`

Required _only_ when [regenerating test tapes](doc/recording-tests.md). This is the URL of an Okapi instance which the yakbak library shoud proxy for, providing the Okapi service from which WSAPI tapes are made.

### `GRAPHQL_OPTIONS`

A comma-separated list of options, each of which can affect the operation of `mod-graphql` in various ways:

* `allowSchemaless` -- when set, endpoints that define no schema are simply ignored, rather than throwing an error. This is useful when working with an incompletely specified RAML file, such as one to which the JSON Schemas are being added progressively.
* `ignoreSchemaMapsWithInlineSchemas` -- mod-graphql does not support parsing of schema maps when one or more of the schemas is inclued inline in the RAML rather than pulled in from an external file. Usually the existence of an inline schema is a fatal error, but when this option is set it instead causes the schema-map to be empty. **This should only be used when running the test suite**.
* `ignoreRamlWarnings` -- By default, any error or warning in parsing a RAML file or its associated JSON Schemas results in an immediate exit with exit-value 2. When this option is set, an exit is caused only by errors, not by warnings. Necessary for some non-lint-clean RAMLs.

### `LOGGING_CATEGORIES`

Choose which categories of logging you want to see by running with the `LOGGING_CATEGORIES` environment variable set to comma-separated list of categories. The following are supported (listed here in the order that that they occur during a run):

* `skip` -- log names of RAML files that are skipped from the API list due to their not being present on the filesystem.
* `nomatch` -- log names of RAML files that are omitted from the API list due to their not matching the specified regular expression.
* `exclude` -- log names of RAML files that are excluded from the API list due to their matching the specified regular expression.
* `nomulti` -- log names of RAML file sections that are omitted from the API list due to their having `multiple: true` in their specification.
* `ramllist` -- log the names of the RAML files generated from the API list.
* `ramlpath` -- log the paths of the RAML files to be loaded.
* `endmap` -- log when the list of schemas parsed from a RAML reaches an unexpected end.
* `schemamap` -- log the RAML file's implied map from top-level schema identifiers to their directories.
* `raml` -- log the RAML file as initially loaded, before conversion to a GraphQL schema begins.
* `nojson` -- log WSAPI endpoints in the RAML for which there is no JSON body specification. Such endpoints are not necessarily errors, and are skipped in translating the RAML, but may indicate an incomplete specification.
* `schema` -- log when a schema is registered, and just before trying to read a schema file.
* `replace` -- log when a JSON Schema is encountered for the second or subsequent time, as the code declines to replace the first version.
* `api`: log a JSON rendition of the gathered API specification. Useful for debugging. Or, more specifically:
  * `api.comments`: log a JSON rendition of only the `comments` portion of the gathered API specification.
  * `api.resources`: log a JSON rendition of only the `comments` portion of the gathered API specification.
  * `api.types`: log a JSON rendition of only the `comments` portion of the gathered API specification.
* `schema` -- log the generated GraphQL schema before starting to execute it.
* `listen` -- log when the serve is about to start listening.
* `failsub` -- log a resolver's failure to substitute an argument or field-value into a path.
* `url` -- log each WSAPI URL before trying to fetch it.
* `result` -- log the result of each GET.

For convenience, the abbreviated environment-variable name `LOGCAT` may be used instead of `LOGGING_CATEGORIES`, with the same effect.

### `RAML_DIR`

When driving `mod-graphql` from an API file, that file will specify the relative locations of the various modules' RAML files. The `RAML_DIR` environment variable specifies what directory they are to be interpreted relative to. For example, if `mod-graphql` is checked out alongside the various modules that it will be providing services for, `RAML_DIR=..` will allow an API-file reference to the `mod-inventory-storage` module's `ramls` directory, containing a file `holdings-storage`, to be interpreted as pertaining to
`../mod-inventory-storage/ramls/holdings-storage.raml`.

### `RAML_SKIP`

When driving `mod-graphql` from an API file, RAML files that are referenced from the API file but do not exist in the filesystem cause a fatal error. If `RAML_SKIP` is set to a non-zero value, such files are simply skipped (and the fact is logged using the `skip` category).

### `RAML_MATCH`

When driving `mod-graphql` from an API file, the selection of RAML files can be limited to only those that match a regular expression specified by the `RAML_MATCH` environment variable. For example, `RAML_MATCH='^mod-(inventory.*|users)$'` will use only the RAML files from the `mod-inventory`, `mod-inventory-storage` and `mod-users` modules.

### `RAML_EXCLUDE`

When driving `mod-graphql` from an API file, the selection of RAML files can be trimmed by omitting those that match a regular expression specified by the `RAML_EXCLUDE` environment variable. For example, `RAML_EXCLUDE='^raml'` will omit the RAML files from the `raml` and `raml-module-builder` modules.

### `CONSOLE_TRACE`

When set to a true value (e.g. `1`), causes every output to the console to be accompanied by a full stack-trace. This can be useful when tracking down the cause of a warning.

### `NODE_OPTIONS`

If you are getting this warning all over your output:

> [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.

You can get rid of it by run Node with the with `--no-deprecation` command-line option. The simplest way to do this is to set `NODE_OPTIONS=--no-deprecation`.


## Additional information

Other documentation for users of `mod-graphql`:

* [The change-log](CHANGELOG.md) for this module.
* Documentation on [using GraphQL from Stripes](doc/using-graphql-from-stripes.md)
* [Example GraphQL queries](doc/example-queries.md) that this module can run.

Documentation for developers of the module:

* [Developing with the Vagrant box](doc/developing-with-a-vagrant-box.md)
* [Recording tests](doc/recording-tests.md)
* Documentation of [the schema/resolver auto-generation code](src/autogen/README.md), including [the JSON Schema extensions for link-fields](src/autogen/README.md#option-1-json-schema-extensions).
* Documentation of [the intermediate in-memory representaton of a compiled API](src/autogen/data-structure.md), only of interest to mod-graphql developers.
* [How to remove running modules](doc/remove-running-modules.md) from a FOLIO installation: useful if you need to substitute your own in-development module. This is an important document, but should be part of core FOLIO documentation, not part of mod-graphql.

Also:

* [`folio-graphiql`](https://github.com/folio-org/folio-graphiql), a graphical client for exploring the data that can be returned by mod-graphql. Useful for testing and demos.

### Other documentation

Other [modules](https://dev.folio.org/source-code/) are described,
with further FOLIO Developer documentation at [dev.folio.org](https://dev.folio.org/)

### Issue tracker

See project [MODGQL](https://issues.folio.org/browse/MODGQL)
at the [FOLIO issue tracker](https://dev.folio.org/guidelines/issue-tracker).


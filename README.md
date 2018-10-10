# mod-graphql

[![Build Status](https://travis-ci.org/folio-org/mod-graphql.svg?branch=master)](https://travis-ci.org/folio-org/mod-graphql)

<!-- md2toc -l 2 README.md -->
* [Introduction](#introduction)
* [Installation](#installation)
* [Running](#running)
* [Recording Tests](#recording-tests)
* [Environment](#environment)
    * [`OKAPI_URL`, `OKAPI_TENANT`, `OKAPI_TOKEN`](#okapi_url-okapi_tenant-okapi_token)
    * [`PROXY_OKAPI_URL`](#proxy_okapi_url)
    * [`LEGACY_RESOLVERS`](#legacy_resolvers)
    * [`GRAPHQL_OPTIONS`](#graphql_options)
    * [`LOGGING_CATEGORIES`](#logging_categories)
    * [`CONSOLE_TRACE`](#console_trace)
    * [`NODE_OPTIONS`](#node_options)
* [See also](#see-also)


## Introduction

`mod-graphql` is a [FOLIO module](https://github.com/folio-org/okapi/blob/master/doc/guide.md#architecture) that provides a [GraphQL](https://graphql.org/) service. It can be interrogated using any GraphQL client library, such as [Apollo](https://github.com/apollographql/apollo-client/), and the graph it provides is auto-generated from API the description files ([RAML](https://raml.org/) and [JSON Schema](https://json-schema.org/)) of the modules that it's providing the GraphQL API for. Using GraphQL instead of the individual modules' low-level RESTful WSAPIs makes it possible to link between different kinds of API object using rich structured queries such as the following, which finds bibliographic instances of books with "baby" in the title, and returns them along with the associated holdings statements and the barcodes of the individual items in each holding:

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

## Installation

Install dependencies:

```
$ yarn install
```

Run the tests:

```
$ yarn test
```

## Running

XXX

## Recording Tests

`mod-graphql` uses the [yakbak][1] library to record interactions with
an okapi cluster. That way, there is no need to have a server up and
running in order to run the tests.

In order to re-record tests:

1. delete the `/tests/tapes` directory
2. startup your okapi gateway
3. log into to obtain a token
4. Create a file in your project root called `.env` and place the
values for your running gateway url, your tenant and your token inside
of it like so:

``` shell
PROXY_OKAPI_URL=http://localhost:9130
OKAPI_TENANT=diku
OKAPI_TOKEN=abc123
```

5. Execute the tests by running `yarn test`

This will deposit new tapes with the recorded HTTP interactions into
the `/tests/tapes` directory which you can then check back into version.

[1]: https://github.com/flickr/yakbak


## Environment

The operation of `mod-graphql` is affected by several environment variables:

### `OKAPI_URL`, `OKAPI_TENANT`, `OKAPI_TOKEN`

These are used in the standard way, as with for example [the Okapi command-line client](https://github.com/thefrontside/okapi.rb):

* `OKAPI_URL`: specifies the URL of the Okapi service which is contacted in order to perform the underlying WSAPI operations needed to respond to GraphQL queries. When not specified, the Okapi URL is determined from the `X-Okapi-URL` header in the requests that are sent to `mod-graphql`, i.e. low-level WSAPI requests are sent to the same Okapi that sent the high-level GraphQL request. Typical value: `http://localhost:9130`.
* `OKAPI_TENANT`: specifies the name of a FOLIO tenant enabled for the specified Okapi service, which is used for all WSAPI operations. Typical value: `diku`.
* `OKAPI_TOKEN`: used to provide the value of a token from an established Okapi session associated with the specified tenant. Typical value: `eyJhbGciOiJIUzUx...v76BSXSlPh-m9AQA`.

See [above](#b-run-mod-graphql-in-the-host-box) for the required use of the `OKAPI_URL` environment variable when running Okapi inside a VM and mod-graphql outside it.

### `PROXY_OKAPI_URL`

Required _only_ when [regenerating test tapes](#recording-tests). This is the URL of an Okapi instance which the yakbak library shoud proxy for, providing the Okapi service from which WSAPI tapes are made.

### `LEGACY_RESOLVERS`

**Deprecated**. When set to a true value (e.g. `1`), causes `mod-graphql` to use a hand-coded GraphQL schema and corresponding hand-coded resolvers, which were created in early development and are no longer used. These are retained for now as they enable us to run more tests than the auto-generated schema and resolvers yet allow, but will be removed in time.

### `GRAPHQL_OPTIONS`

A comma-separated list of options, each of which can affect the operation of `mod-graphql` in various ways:

* `allowSchemaless` -- when set, endpoints that define no schema are simply ignored, rather than throwing an error. This is useful when working with an incompletely specified RAML file, such as one to which the JSON Schemas are being added progressively.

### `LOGGING_CATEGORIES`

Choose which categories of logging you want to see by running with the `LOGGING_CATEGORIES` environment variable set to comma-separated list of categories. The following are supported (listed here in the order that that they occur during a run):

* `ramlpath` -- log the paths of the RAML files to be loaded.
* `raml` -- log the RAML file as initially loaded, before conversion to a GraphQL schema begins.
* `nojson` -- log WSAPI endpoints in the RAML for which there is no JSON body specification. Such endpoints are not necessarily errors, and are skipped in translating the RAML, but may indicate an incomplete specification.
* `replace` -- log when a JSON Schema is encountered for the second or subsequent time, as the code declines to replace the first version.
* `api`: log a JSON rendition of the gathered API specification. Useful for debugging. Or, more specifically:
  * `api.comments`: log a JSON rendition of only the `comments` portion of the gathered API specification.
  * `api.resources`: log a JSON rendition of only the `comments` portion of the gathered API specification.
  * `api.types`: log a JSON rendition of only the `comments` portion of the gathered API specification.
* `schema` -- log the generated GraphQL schema before starting to execute it.
* `failsub` -- log a resolver's failure to substitute an argument or field-value into a path.
* `url` -- log each WSAPI URL before trying to fetch it.
* `result` -- log the result of each GET.

For convenience, the abbreviated environment-variable name `LOGCAT` may be used instead of `LOGGING_CATEGORIES`, with the same effect.

### `CONSOLE_TRACE`

When set to a true value (e.g. `1`), causes every output to the console to be accompanied by a full stack-trace. This can be useful when tracking down the cause of a warning.

### `NODE_OPTIONS`

If you are getting this warning all over your output:

> [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.

You can get rid of it by run Node with the with `--no-deprecation` command-line option. The simplest way to do this is to set `NODE_OPTIONS=--no-deprecation`.

## See also

Other documentation for mod-graphql:

* [The change-log](CHANGELOG.md) for this module.
* [Example GraphQL queries](doc/example-queries.md) that this module can run.
* [Developing with the Vagrant box](doc/developing-with-a-vagrant-box.md)
* Documentation of [the schema/resolver auto-generation code](src/autogen/README.md), including [the JSON Schema extensions for link-fields](src/autogen/README.md#option-1-json-schema-extensions).
* Documentation of [the intermediate in-memory representaton of a compiled API](src/autogen/data-structure.md), only of interest to mod-graphql developers.
* **INCOMPLETE** [documentation on using GraphQL from Stripes](doc/using-graphql-from-stripes.md)
* [How to remove running modules](doc/remove-running-modules.md) from a FOLIO installation: useful if you need to substitute your own in-development module. This is an important document, but should be part of core FOLIO documentation, not part of mod-graphql.

Also:

* [`folio-graphiql`](https://github.com/folio-org/folio-graphiql), a graphical client for exploring the data that can be returned by mod-graphql. Useful for testing and demos.


<!-- indir ~/git/folio/other/mod-graphql/ env OKAPI_URL=http://localhost:9130 LOGCAT=url yarn start ../mod-inventory-storage/ramls/instance-storage.raml ../mod-inventory-storage/ramls/item-storage.raml -->
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

# Using GraphQL from Stripes

<!-- md2toc -l 2 using-graphql-from-stripes.md -->
* [Overview](#overview)
* [Adding support for new complex elements](#adding-support-for-new-complex-elements)


## Overview

FOLIO UI code is written in [ES6](http://es6-features.org/), a modern dialect of JavaScript, using [the Stripes framework](https://github.com/folio-org/stripes). In order to access GraphQL services such as that provided by `mod-graphql`, Stripes modules can use whatever ES6-compatible method they wish, including:
* Direct HTTP POSTing using `fetch`
* Facebook's [Relay library](https://facebook.github.io/relay/)
* [The low-level Apollo library](https://github.com/apollographql/apollo-client)
* [Many other options](https://medium.com/open-graphql/exploring-different-graphql-clients-d1bc69de305f)

However, so far we have been using `react-apollo`, [the React integration of Apollo](https://github.com/apollographql/react-apollo), so that's what we'll describe here.


## Using Apollo from a Stripes module

Just as your module uses [stripes-connect](https://github.com/folio-org/stripes-connect/) by declaring a manifest, wrapping the component in a `connect` HOC and then accesses the `resource` prop provided by the data layer, so you use Apollo by wrapping the component in the `graphql` HOC and accessing the `data` prop. There is no direct analogue of the `stripes-connect` manifest. Instead, the GraphQL query is passed into the HOC; however, it is often convenient to define the text of that query statically.

Here are the steps:

* Add `graphql-tag` and `react-apollo` to your module's package file. (Re-run `yarn install` to get them.)
* Modify the component that will use a GraphQL query:
   1. Import `{ graphql } from 'react-apollo'` and `gql from 'graphql-tag';`
   2. Define a constant, `QUERY` say, containing the compiled query. This is most easy done using [the `gql` tag](https://github.com/apollographql/graphql-tag).
   3. Add `data: PropTypes.shape({ ... })` to your component's property-types.
   4. Instead of `export default MyComponent`, wrap this as `export default graphql(QUERY)(MyComponent)`.
   5. Modify your `render` method to use the `props.data` returned from the GraphQL service.
* If you're using the `<SearchAndSort>` component, pass in `parentData={this.props.data}` and other related properties (see [changes to `ui-inventory`'s top-level instance search](https://github.com/folio-org/ui-inventory/compare/graphql#diff-4607535f1932998053a49d2935e23738R307).
* If your component was previously using stripes-connect, rip out the manifest, the `connect` wrapping and the references to `props.resources`.

In fact, idiosyncrasies of `react-apollo` require a slightly more complex wrapping than implied in step 4 above:

	export default graphql(QUERY, {
	  options: props => ({
	    notifyOnNetworkStatusChange: true,
	    errorPolicy: 'all',
	  }),
	})(MyComponent);

These options are necessary to get the client library to respond helpfully to various classes of error.

## Adding support for new complex elements

When adding support for an additional complex element in an existing type -- a new nested layer -- you do not need to make any changes on the server side, as the existing RAMLs and JSON Schemas already describe the capability of the underlying back-end modules. But you do need to modify the client code.

Here, we use the example of adding items within the holdings records associated with instances, which required [a change to `ui-inventory`](https://github.com/folio-org/ui-inventory/commit/a9849790a3d9d66d4e34f078482c1da3e0778fa8).

In the GraphQL query sent by the client -- typically declared using a `gql` tag -- add the new element _including all the desired subelements_. In the present case, this means adding `holdingsItems` within the request for `holdingsRecords`.

Including the sub-elements is easy to overlook -- and very difficult to diagnose, because in this case `mod-graphql` simply does not return the newly added elements, and issues no diagnostics. It's quite right to behave this way: it's doing exactly what the client code is requesting. (If you think you detect here the kind of wisdom that comes only by experience, you are quite correct.)


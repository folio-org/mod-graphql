# Using GraphQL from Stripes

<!-- md2toc -l 2 using-graphql-from-stripes.md -->
* [Overview](#overview)
* [Adding support for new complex elements](#adding-support-for-new-complex-elements)
    * [GraphQL schema](#graphql-schema)
    * [GraphQL resolver](#graphql-resolver)
    * [Client component](#client-component)


## Overview

XXX To be written


## Adding support for new complex elements

When adding support for an additional complex element in an existing type -- a new nested layer -- you need to make changes in several places. Here, we use the example of adding items within the holdings records associated with instances.

### Client component

XXX ui-inventory commit a9849790a3d9d66d4e34f078482c1da3e0778fa8

In the GraphQL query sent by the client -- typically declared using a `gql` tag -- add the new element _including all its subelements_. In the present case, this means adding `holdingsItems` within the request for `holdingsRecords`.

This very easy to overlook -- and very difficult to diagnose, because in this case mod-graphql simply does not return the newly added elements, and issues no diagnostics. It's quite right to behave this way: it's doing exactly what the client code is requesting. If you think you detect here the kind of wisdom that comes only by experience, you are quite correct.

Irritatingly, it's necessary to explicitly specify _within_ the new element the names of all the fields you want to see, even though that's usually all of them. This, too, is obviously correct: it's part of GraphQL's flexibility that you can tell it precisely what elements you do and don't want to obtain.


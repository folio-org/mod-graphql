# Using GraphQL from Stripes

<!-- md2toc -l 2 using-graphql-from-stripes.md -->
* [Overview](#overview)
* [Adding support for new complex elements](#adding-support-for-new-complex-elements)


## Overview

XXX To be written


## Adding support for new complex elements

When adding support for an additional complex element in an existing type -- a new nested layer -- you do not need to make any changes on the server side, as the existing RAMLs and JSON Schemas already describe the capability of the underlying back-end modules. But you do need to modify the client code.

Here, we use the example of adding items within the holdings records associated with instances, which required [a change to `ui-inventory`](https://github.com/folio-org/ui-inventory/commit/a9849790a3d9d66d4e34f078482c1da3e0778fa8).

In the GraphQL query sent by the client -- typically declared using a `gql` tag -- add the new element _including all the desired subelements_. In the present case, this means adding `holdingsItems` within the request for `holdingsRecords`.

Including the sub-elements is easy to overlook -- and very difficult to diagnose, because in this case `mod-graphql` simply does not return the newly added elements, and issues no diagnostics. It's quite right to behave this way: it's doing exactly what the client code is requesting. (If you think you detect here the kind of wisdom that comes only by experience, you are quite correct.)


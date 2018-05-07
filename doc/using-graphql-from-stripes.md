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

### GraphQL schema

XXX mod-graphql commit 75c3d7c502296a8814d6632b0389c165849e9042

In mod-graphql's schema -- currently [../src/schema.js](`../src/schema.js`), add the new element to the type that contains it. You will also need to add the type of the element.

In the present case, it was necessary to add `holdingsItems: [Item]` to the `HoldingsRecord` type; and to add the new `Item` type referenced that that addition.

**Note.** It is _not_ necessary to create a new variant of the containing type (`FullHoldingsRecord`, for example). Simply add the new fields to the existing type (`HoldingsRecord` in this case). The cliebt will request only the elements it wants, so no additional work will be done for existing clients that do not request the new elements.

### GraphQL resolver

XXX mod-graphql commit 48164cf17d640a4449abdd821513ec65abcc110d

Update (and create, if necessary) the resolver for the containing type (here, `HoldingsRecord`), adding an entry for the newly added element (in this case, `holdingsItems`). This must fetch the necessary records from Okapi.

It is not _necessarily_ required to add any resolver code for the new type itself (here, `Item`) -- it may suffice to use the default resolver that directly translates the data from Okapi JSON.

### Client component

XXX ui-inventory commit a9849790a3d9d66d4e34f078482c1da3e0778fa8

In the GraphQL query sent by the client -- typically declared using a `gql` tag -- add the new element _including all its subelements_. In the present case, this means adding `holdingsItems` within the request for `holdingsRecords`.

This very easy to overlook -- and very difficult to diagnose, because in this case mod-graphql simply does not return the newly added elements, and issues no diagostics. It's quite right to behave this way: it's doing exactly what the client code is requesting. If you think you detect here the kind of wisdom that comes only by experience, you are quite correct.

Irritatingly, it's necessary to explicitly specify _within_ the new element the names of all the fields you want to see, even though that's usually all of them. This, too, is obviously correct: it's part of GraphQL's flexibility that you can tell it precisely what elements you do and don't want to obtain.


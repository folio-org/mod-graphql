# Entities associated with inventory records

We need to establish which ID in the inventory record could usefully be looked up and dereferenced, so we can provide link information in their JSON Schemas. The following tables catalogue these fields with the following columns:

1. Field-names identified by looking at JSON Schemas, their derived GraphQL schemas, and [example instance records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json).
2. The names of resources defined in the manifests of relevant `ui-inventory` source files, which in many cases correspond directly with ID fields in the records.
3. Names of settings pages that administer relevant linked entites.
4. Indicates which fields are present in the backend VM's sample records. Blank indicates that this has not yet been assessed.
5. Indicates whether the link-field has been specified in the schemas (`S`), tested in mod-graphql (`T`), or not yet handled (blank). `No` indicates a conscious decision not to implement.


## Instance record

| Inventory-record field                   | Instances.js manifest resource | Settings page entries     | Present? | Done?
| ---------------------------------------- | ------------------------------ | ------------------------- | -------- | -
| alternativeTitles.alternativeTitleTypeId | alternativeTitleTypes          | Alternative title types   | absent   |
| classifications.classificationTypeId     | classificationTypes            | _[hardcoded]_             | Y        | T
| contributors.contributorNameTypeId       | contributorNameTypes           | _[hardcoded]_             | Y        | T
| contributors.contributorTypeId           | contributorTypes               | Contributor types         | absent   |
| electronicAccess.relationshipId          | electronicAccessRelationships  | URL relationship          | absent   |
| identifiers.identifierTypeId             | identifierTypes                | _[hardcoded]_             | Y        | T
| instanceFormatIds                        | instanceFormats                | Formats                   | absent   |
| instanceTypeId                           | instanceTypes                  | Resource types            | Y        | S
| metadata.createdByUserId                 |                                | [Users app]               | Y        | No
| metadata.updatedByUserId                 |                                | [Users app]               | Y        | No
| modeOfIssuanceId                         | issuanceModes                  | _[hardcoded]_             | absent   |
| statisticalCodeIds                       | statisticalCodes               | Statistical codes         | absent   |
| statusId                                 | instanceStatuses               | Instance status types     | absent   |

**Note.** The `electronicAccess.relationshipId` field looks like it _should_ contain a UUID that links into a controlled vocabulary of electronic access relationships; but in [the present set of sample records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json), it has values like "Resource" or "Version of resource".

**Note.** We are not going to support the users mentioned in metadata, both here and in the holdings and items records described below in GraphQL, for two reasons. First, there are `createdByUserName` and `updatedByUserName` fields what should be populated (though they presently are not); and second, because to do this properly would involve looking up the users in mod-users, and we don't want to introduce a cross-module dependency here.


## Holdings record

| Holdings-record field                    | ViewHoldingsRecord.js resource | Settings page entries     | Present? | Done?
| ---------------------------------------- | ------------------------------ | ------------------------- | -------- | -
| callNumberTypeId                         | callNumberTypes                |                           | absent   |
| holdingsTypeId                           | holdingsTypes                  |                           | absent   |
| illPolicyId                              | illPolicies                    |                           | absent   |
| metadata.createdByUserId                 |                                |                           | Y        | No
| metadata.updatedByUserId                 |                                |                           | Y        | No
| holdingsNoteTypeId                       |                                |                           | absent   |
| permanentLocationId                      |                                |                           | Y        | T
| temporaryLocationId                      |                                |                           | absent   |
| statisticalCodeIds                       |                                |                           | absent   |


## Item record

| Item-record field                        | ViewItem.js resource           | Settings page entries     | Present? | Done?
| ---------------------------------------- | ------------------------------ | ------------------------- | -------- | -
| itemDamagedStatusId                      |                                |                           |          |
| itemLevelCallNumberTypeId                |                                |                           |          |
| itemNoteTypeId                           |                                |                           |          |
| metadata.createdByUserId                 |                                |                           | Y        | No
| metadata.updatedByUserId                 |                                |                           | Y        | No
| permanentLoanTypeId                      |                                |                           |          |
| permanentLocationId                      |                                |                           |          |
| statisticalCodeIds                       |                                |                           |          |
| temporaryLoanTypeId                      |                                |                           |          |
| temporaryLocationId                      |                                |                           |          |


## Location record

| Location-record field                    | ViewItem.js resource           | Settings page entries     | Present? | Done?
| ---------------------------------------- | ------------------------------ | ------------------------- | -------- | -
| campusId                                 |                                |                           | Y        | T
| institutionId                            |                                |                           | Y        | T
| libraryId                                |                                |                           | Y        | T
| servicePointIds                          |                                |                           |          |



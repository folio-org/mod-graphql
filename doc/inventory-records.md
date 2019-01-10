# Entities associated with inventory records

We need to establish which ID in the inventory record could usefully be looked up and dereferenced, so we can provide link information in their JSON Schemas. The following tables catalogue these fields with the following columns:

1. Indicates whether the link-field has been specified in the schemas (`S`), tested in mod-graphql (`T`), or not yet handled (blank).
2. Field-names identified by looking at JSON Schemas, their derived GraphQL schemas, and [example instance records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json).
3. The names of resources defined in the manifests of relevant `ui-inventory` source files, which in many cases correspond directly with ID fields in the records.
4. Names of settings pages that administer relevant linked entites.
5. Indicates which fields are present in the backend VM's sample records.


## Instance record

|   | Inventory-record field                   | Instances.js manifest resource | Settings page entries     | In records?
| - | ---------------------------------------- | ------------------------------ | ------------------------- | -----------
|   | alternativeTitles.alternativeTitleTypeId | alternativeTitleTypes          | Alternative title types   | absent
| T | classifications.classificationTypeId     | classificationTypes            | _[hardcoded]_             | Y
| T | contributors.contributorNameTypeId       | contributorNameTypes           | _[hardcoded]_             | Y
|   | contributors.contributorTypeId           | contributorTypes               | Contributor types         | absent
|   | electronicAccess.relationshipId          | electronicAccessRelationships  | URL relationship          | absent
| T | identifiers.identifierTypeId             | identifierTypes                | _[hardcoded]_             | Y
|   | instanceFormatIds                        | instanceFormats                | Formats                   | absent
| S | instanceTypeId                           | instanceTypes                  | Resource types            | Y
|   | metadata.createdByUserId                 |                                | [Users app]               | Y
|   | metadata.updatedByUserId                 |                                | [Users app]               | Y
|   | modeOfIssuanceId                         | issuanceModes                  | _[hardcoded]_             | absent
|   | statisticalCodeIds                       | statisticalCodes               | Statistical codes         | absent
|   | statusId                                 | instanceStatuses               | Instance status types     | absent

**Note.** The `electronicAccess.relationshipId` field looks like it _should_ contain a UUID that links into a controlled vocabulary of electronic access relationships; but in [the present set of sample records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json), it has values like "Resource" or "Version of resource".


## Holdings record

|   | Holdings-record field                    | ViewHoldingsRecord.js resource | Settings page entries     | In records?
| - | ---------------------------------------- | ------------------------------ | ------------------------- | -----------
|   | callNumberTypeId                         | callNumberTypes                |                           | absent
|   | holdingsTypeId                           | holdingsTypes                  |                           | absent
|   | illPolicyId                              | illPolicies                    |                           | absent
|   | metadata.createdByUserId                 |                                |                           | Y
|   | metadata.updatedByUserId                 |                                |                           | Y
|   | holdingsNoteTypeId                       |                                |                           | absent
|   | permanentLocationId                      |                                |                           | Y
|   | temporaryLocationId                      |                                |                           | absent
|   | statisticalCodeIds                       |                                |                           | absent


## Item record

|   | Item-record field                        | ViewItem.js resource           | Settings page entries     | In records?
| - | ---------------------------------------- | ------------------------------ | ------------------------- | -----------
|   | itemDamagedStatusId                      |                                |                           |
|   | itemLevelCallNumberTypeId                |                                |                           |
|   | itemNoteTypeId                           |                                |                           |
|   | metadata.createdByUserId                 |                                |                           | Y
|   | metadata.updatedByUserId                 |                                |                           | Y
|   | permanentLoanTypeId                      |                                |                           |
|   | permanentLocationId                      |                                |                           |
|   | statisticalCodeIds                       |                                |                           |
|   | temporaryLoanTypeId                      |                                |                           |
|   | temporaryLocationId                      |                                |                           |



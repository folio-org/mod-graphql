# Entities associated with inventory records

We need to establish which ID in the inventory record could usefully be looked up and dereferenced, so we can provide link information in their JSON Schemas. The following tables catalogue these fields.

* The first column indicates whether the link-field has been specified in the schemas (`S`), tested in mod-graphql (`T`), or not yet handled (blank).
* The second column contains field-names identified by looking at [example instance records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json).
* The third column contains the names of resources defined in the manifest of `ui-inventory/src/Instances.js`, which in many cases correspond directly with ID fields in the records.
* The fourth column shows the names of settings pages that administer relevant linked entites.
* The fifth column indicates which fields are present in the instance-storage JSON Schema.
* The sixth column indicates which fields are present in the backend VM's sample records.


## Instance record

|   | Inventory-record field                | ui-instances manifest resource | Settings page entries     | In schema? | In records?
| - | ------------------------------------- | ------------------------------ | ------------------------- | ---------- | -----------
|   | alternativeTitles.alternativeTitleTypeId | alternativeTitleTypes       | Alternative title types   | Y          | absent
| T | classificationTypeId                  | classificationTypes            | _[hardcoded]_             | Y          | Y
| T | identifierTypeId                      | identifierTypes                | _[hardcoded]_             | Y          | Y
|   | metadata.createdByUserId              |                                |                           | Y          | Y
|   | metadata.updatedByUserId              |                                |                           | Y          | Y
|   | modeOfIssuanceId                      | issuanceModes                  | _[hardcoded]_             | Y          | absent
|   | statusId                              | instanceStatuses               | Instance status types     | Y          | absent
| T | contributorNameTypeId                 | contributorNameTypes           | _[hardcoded]_             | Y          | Y
|   | contributorTypeId                     | contributorTypes               | Contributor types         | Y          | absent
|   | electronicAccess.relationshipId _[1]_ | electronicAccessRelationships  | URL relationship          | Y          | absent
|   | instanceFormatIds                     | instanceFormats                | Formats                   | Y          | absent
|   | _[2]_                                 | instanceRelationshipTypes      | _[hardcoded]_             | absent     | N/A
| S | instanceTypeId                        | instanceTypes                  | Resource types            | Y          | Y
|   | _[3]_                                 | locations                      | Organization -> Locations | absent     | N/A
|   | statisticalCodeIds                    | statisticalCodes               | Statistical codes         | Y          | absent

**Notes**

_[1]_ The `electronicAccess.relationshipId` field looks like it _should_ contain a UUID that links into a controlled vocabulary of electronic access relationships; but in [the present set of sample records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json), it has values like "Resource" or "Version of resource".

_[2]_ Instance relationships are managed via a separte endpoint in the instance-storage module, are are not relevant to the present requirements.

_[3]_ Locations are in the holdings and/or item records?


## Holdings record

|   | Holdings-record field                 | ViewHoldingsRecord.js resource | Settings page entries     | In schema? | In records?
| - | ------------------------------------- | ------------------------------ | ------------------------- | ---------- | -----------
|   | callNumberTypeId                      | callNumberTypes                |                           | Y          | absent
|   | holdingsTypeId                        | holdingsTypes                  |                           | Y          | absent
|   | illPolicyId                           | illPolicies                    |                           | Y          | absent
|   | metadata.createdByUserId              |                                |                           | Y          | Y
|   | metadata.updatedByUserId              |                                |                           | Y          | Y
|   | holdingsNoteTypeId                    |                                |                           | Y          | absent
|   | permanentLocationId                   |                                |                           | Y          | Y
|   | temporaryLocationId                   |                                |                           | Y          | absent
|   | statisticalCodeIds                    |                                |                           | Y          | absent


## Item record

|   | Item-record field                     | ViewItem.js resource           | Settings page entries     | In schema? | In records?
| - | ------------------------------------- | ------------------------------ | ------------------------- | ---------- | -----------
|   | itemDamagedStatusId                   |                                |                           | Y          |
|   | itemLevelCallNumberTypeId             |                                |                           | Y          |
|   | itemNoteTypeId                        |                                |                           | Y          |
|   | metadata.createdByUserId              |                                |                           | Y          | Y
|   | metadata.updatedByUserId              |                                |                           | Y          | Y
|   | permanentLoanTypeId                   |                                |                           | Y          |
|   | permanentLocationId                   |                                |                           | Y          |
|   | statisticalCodeIds                    |                                |                           | Y          |
|   | temporaryLoanTypeId                   |                                |                           | Y          |
|   | temporaryLocationId                   |                                |                           | Y          |



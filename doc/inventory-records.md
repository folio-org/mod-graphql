# Entites associated with inventory records

We need to establish which ID in the inventory record could usefully be looked up and dereferenced, so we can provide link information in their JSON Schemas. The following table catalogues these fields.

* The first column contains field-names identified by looking at [example instance records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json).

* The second column contains the names of resources defined in the manifest of `ui-inventory/src/Instances.js`, which in many cases correspond directly with ID fields in the records.

* The third column shows the names of settings pages that administer relevant linked entites.

| Inventory-record field | ui-instances manifest resource | Settings page entries
| ---------------------- | ------------------------------ | ---------------------
| alternativeTitleTypeId | alternativeTitleTypes          | Alternative title types
| classificationTypeId   | classificationTypes            |
| createdByUserId        |                                |
| identifierTypeId       | identifierTypes                |
| modeOfIssuanceId       | issuanceModes                  |
| statusId               | instanceStatuses               | 
| updatedByUserId        |                                | Instance status types
| contributorNameTypeId  | contributorNameTypes           |
| contributorTypeId      | contributorTypes               | Contributor types
| electronicAccess.relationshipId _[1]_ | electronicAccessRelationships  | URL relationship
| instanceFormatIds _[2]_ | instanceFormats                | Formats
|                        | instanceRelationshipTypes      |
| instanceTypeId         | instanceTypes                  | Resource types
| _[3]_                  | locations                      |
|                        | statisticalCodeTypes           | Statistical code types
| statisticalCodeIds _[4]_ | statisticalCodes               | Statistical codes

**Notes**

_[1]_ The `electronicAccess.relationshipId` field looks like it _should_ contain a UUID that links into a controlled vocabulary of electronic access relationships; but in [the present set of sample records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json), it has values like "Resource" or "Version of resource".

_[2]_ For some reason, `instanceFormatIds` is an array; but I have not seen a record in which it has more than one element.

_[3]_ Perhaps locations are in the holdings and/or item records?

_[4]_ For some reason, `statisticalCodeIds` is an array; but I have not seen a record in which it has more than one element.


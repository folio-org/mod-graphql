We need to establish which ID in the inventory record could usefully be looked up and dereferenced, so we can provide link information in their JSON Schemas. The following table catalogues these fields.

* The first column contains field-names identified by looking at [example instance records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json).

* The second column contains the names of resources defined in the manifest of `ui-inventory/src/Instances.js`, which in many cases correspond directly with ID fields in the records.

| Inventory-record field | ui-instances manifest resource | Settings page entries
| ---------------------- | ------------------------------ | ---------------------
| alternativeTitleTypeId | alternativeTitleTypes          | Alternative title types
| classificationTypeId   | classificationTypes            |
| createdByUserId        |                                |
| identifierTypeId       | identifierTypes                |
| modeOfIssuanceId       | issuanceModes                  |
| statusId               | instanceStatuses               | 
| updatedByUserId        |                                | Instance status types
|                        | contributorNameTypes           |
|                        | contributorTypes               | Contributor types
|                        | electronicAccessRelationships  | URL relationship
|                        | instanceFormats                | Formats
|                        | instanceRelationshipTypes      |
|                        | instanceTypes                  | Resource types
|                        | locations                      |
|                        | statisticalCodeTypes           | Statistical code types
|                        | statisticalCodes               | Statistical codes

# Entites associated with inventory records

We need to establish which ID in the inventory record could usefully be looked up and dereferenced, so we can provide link information in their JSON Schemas. The following table catalogues these fields.

* The first column contains field-names identified by looking at [example instance records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json).
* The second column contains the names of resources defined in the manifest of `ui-inventory/src/Instances.js`, which in many cases correspond directly with ID fields in the records.
* The third column shows the names of settings pages that administer relevant linked entites.
* The fourth column indicates which fields are absent from the instance-storage JSON Schema.

| Inventory-record field                | ui-instances manifest resource | Settings page entries   | In schema?
| ------------------------------------- | ------------------------------ | ----------------------- | ----------
| alternativeTitleTypeId                | alternativeTitleTypes          | Alternative title types | absent
| classificationTypeId                  | classificationTypes            | _[hardcoded]_
| createdByUserId                       |                                | | absent
| identifierTypeId                      | identifierTypes                | _[hardcoded]_
| modeOfIssuanceId                      | issuanceModes                  | _[hardcoded]_
| statusId                              | instanceStatuses               | Instance status types
| updatedByUserId                       |                                | | absent
| contributorNameTypeId                 | contributorNameTypes           | _[hardcoded]_
| contributorTypeId                     | contributorTypes               | Contributor types
| electronicAccess.relationshipId _[1]_ | electronicAccessRelationships  | URL relationship
| instanceFormatIds _[2]_               | instanceFormats                | Formats
| _[3]_                                 | instanceRelationshipTypes      | _[hardcoded]_ | absent
| instanceTypeId                        | instanceTypes                  | Resource types
| _[4]_                                 | locations                      | Organization &rarr; Locations | absent
| statisticalCodeTypeId                 | statisticalCodeTypes           | Statistical code types
| statisticalCodeIds _[5]_              | statisticalCodes               | Statistical codes | absent

**Notes**

_[1]_ The `electronicAccess.relationshipId` field looks like it _should_ contain a UUID that links into a controlled vocabulary of electronic access relationships; but in [the present set of sample records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json), it has values like "Resource" or "Version of resource".

_[2]_ For some reason, `instanceFormatIds` is an array; but I have not seen a record in which it has more than one element.

_[3]_ Instance relationships are managed via a separte endpoint in the instance-storage module, are are not relevant to the present requirements.

_[4]_ Perhaps locations are in the holdings and/or item records?

_[5]_ For some reason, `statisticalCodeIds` is an array; but I have not seen a record in which it has more than one element.


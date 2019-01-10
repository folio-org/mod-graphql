# Entities associated with inventory records

We need to establish which ID in the inventory record could usefully be looked up and dereferenced, so we can provide link information in their JSON Schemas. The following table catalogues these fields.

* The first column indicates whether the link-field has been specified in the schemas (`S`), tested in mod-graphql (`T`), or not yet handled (blank).
* The second column contains field-names identified by looking at [example instance records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json).
* The third column contains the names of resources defined in the manifest of `ui-inventory/src/Instances.js`, which in many cases correspond directly with ID fields in the records.
* The fourth column shows the names of settings pages that administer relevant linked entites.
* The fifth column indicates which fields are present in the instance-storage JSON Schema.
* The sixth column indicates which fields are present in the backend VM's sample records.

|   | Inventory-record field                | ui-instances manifest resource | Settings page entries         | In schema? | In records?
| - | ------------------------------------- | ------------------------------ | ----------------------------- | ---------- | -----------
|   | alternativeTitleTypeId                | alternativeTitleTypes          | Alternative title types       | absent     | absent
| T | classificationTypeId                  | classificationTypes            | _[hardcoded]_                 | Y          | Y
|   | createdByUserId                       |                                |                               | absent     | Y
| T | identifierTypeId                      | identifierTypes                | _[hardcoded]_                 | Y          | Y
|   | modeOfIssuanceId                      | issuanceModes                  | _[hardcoded]_                 | Y          | absent
|   | statusId                              | instanceStatuses               | Instance status types         | Y          | absent
|   | updatedByUserId                       |                                |                               | absent     | Y
| T | contributorNameTypeId                 | contributorNameTypes           | _[hardcoded]_                 | Y          | Y
|   | contributorTypeId                     | contributorTypes               | Contributor types             | Y          | absent
|   | electronicAccess.relationshipId _[1]_ | electronicAccessRelationships  | URL relationship              | Y          | absent
|   | instanceFormatIds _[2]_               | instanceFormats                | Formats                       | Y          | absent
|   | _[3]_                                 | instanceRelationshipTypes      | _[hardcoded]_                 | absent     | N/A
| S | instanceTypeId                        | instanceTypes                  | Resource types                | Y          | Y
|   | _[4]_                                 | locations                      | Organization &rarr; Locations | absent     | N/A
|   | statisticalCodeTypeId                 | statisticalCodeTypes           | Statistical code types        | Y          | XXX
|   | statisticalCodeIds _[5]_              | statisticalCodes               | Statistical codes             | absent     | absent

**Notes**

_[1]_ The `electronicAccess.relationshipId` field looks like it _should_ contain a UUID that links into a controlled vocabulary of electronic access relationships; but in [the present set of sample records](https://issues.folio.org/secure/attachment/15615/15615_UChicagoInstances_20181218+%282%29.json), it has values like "Resource" or "Version of resource".

_[2]_ For some reason, `instanceFormatIds` is an array; but I have not seen a record in which it has more than one element.

_[3]_ Instance relationships are managed via a separte endpoint in the instance-storage module, are are not relevant to the present requirements.

_[4]_ Perhaps locations are in the holdings and/or item records?

_[5]_ For some reason, `statisticalCodeIds` is an array; but I have not seen a record in which it has more than one element.


---

Then within the holdings record:

|   | Holdings-record field                 | ViewHoldingsRecord.js resource | Settings page entries         | In schema? | In records?
| - | ------------------------------------- | ------------------------------ | ----------------------------- | ---------- | -----------
|   | callNumberTypeId                      | callNumberTypes                |                               | Y          | absent
|   | holdingsTypeId                        | holdingsTypes                  |                               | Y          | absent
|   | illPolicyId                           | illPolicies                    |                               | Y          | absent
|   | createdByUserId                       |                                |                               | Y          | Y
|   | updatedByUserId                       |                                |                               | Y          | Y
|   | holdingsNoteTypeId                    |                                |                               | Y          | absent
|   | permanentLocationId                   |                                |                               | Y          | Y
|   | temporaryLocationId                   |                                |                               | Y          | absent
|   | statisticalCodeIds                    |                                |                               | Y          | absent

---

Then within the item record:

|   | Item-record field                     | ViewItem.js resource           | Settings page entries         | In schema? | In records?
| - | ------------------------------------- | ------------------------------ | ----------------------------- | ---------- | -----------
|   | itemDamagedStatusId
|   | itemLevelCallNumberTypeId
|   | itemNoteTypeId
|   | permanentLoanTypeId
|   | permanentLocationId
|   | statisticalCodeIds
|   | temporaryLoanTypeId
|   | temporaryLocationId


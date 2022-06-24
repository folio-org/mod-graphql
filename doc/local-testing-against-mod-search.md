# Local testing against mod-search

<!-- md2toc -l 2 local-testing-against-mod-search.md -->
* [1. Generate the mod-search RAMLs and JSON schemas](#1-generate-the-mod-search-ramls-and-json-schemas)
* [2. Run the server on the generated RAML](#2-run-the-server-on-the-generated-raml)
* [3. Use the graphical GraphQL client](#3-use-the-graphical-graphql-client)
    * [3a. Set query](#3a-set-query)
    * [3b. Set query variables](#3b-set-query-variables)
    * [3c. Set HTTP headers](#3c-set-http-headers)
    * [3d. Execute the query](#3d-execute-the-query)


## 1. Generate the mod-search RAMLs and JSON schemas

In `mod-graphql/create-schemas`:
```
make
```

## 2. Run the server on the generated RAML

In `mod-graphql` root:
```
$ LOGCAT=listen,url yarn start create-schemas/mod-search/ramls/mod-search-instances.raml 
```

## 3. Use the graphical GraphQL client

Go to http://localhost:3001/graphql in the browser

### 3a. Set query

Enter this query (or a cut-down version):
```
# Write your query or mutation here
query($cql: String, $offset: Int, $limit: Int) {
  search_instances(query: $cql, offset: $offset, limit: $limit) {
    totalRecords
    instances {
      alternativeTitles {
        alternativeTitle
        alternativeTitleTypeId
      }
      catalogedDate
      classifications {
        classificationNumber
        classificationTypeId
        classificationType {
          id
          name
          metadata {
            createdByUserId
            createdByUsername
            createdDate
            updatedByUserId
            updatedByUsername
            updatedDate
          }
        }
      }
      contributors {
        contributorNameTypeId
        contributorNameType {
          id
          name
          ordering
          metadata {
            createdByUserId
            createdByUsername
            createdDate
            updatedByUserId
            updatedByUsername
            updatedDate
          }
        }
        contributorTypeId
        contributorTypeText
        name
        primary
      }
      discoverySuppress
      editions
      electronicAccess {
        linkText
        materialsSpecification
        publicNote
        relationshipId
        uri
      }
      holdingsRecords2(limit: 100) {
        acquisitionFormat
        acquisitionMethod
        callNumber
        callNumberPrefix
        callNumberSuffix
        callNumberTypeId
        copyNumber
        digitizationPolicy
        discoverySuppress
        electronicAccess {
          linkText
          materialsSpecification
          publicNote
          relationshipId
          uri
        }
        formerIds
        # No need to loop back to holdingsInstance
        bareHoldingsItems(limit: 100) {
          accessionNumber
          barcode
          chronology
          copyNumber
          descriptionOfPieces
          discoverySuppress
          electronicAccess {
            linkText
            materialsSpecification
            publicNote
            relationshipId
            uri
          }
          enumeration
          formerIds
          # No need to loop back to holdingsRecordId
          hrid
          id
          inTransitDestinationServicePointId
          itemDamagedStatusDate
          itemDamagedStatusId
          itemIdentifier
          itemLevelCallNumber
          itemLevelCallNumberPrefix
          itemLevelCallNumberSuffix
          itemLevelCallNumberTypeId
          effectiveCallNumberComponents {
            callNumber
            prefix
            suffix
            typeId
          }
          materialTypeId
          metadata {
            createdByUserId
            createdByUsername
            createdDate
            updatedByUserId
            updatedByUsername
            updatedDate
          }
          missingPieces
          missingPiecesDate
          notes {
            itemNoteTypeId
            itemNoteType {
              id
              name
              source
            }
            note
            staffOnly
          }
          numberOfMissingPieces
          numberOfPieces
          permanentLocationId
          permanentLocation {
            campusId
            campus {
              code
              id
              institutionId # no need to resolve, it's redundant
              name
            }
            code
            description
            # Nothing known about the details subrecord
            discoveryDisplayName
            id
            institutionId
            institution {
              code
              id
              name
            }
            isActive
            libraryId
            library {
              code
              id
              name
            }
            metadata {
              createdByUserId
              createdByUsername
              createdDate
              updatedByUserId
              updatedByUsername
              updatedDate
            }
            name
            primaryServicePoint
            primaryServicePointObject {
              code
              description
              discoveryDisplayName
              id
              name
              pickupLocation
              shelvingLagTime
            }
            servicePointIds
            servicePoints {
              code
              description
              discoveryDisplayName
              id
              name
              pickupLocation
              shelvingLagTime
            }
          }
          statisticalCodeIds
          status {
            name
          }
          temporaryLoanTypeId
          temporaryLocationId
          temporaryLocation {
            campusId
            campus {
              code
              id
              institutionId # no need to resolve, it's redundant
              name
            }
            code
            description
            # Nothing known about the details subrecord
            discoveryDisplayName
            id
            institutionId
            institution {
              code
              id
              name
            }
            isActive
            libraryId
            library {
              code
              id
              name
            }
            metadata {
              createdByUserId
              createdByUsername
              createdDate
              updatedByUserId
              updatedByUsername
              updatedDate
            }
            name
            primaryServicePoint
            primaryServicePointObject {
              code
              description
              discoveryDisplayName
              id
              name
              pickupLocation
              shelvingLagTime
            }
            servicePointIds
            servicePoints {
              code
              description
              discoveryDisplayName
              id
              name
              pickupLocation
              shelvingLagTime
            }
          }
          volume
          yearCaption
        }
        holdingsStatements {
          note
          statement
        }
        holdingsStatementsForIndexes {
          note
          statement
        }
        holdingsStatementsForSupplements {
          note
          statement
        }
        holdingsTypeId
        hrid
        id
        illPolicyId
        instanceId
        metadata {
          createdByUserId
          createdByUsername
          createdDate
          updatedByUserId
          updatedByUsername
          updatedDate
        }
        notes {
          holdingsNoteType {
            id
            name
            source
          }
          holdingsNoteTypeId
          note
          staffOnly
        }
        numberOfItems
        permanentLocationId
        permanentLocation {
          campusId
          campus {
            code
            id
            institutionId # no need to resolve, it's redundant
            name
          }
          code
          description
          # Nothing known about the details subrecord
          discoveryDisplayName
          id
          institutionId
          institution {
            code
            id
            name
          }
          isActive
          libraryId
          library {
            code
            id
            name
          }
          metadata {
            createdByUserId
            createdByUsername
            createdDate
            updatedByUserId
            updatedByUsername
            updatedDate
          }
          name
          primaryServicePoint
          primaryServicePointObject {
            code
            description
            discoveryDisplayName
            id
            name
            pickupLocation
            shelvingLagTime
          }
          servicePointIds
          servicePoints {
            code
            description
            discoveryDisplayName
            id
            name
            pickupLocation
            shelvingLagTime
          }
        }
        receiptStatus
        receivingHistory {
          displayType
          entries {
            chronology
            enumeration
            publicDisplay
          }
        }
        retentionPolicy
        shelvingTitle
        statisticalCodeIds
        temporaryLocationId
      }
      hrid
      id
      identifiers {
        identifierTypeId
        identifierTypeObject {
          id
          name
          metadata {
            createdByUserId
            createdByUsername
            createdDate
            updatedByUserId
            updatedByUsername
            updatedDate
          }
        }
        value
      }
      indexTitle
      instanceFormatIds
      instanceFormats {
        id
        name
        code
        source
        metadata {
          createdByUserId
          createdByUsername
          createdDate
          updatedByUserId
          updatedByUsername
          updatedDate
        }
      }
      languages
      metadata {
        createdByUserId
        createdByUsername
        createdDate
        updatedByUserId
        updatedByUsername
        updatedDate
      }
      modeOfIssuanceId
      notes {
        note
        staffOnly
      }
      physicalDescriptions
      previouslyHeld
      publication {
        dateOfPublication
        place
        publisher
        role
      }
      publicationFrequency
      publicationRange
      series
      sourceRecordFormat
      staffSuppress
      statisticalCodeIds
      statusId
      statusUpdatedDate
      subjects
      title
    }
  }
}
```

### 3b. Set query variables

In the Query Variables area, enter:
```
{
  "cql": "hrid=inst000000000006"
}

```

### 3c. Set HTTP headers

In the HTTP Headers area, enter:
```
{
  "X-Okapi-Url": "http://localhost:9130",
  "X-Okapi-Tenant": "diku",
  "X-Okapi-Token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjgyNTQ2NTFmLWUwNTQtNWY4NS1hOGM4LWRmZDE4NzA3Yjg0OCIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2NTIzNzM0ODUsInRlbmFudCI6ImRpa3UifQ.dQ3medPn1ix1_clKD_ghSzlsF1nVM7V-y2rKbY6Kx5o"
}
```
(modifying the token to be one valid for an extant session.)

### 3d. Execute the query

Click the Play button.



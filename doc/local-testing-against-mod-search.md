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

Enter this query, which shows the holdings records associated with the instances that the query finds, and the items in those holdings:
```
query($cql: String, $offset: Int, $limit: Int) {
  search_instances(query: $cql, offset: $offset, limit: $limit) {
    totalRecords
    instances {
      hrid
      title
      holdingsRecords2(limit: 100) {
        hrid
        callNumber
        bareHoldingsItems(limit: 100) {
          hrid
          barcode
        }
      }
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



Get an access token from the FOLIO UI by inspecting the `folioAccessToken` cookie in any request. It will look like. `eyJhbGci...DnAX3RDk`.

Run the server as:

```
indir ~/git/folio/other/mod-graphql env LOGCAT=listen,url,result yarn node main.js create-schemas/mod-inventory-storage/ramls/instance-storage.raml
```

Exercise the server by exporting `OKAPI_TOKEN` with the token value from the UI, and running:
```
curl -H "Content-Type: application/json" -H "X-Okapi-URL: https://folio-snapshot-okapi.dev.folio.org" -H "X-Okapi-Tenant: diku" -H "X-Okapi-Token: $OKAPI_TOKEN" -X POST -d @query.graphql http://localhost:3001/graphql
```


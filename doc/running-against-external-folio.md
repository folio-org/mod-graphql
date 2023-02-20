Start mod-graphql:
```
LOGCAT=listen,url yarn start tests/schemas-for-tests/mod-inventory-storage/ramls/instance-storage.raml
```
Then use the playground UI that is served at http://localhost:3001/graphql alongside the WSAPI:

Query:
```
query {
  instance_storage_instances {
      instances {
      title
      contributors {
        name
      }
    }
  }
}
```
HTTP headers must be expressed as JSON object:
```
{
  "X-Okapi-URL":"https://folio-snapshot-okapi.dev.folio.org",
  "X-Okapi-Tenant":"diku",
  "X-Okapi-Token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6Ijk1NDFkNTQ2LTkxOTItNWVmNS05ZmMzLWE5MTg4YmM1OWJjMSIsImlhdCI6MTU5MjQ3NTQ4NywidGVuYW50IjoiZGlrdSJ9.AlH6f1RXswUHJFWtse-_tMLHT6ZmAuyD_Qh5H6zx-QI"
}
```
And of course fill in the token using one obtained from a real FOLIO session. One easy way is to login at https://folio-snapshot.dev.folio.org/ then go to **Settings** &rarr; **Developer** &rarr; **Set token** and copy the token out of the textbox.

Alternatively, assuming that the environment has been seeded by `okapi login; . ~/.okapi`, the same informtion can be encoded in a `curl` command:
```
curl \
        -H "X-Okapi-Url: $OKAPI_URL" \
        -H "X-Okapi-Tenant: $OKAPI_TENANT" \
        -H "X-Okapi-Token: $OKAPI_TOKEN" \
        -H "Content-Type: application/json" \
        -X POST \
        -d @query.graphql \
        localhost:3001/graphql | json_pp
```
(Instead of the old `okapi` CLI, it maybe better to use [`stripes-cli`](https://github.com/folio-org/stripes-cli/blob/master/doc/user-guide.md).)

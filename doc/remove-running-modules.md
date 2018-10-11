# Uninstalling a running module

In order to develop a back-end module in the context of a running FOLIO system -- most likely a `folio-testing-backend` Vagrant box -- it's necessary to remove the version of the same module that's already installed and running in the box. Typically, when doing this, we do not know any of the module or deployment IDs, only the module _name_.

Here we show how to do it for `mod-graphql`, but the same approach generalises to any module. Once we have configured the Okapi CLI, there are three steps: disassociate the module from the tenants that are using it, undeploy it, and remove its proxying information.

## Configure the Okapi CLI

If you don't already have [okapi.rb](https://github.com/thefrontside/okapi.rb), install it using `gem install okapi`. Then you need to tell it the URL of the Okapi instance you're interested in and the tenant to work with, and log in:
```
$ export OKAPI_URL=http://localhost:9130 OKAPI_TENANT=diku
$ okapi login
username: diku_admin
password: ****************
Login successful. Token saved to /Users/mike/.okapi
$
```

## Disassociate the module from the tenants that are using it

In practice, we currently use only the `diku` tenant, so it suffices to ask Okapi for the ID of our module within that tenant, and remove it.

```
$ okapi show /_/proxy/tenants/diku/modules | grep mod-graphql
    "id": "mod-graphql-0.1.100020"
$ okapi destroy --no-tenant /_/proxy/tenants/diku/modules/mod-graphql-0.1.100020
Successfully deleted /_/proxy/tenants/diku/modules/mod-graphql-0.1.100020
$
```

## Undeploy the module

We need to find the deployment descriptor for the running module, and extract from it both the service-ID and the instance-ID. We will need to use both to make the URL of the deployed instance, so we can remove it:

```
$ okapi show /_/discovery/modules | grep --context=2 mod-graphql-
  {
    "instId": "319d06e6-b4b7-4d35-8b97-ea7232681d11",
    "srvcId": "mod-graphql-0.1.100020",
    "nodeId": "10.0.2.15",
    "url": "http://10.0.2.15:9145",
$ okapi destroy --no-tenant /_/discovery/modules/mod-graphql-0.1.100020/319d06e6-b4b7-4d35-8b97-ea7232681d11
Net::HTTPNotFound: 319d06e6-b4b7-4d35-8b97-ea7232681d11
$
```

Although this `Net::HTTPNotFound` message looks like an error report, it seems to be indicating success: `vagrant ssh -- ps auxw | grep -i graphql` shows that no GraphQL module is running any more, and repeating the `okapi destroy` command results in a different error, confirming that the state has changed.

## Remove the module's proxying information

Once more, we need to discover the exact module-ID that is in use so that we can remove it:

```
$ okapi show /_/proxy/modules | grep graphql
    "id": "mod-graphql-0.1.100020",
$ okapi destroy --no-tenant /_/proxy/modules/mod-graphql-0.1.100020
Successfully deleted /_/proxy/modules/mod-graphql-0.1.100020
$
```

Now we are ready to [insert the local copy of our module](developing-with-a-vagrant-box.md#registering-with-okapi).

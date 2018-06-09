# mod-graphql

[![Build Status](https://travis-ci.org/folio-org/mod-graphql.svg?branch=master)](https://travis-ci.org/folio-org/mod-graphql)

## Development

Install dependencies:

```
$ yarn install
```

Run the tests:

```
$ yarn test
```

## Developing with the Vagrant box

It's often helpful to have a full FOLIO system to explore when extending the schema and resolvers; and to develop this service in a realistic setting. One convenient way is to share your checkout of this repo with the [Vagrant box](https://github.com/folio-org/folio-ansible#quick-start), run it inside that environment, and register it with the Okapi gateway there.

### Share this folder and run inside the VM

Add a line in your `Vagrantfile` expose this to the VM at `/mod-graphql`:
```
config.vm.synced_folder "/local/path/to/mod-graphql", "/mod-graphql"
```

You'll need to restart your VM for this to take effect if it was already running. You can do this using `vagrant halt && vagrant up`. Now when you run `vagrant ssh` to ssh into the VM, you can access the checkout at `/mod-graphql`. Start the GraphQL module:
```
host$ vagrant ssh
guest$ cd /mod-graphql
guest$ yarn start &
guest$ ^D
host$
```

### Registering with Okapi

This can be done with any tool that can send arbitrary HTTP requests, such as `curl`. However [okapi.rb](https://github.com/thefrontside/okapi.rb) is a handy CLI that makes this a bit less fiddly by understanding Okapi conventions. On most platforms `gem install okapi` should work, provided you have a new enough Ruby. For now the VM doesn't but that's okay as Vagrant forwards port 9130 into it so `localhost:9130` is getting to Okapi from your host machine too.

Before registering your local code you'll need to remove the mod-graphql instance that came with the VM. Currently that's a bit of a process as it doesn't have a fixed name and so is [documented separately](doc/remove-running-modules.md).

The commands below do the following:

1. Set up necessary environment variables
1. login to Okapi and cache the authentication token for subsequent requests
1. POST the module descriptor that registers mod-graphql and associates `/graphql` with it
1. POST the deployment descriptor that tells Okapi to just use the service in place at `http://127.0.0.1:3000` rather than attempt to deploy anything
1. POST the tenant association descriptor to activate the service for tenant `diku`


```
export OKAPI_URL=http://localhost:9130 OKAPI_TENANT=diku
okapi login
cat ModuleDescriptor.json | okapi --no-tenant create /_/proxy/modules
cat ExternalDeploymentDescriptor.json | okapi create --no-tenant /_/discovery/modules
cat TenantAssociationDescriptor.json| okapi --no-tenant create /_/proxy/tenants/diku/modules
```

To verify this worked, you can try a simple query to list a few users:
```
echo '{"query": "query { users { id, username } }"}' | okapi create /graphql
```
Or to search the users with CQL:
```
echo '{"query": "query { users(cql: \"username=al*\") { id, username } }"}' | okapi create /graphql
```
(See [a transcript of this process](doc/running-mod-graphql.txt).)

To reverse the steps and forget the service:
```
okapi destroy --no-tenant /_/proxy/tenants/diku/modules/mod-graphql-0.1.0
okapi destroy --no-tenant /_/discovery/modules/127.0.0.1-3000
okapi destroy --no-tenant /_/proxy/modules/mod-graphql-0.1.0
```

## Recording Tests

`mod-graphql` uses the [yakbak][1] library to record interactions with
an okapi cluster. That way, there is no need to have a server up and
running in order to run the tests.

In order to re-record tests:

1. delete the `/tests/tapes` directory
2. startup your okapi gateway
3. log into to obtain a token
4. Create a file in your project root called `.env` and place the
values for your running gateway url, your tenant and your token inside
of it like so:

``` shell
OKAPI_URL=http://localhost:9130
OKAPI_TENANT=diku
OKAPI_TOKEN=abc123
```

5. Execute the tests by running `yarn test`

This will deposit new tapes with the recorded HTTP interactions into
the `/tests/tapes` directory which you can then check back into version.

[1]: https://github.com/flickr/yakbak


## Environment

Choose which categories of logging you want to see by running with the `LOGGING_CATEGORIES` environment variable set to comma-separated list of categories. The following are supported:

* `failsub` -- note when substituting an argument or field-value into a path fails.
* `url` -- log each URL before trying to fetch it.
* `result` -- log the result of each GET.

If you are getting this warning all over your output:

> [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.

You can get rid of it by run Node with the with `--no-deprecation` command-line option. The simplest way to do this is to set `NODE_OPTIONS=--no-deprecation`.


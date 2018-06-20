# mod-graphql

[![Build Status](https://travis-ci.org/folio-org/mod-graphql.svg?branch=master)](https://travis-ci.org/folio-org/mod-graphql)

<!-- md2toc -l 2 README.md -->
* [Development](#development)
* [Developing with the Vagrant box](#developing-with-the-vagrant-box)
    * [A. Run `mod-graphql` inside the Vagrant box](#a-run-mod-graphql-inside-the-vagrant-box)
    * [B. Run `mod-graphql` in the host box](#b-run-mod-graphql-in-the-host-box)
    * [Registering with Okapi](#registering-with-okapi)
* [Recording Tests](#recording-tests)
* [Environment](#environment)
* [See also](#see-also)


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

It's often helpful to have a full FOLIO system to explore when extending the schema and resolvers; and to develop this service in a realistic setting. One convenient way is to use a pre-built [Vagrant box](https://github.com/folio-org/folio-ansible#quick-start) that is running Okapi and a set of back-end services. It's then necessary to get your local installation of `mod-graphql` running within that Okapi-moderated system. There are two basic approaches to this.

### A. Run `mod-graphql` inside the Vagrant box

To do this, you need to share your host box's `mod-graphql` folder. Add a line in your `Vagrantfile` to expose this directory to the VM at `/mod-graphql`:
```
config.vm.synced_folder "/local/path/to/mod-graphql", "/mod-graphql"
```

If your VM was already running, you'll need to restart it for this to take effect. You can do this using `vagrant halt && vagrant up`. Now when you run `vagrant ssh` to ssh into the VM, you can access the checkout at `/mod-graphql`. Start the GraphQL module:

```
host$ vagrant ssh
guest$ cd /mod-graphql
guest$ yarn start &
guest$ ^D
host$
```

This runs on port 3001 by default.

### B. Run `mod-graphql` in the host box

As an alternative, you may find it simpler to work on `mod-graphql` in your own computer, but arrange for it to be visible to the Vagrant box. You can do this using ssh tunnelling. Edit your host machine's `.ssh/config` and add the lines:

```
Host 127.0.0.1
RemoteForward 3000 127.0.0.1:3001
```

Now when you ssh into the Vagrant box -- for example, using `vagrant ssh` -- as a side-effect, a tunnel will be established connecting port 3001 on the guest box to port 3001 on the host box.

When running in this way, `mod-graphql` will not be able to call back to Okapi using the address that it provides in its `X-Okapi-Url` header, because that will be defined in a way that is only valid within the Vagrant box. So you must override the use of this header by providing an `OKAPI_URL` environment variable that tells `mod-graphql` where to find Okapi. Start it like this:

```
host$ cd .../mod-graphql
host$ OKAPI_URL=http://localhost:9130 yarn start
```

### Registering with Okapi

Whether you use method A or B, you will need to tell Okapi on the Vagrant box where to find the running `mod-graphql`. This is done the same way in either case, since both of them result in the VM having access to the GraphQL service on port 3001.

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
echo '{"query": "query { users(query: \"username=al*\") { id, username } }"}' | okapi create /graphql
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

See [above](#b-run-mod-graphql-in-the-host-box) on the `OKAPI_URL` environment variable.

## See also

[`folio-graphiql`](https://github.com/folio-org/folio-graphiql), a graphical client for exploring the data that can be returned by mod-graphql. Useful for testing and demos.


<!-- indir ~/git/folio/other/mod-graphql/ env OKAPI_URL=http://localhost:9130 LOGGING_CATEGORIES=url yarn start -->

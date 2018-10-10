# Recording Tests

`mod-graphql` uses [the yakbak library](https://github.com/flickr/yakbak) to record interactions with an okapi cluster. That way, there is no need to have a server up and running in order to run the tests.

In order to re-record tests:

1. Delete the `/tests/tapes` directory
2. Start up your okapi gateway
3. Log into Stripes to obtain a token, and find that token in the developer tools
4. Create a file in your project root called `.env` and place the values for your running gateway url, your tenant and your token inside of it like so:

``` shell
PROXY_OKAPI_URL=http://localhost:9130
OKAPI_TENANT=diku
OKAPI_TOKEN=abc123
```

5. Execute the tests by running `yarn test`

This will deposit new tapes with the recorded HTTP interactions into
the `/tests/tapes` directory which you can then check back into version.

# Example queries against mod-inventory-storage

<!-- md2toc -l 2 example-queries.md -->
* [Setup](#setup)
* [Queries](#queries)
    * [List all instances](#list-all-instances)
    * [Fetch a single instance](#fetch-a-single-instance)
    * [Specify instance ID as a variable instead of inline](#specify-instance-id-as-a-variable-instead-of-inline)
    * [Search for instances whose titles have words beginning with "z"](#search-for-instances-whose-titles-have-words-beginning-with-z)
    * [Obtain holdings records for instances](#obtain-holdings-records-for-instances)
    * [Obtain item records for holdings of instances](#obtain-item-records-for-holdings-of-instances)
    * [Link back from item to holdings record](#link-back-from-item-to-holdings-record)
    * [Get holdings record for items](#get-holdings-record-for-items)
    * [Get holdings record and instance for items](#get-holdings-record-and-instance-for-items)
    * [Fetch the title of a single item's instance](#fetch-the-title-of-a-single-items-instance)
* [Using `curl` from the command-line](#using-curl-from-the-command-line)
* [Using `curl` against a local Docker-containerised `mod-graphql`](#using-curl-against-a-local-docker-containerised-mod-graphql)


## Setup

Run the server as follows, enabling it to support queries defined by either the instances or items RAML:

	$ env OKAPI_URL=http://localhost:9130 yarn start ../mod-inventory-storage/ramls/instance-storage.raml ../mod-inventory-storage/ramls/item-storage.raml

Then start [folio-graphiql](https://github.com/folio-org/folio-graphiql), log in, and try these queries:


## Queries

### List all instances

	query {
	  instance_storage_instances {
	    totalRecords
	    instances {
	      id title
	    }
	  }
	}

### Fetch a single instance

Note that this `instance_storage_instances` query -- unlike the `instance_storage_instances` query above -- an parameter _must_ be included: in this case, `instanceId`, the UUID of a record to show.

	query {
	  instance_storage_instances_SINGLE(instanceId: "69640328-788e-43fc-9c3c-af39e243f3b7") {
	    id title
	  }
	}

### Specify instance ID as a variable instead of inline

Instead of hardwiring parameter values into your GraphQL query, it's sometimes preferable to provide them separately, as the values of _variables_ which get plugged into the query. For this to work, you need to declare which variables you're going to use and what their types are, which you do in a parenthesized list after the `query` header. So to run the previous query using a variable, set the GraphQL query to:

	query ($id:String!) {
	  instance_storage_instances_SINGLE(instanceId: $id) {
	    id title
	  }
	}

And the query variables (at bottom left on the page) to:

	{
	  "id": "69640328-788e-43fc-9c3c-af39e243f3b7"
	}

(The same mechanism can be used to substitute variables for other parameters, such as the query in the next example.)

### Search for instances whose titles have words beginning with "z"

Here, we pass a value into the `instance_storage_instances` query's `query` parameter. (Yes, it has a confusing name. Sorry.) The argument of that parameter is a string of [CQL](http://zing.z3950.org/cql/intro.html) -- in this case, a simple _index_`=`_value_ term.

	query {
	  instance_storage_instances(query: "title=z*") {
	    totalRecords
	    instances {
	      id title
	    }
	  }
	}

Here's the indirect version of the same query:

	query ($query:String) {
	  instance_storage_instances(query: $query) {
	    totalRecords
	    instances {
	      id title
	    }
	  }
	}

And the corresponding set of query variables:

	{
	  "query": "title=z*"
	}

(We will not show the indirect versions of subsequent queries.)

### Obtain holdings records for instances

	query {
	  instance_storage_instances {
	    totalRecords
	    instances {
	      id
	      title
	      holdingsRecords2 {
	        id
	        instanceId
	        callNumber
	        permanentLocationId
	        temporaryLocationId
	        holdingsStatements
	      }
	    }
	  }
	}

(Note that the `instanceId` of the holdings records are, in each case, the same as the `id` of the containing instance record -- as we'd expect.)

### Obtain item records for holdings of instances

	query {
	  instance_storage_instances {
	    totalRecords
	    instances {
	      id
	      title
	      holdingsRecords2 {
	        id
	        instanceId
	        callNumber
	        permanentLocationId
	        temporaryLocationId
	        holdingsStatements
	        holdingsItems {
	          id
	          barcode
	          enumeration
	        }
	      }
	    }
	  }
	}

We can use this to find an item-ID, such as `4428a37c-8bae-4f0d-865d-970d83d5ad55`.

### Link back from item to holdings record

There's no reason you'd want to do this in real life, but the fact that you _can_ do it is illustrative of the power and generality of GraphQL:

	query {
	  instance_storage_instances(query: "title=z*", limit: 1) {
	    totalRecords
	    instances {
	      id
	        title
	        holdingsRecords2 {
	          id
	          instanceId
	          callNumber
	          permanentLocationId
	          temporaryLocationId
	          holdingsStatements
	          holdingsItems {
	            id
	            barcode
	            enumeration
	            holdingsRecord {
	                instanceId
	              permanentLocationId
	            }
	          }
	        }
	    }
	  }
	}

### Get holdings record for items

	query {
	  item_storage_items(limit: 3) {
	    totalRecords
	    items {
	      id
	      barcode
	      enumeration
	      holdingsRecord2 {
	        id
	        callNumber
	        permanentLocationId
	      }
	    }
	  }
	}

### Get holdings record and instance for items

As before, but stepping up a level further.

	query {
	  item_storage_items(limit: 3) {
	    totalRecords
	    items {
	      id
	      barcode
	      enumeration
	      holdingsRecord2 {
	        id
	        callNumber
	        permanentLocationId
	        holdingsInstance {
	          id
	          title
	          contributors {
	            contributorTypeId
	            contributorTypeText
	            primary
	          }
	        }
	      }
	    }
	  }
	}

### Fetch the title of a single item's instance

	query {
	  item_storage_items_SINGLE(itemId: "e9f9bc2f-bad5-4613-9d6c-f55efa5805e7") {
	    holdingsRecord2 { holdingsInstance { title } }
	  }
	}


## Using `curl` from the command-line

Here is a brief example of using the command-line to run GraphQL queries on a FOLIO platform. In this example, we consult the ReShare shared index to get holdings and item information for an instance whose ID we have been given. We first obtain a token by logging in with [the `okapi` command-line client](https://github.com/thefrontside/okapi.rb), then use it directly in `curl`.

```
ringo:tmp$ okapi login
username: diku_admin
password: *****
Login successful. Token saved to /Users/mike/.okapi

ringo:tmp$ cat ~/.okapi
OKAPI_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjBlNmIyZjdhLWFhOWItNTZmMy1hODZjLWY1ODIzMThkMzIzOSIsImlhdCI6MTU3Mzc0MzUyMywidGVuYW50IjoiZGlrdSJ9.bl7J-8Z0SUQV_4Aq4hM7uiJcI9LcKJ-UxoeeSh0Uag4
OKAPI_URL=http://shared-index.reshare-dev.indexdata.com:9130
OKAPI_TENANT=diku

ringo:tmp$ cat query.graphql 
{"query":"query ($id:String!) {
  instance_storage_instances_SINGLE(instanceId: $id) {
    id
    title
    holdingsRecords2 {
      id
      instanceId
      callNumber
      permanentLocationId
      temporaryLocationId
      holdingsStatements {
        note
        statement
      }
      holdingsItems {
        id
        barcode
        enumeration
      }
    }
  }
}
","variables": {
  "id":"491fe34f-ea1b-4338-ad20-30b8065a7b46"
}}

ringo:tmp$ . ~/.okapi

ringo:tmp$ curl \
	-H "X-Okapi-Tenant: $OKAPI_TENANT" \
	-H "X-Okapi-Token: $OKAPI_TOKEN" \
	-H "Content-Type: application/json" \
	-X POST \
	-d @query.graphql \
	$OKAPI_URL/graphql | json_pp
{
   "data" : {
      "instance_storage_instances_SINGLE" : {
         "title" : "10,000 Teachers, 10 Million Minds Science and Math Scholarship Act : report (to accompany H.R. 362) (including cost estimate of the Congressional Budget Office)",
         "id" : "491fe34f-ea1b-4338-ad20-30b8065a7b46",
         "holdingsRecords2" : [
            {
               "permanentLocationId" : "87038e41-0990-49ea-abd9-1ad00a786e45",
               "holdingsItems" : [
                  {
                     "enumeration" : null,
                     "id" : "7ee4bb17-79ed-47c0-a447-c72c29138ea0",
                     "barcode" : null
                  }
               ],
               "temporaryLocationId" : null,
               "callNumber" : "Y 1.1/8:110-85",
               "id" : "b78aeca4-dcfa-4ea0-a04a-663008efaf0c",
               "holdingsStatements" : [],
               "instanceId" : "491fe34f-ea1b-4338-ad20-30b8065a7b46"
            }
         ]
      }
   }
}
```


## Using `curl` against a local Docker-containerised `mod-graphql`

Suppose you want to build and run a Docker container for running `mod-graphql` locally.

First, you must temporarily modify the `Dockerfile` so it instructs `mod-graphql` to connect to the correct remote Okapi-fronted FOLIO system. You will need to change the `CMD` line to something like the following (using whatever your `$OKAPI_URL` is):
```
CMD env OKAPI_URL=http://ec2-54-145-122-209.compute-1.amazonaws.com:9130 yarn start RAMLFILES
```
Then build and run your Docker image:
```
docker build --tag mod-graphql:1.1.0-2 .
docker run --publish 8345:3001 --detach --name gql mod-graphql:1.1.0-2
```
This `run` command happens to expose the containerised module's listener on port 8345, so we will POST our queries to http://localhost:8345/graphql.

To run GraphQL queries against this local container and have them forwarded to the FOLIO back-end, you need to pass an explicit `X-Okapi-Url` to the `mod-graphql` on the local port, since it can't generate this from the URL by which it has itself been addressed. So set things up as in the previous section, then:
```
ringo:tmp$ curl \
	-H "X-Okapi-Url: $OKAPI_URL"
	-H "X-Okapi-Tenant: $OKAPI_TENANT"
	-H "X-Okapi-Token: $OKAPI_TOKEN"
	-H "Content-Type: application/json"
	-X POST
	-d @query.graphql
	http://localhost:8345/graphql | json_pp
```

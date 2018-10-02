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


## Setup

Run the server as

	$ env OKAPI_URL=http://localhost:9130 yarn start ../mod-inventory-storage/ramls/instance-storage.raml

Then start [folio-graphiql](https://github.com/folio-org/folio-graphiql), log in, and try these queries:


## Queries

## List all instances

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
	      holdingsRecords {
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
	      holdingsRecords {
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
	        holdingsRecords {
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

For this one, you'll need to have started the GraphQL server on the items RAML instead of the instances RAML:

	$ env OKAPI_URL=http://localhost:9130 yarn start ../mod-inventory-storage/ramls/instance-storage.raml

Then you can find the holdings records associated with three items:

	query {
	  item_storage_items(limit: 3) {
	    totalRecords
	    items {
	      id
	      barcode
	      enumeration
	      holdingsRecord {
	        id
	        callNumber
	        permanentLocationId
	      }
	    }
	  }
	}

(In future it will be possible to have mod-graphql run with a compound GraphQL schema created by compiling and combining _multiple_ RAMLs and their JSON Schemas. See [MODGQL-30](https://issues.folio.org/browse/MODGQL-30).)

### Get holdings record and instance for items

As before, but stepping up a level further.

	query {
	  item_storage_items(limit: 3) {
	    totalRecords
	    items {
	      id
	      barcode
	      enumeration
	      holdingsRecord {
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
	    holdingsRecord { holdingsInstance { title } }
	  }
	}


#!/bin/sh

# Usage: build/setup-for-build.sh [-f]

if [ ! -f package.json ]; then
    echo "$0: must be run from root of package" >&2
    exit 1
fi

DIR=build/schemas-for-build
if [ "x$1" = "x-f" ]; then
    shift
    rm -rf $DIR
fi

if [ -d $DIR ]; then
    echo "API data for build already set up"
    exit 0
fi

echo "Setting up API data ..."
set -ex
(cd create-schemas; yarn install)

mkdir $DIR

# This stanza is just to create the JSON Schema for mod-search
cd $DIR
git clone https://github.com/folio-org/mod-search
(cd ../../create-schemas; yarn --silent json-schema-bundler -d ../$DIR/mod-search/src/main/resources/swagger.api/schemas/entity/instance.yaml > ../$DIR/mod-search-instance-schema.json)
rm -rf mod-search

../../create-schemas/create-schemas.js --overlay ../schemaconf-for-build.json 
echo "... all done"

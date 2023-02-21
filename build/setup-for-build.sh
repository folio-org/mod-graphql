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
cd $DIR
../../create-schemas/create-schemas.js --overlay ../schemaconf-for-build.json 
echo "... all done"

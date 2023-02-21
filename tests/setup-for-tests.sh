#!/bin/sh

# Usage: tests/setup-for-tests.sh [-f]

if [ ! -f package.json ]; then
    echo "$0: must be run from root of package" >&2
    exit 1
fi

DIR=tests/schemas-for-tests
if [ "x$1" = "x-f" ]; then
    shift
    rm -rf $DIR
fi

if [ -d $DIR ]; then
    echo "API data for tests already set up"
    exit 0
fi

echo "Setting up API data ..."
set -ex
(cd create-schemas; yarn install)

mkdir $DIR
cd $DIR
../../create-schemas/create-schemas.js --overlay ../schemaconf-for-tests.json 
echo "... all done"

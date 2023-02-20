#!/bin/sh

# Usage: tests/setup.sh [-f]

if [ ! -f package.json ]; then
    echo "$0: must be run from root of package" >&2
    exit 1
fi

if [ "x$1" = "x-f" ]; then
    shift
    rm -rf tests/input
fi

DIR=tests/input
if [ -d $DIR ]; then
    echo "API data already set up"
    exit 0
fi

echo "Setting up API data ..."
set -ex
(cd create-schemas; yarn install)

mkdir $DIR
cd $DIR
../../create-schemas/create-schemas.js --overlay ../schemaconf-for-tests.json 
echo "... all done"

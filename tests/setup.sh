#!/bin/sh

# Usage: tests/setup.sh [-f] [--production]

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

mkdir $DIR
cd $DIR

# List of all modules whose APIs we want to support GraphQL queries on
for repo in mod-inventory-storage mod-users; do
    git clone --recurse-submodules https://github.com/folio-org/$repo
    # Stupidly, git clone yields zero exit-status even if the clone fails
    test -d $repo || exit 1

    # Change to the graphql branch if it exists; if not, then assume master is up to date
    cd $repo
    git checkout graphql || echo "No 'graphql' brach for $repo, staying on 'master'"
    cd ..

    if [ "x$1" = "x--production" ]; then
	mv $repo/ramls .
	rm -rf $repo
	mkdir $repo
	mv ramls $repo
    fi
done;

{ set +x; } 2>/dev/null
echo "... all done"

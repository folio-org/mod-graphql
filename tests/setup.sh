#!/bin/sh

DIR=tests/input
if [ -d $DIR ]; then
    echo "Tests already set up"
    exit 0
fi

echo "Setting up tests ..."
set -ex
mkdir $DIR
cd $DIR
git clone --recurse-submodules https://github.com/folio-org/mod-inventory-storage
# Stupidly, git clone yields zero exit-status even if the clone fails
test -d mod-inventory-storage || exit 1
cd mod-inventory-storage
git checkout graphql
# Stupidly, git clone yields zero exit-status even if the branch-switch fails
git branch | grep '^\* graphql$' > /dev/null || exit 1
{ set +x; } 2>/dev/null
echo "... all done"

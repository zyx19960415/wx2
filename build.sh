#!/bin/bash

set -e

DIR_NAME=`basename \`pwd\``
PACKAGE_NAME="$DIR_NAME.tar.gz"
STATIC_FILES="output/public/static/$DIR_NAME";
view_FILES="output/view/$DIR_NAME";

rm -rf output


mkdir -p "$STATIC_FILES"
mkdir -p "$view_FILES"

cp -r docs $STATIC_FILES
cp -r static/* "$STATIC_FILES"

cp index.html "$view_FILES/index.tpl"

pushd ./output > /dev/null
tar zcf $PACKAGE_NAME ./*
rm -rf public
rm -rf view
popd  > /dev/null

echo "build complete!"

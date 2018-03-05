#!/bin/bash

dir="$(readlink -f "$(dirname "$0")")"

for version in $(find "$dir" -maxdepth 1 -type d -name "v*" | sed -e "s|.*/v||"); do
    if [ -L "$version" ]; then
        rm "$version"
    fi
    ln -sf "$dir/v$version" "$version"
done

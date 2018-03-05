#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

fs.readdirSync(__dirname).forEach(dir => {
    var match = dir.match(/^v([0-9.]+)$/);
    if (match) {
        var target = path.join(cwd, match[1]);
        try {
            var stat = fs.lstatSync(target);
            if (stat.isSymbolicLink()) {
                fs.unlinkSync(target);
            } else if (stat.isFile() || stat.isDirectory()) {
                console.error(`Cannot install API ${match[0]}!`);
                return;
            }
        } catch (ex) {
        }
        fs.symlinkSync(path.join(__dirname, match[0]), target);
        console.log(`Successfully installed API ${match[0]}.`);
    }
});

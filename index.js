#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const chokidar = require("chokidar");
const kebabCase = require("lodash.kebabcase");
const uniq = require("lodash.uniq");
const argv = require("yargs-parser")(process.argv.slice(2));

const system = require("./system");
const clearRequire = require("./clear-require");
const {
  flattenNestedStyles,
  getFlatClassName,
  objectToCss
} = require("./cli-utils");

require("@babel/register")({
  presets: ["@babel/preset-env"]
});

const themePath = path.join(process.cwd(), argv.path || "src/theme/theme.js");
const outputPath = themePath.replace(".js", ".css");

function run() {
  let theme = {};
  try {
    theme = require(themePath);
  } catch (error) {
    console.log(error);
    return;
  }

  // interop nonsense
  if (theme.default) theme = theme.default;

  let styleSheet = ``;

  /** Variables */

  let variables = ``;

  system.scales.map(function(name) {
    const value = theme[name];
    if (value) append(name, value);
  });

  function append(name, value) {
    console.log(name, value);
    if (Array.isArray(value)) {
      value.map(function(each, index) {
        append(`${name}-${index}`, each);
      });
    } else if (typeof value === "object") {
      console.log(name, value);
      Object.keys(value).map(function(key) {
        append(`${name}-${key}`, value[key]);
      });
    } else if (typeof value === "string") {
      variables += `--${name}: ${value}; \n`;
    } else if (typeof value === "number") {
      // wouldn't work for line-height
      variables += `--${name}: ${value}px; \n`;
    }
  }

  styleSheet += `:root { \n ${variables} } \n`;

  fs.writeFileSync(outputPath, prettier.format(styleSheet, { parser: "css" }));
}

if (argv.w)
  chokidar.watch([themePath]).on("all", function(event, path) {
    clearRequire(themePath);
    run();
  });
else run();

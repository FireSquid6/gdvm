#!/usr/bin/env node
const yargs = require("yargs");
const parser = require("../src/parse.js").parse;

yargs
  .scriptName("gdvm")
  .usage("$0 <cmd> [args]")
  .command(
    "use [godot_version]",
    "use a specific version. Must have config set up.",
    (yargs) => {
      yargs.option("godotVersion", {
        alias: "v",
        type: "string",
        describe: "the version to install",
      });
      yargs.option("release", {
        alias: "r",
        type: "string",
        default: "stable",
      });
      yargs.option("mono", {
        alias: "m",
        type: "boolean",
        default: false,
      });
    },
    function (argv) {
      parser("use", argv);
    }
  )
  .command(
    "install [version]",
    "install a specific version. Must have config set up.",
    (yargs) => {
      yargs.option("godotVersion", {
        alias: "v",
        type: "string",
        describe: "the version to install",
      });
      yargs.option("release", {
        alias: "r",
        type: "string",
        default: "stable",
      });
      yargs.option("mono", {
        alias: "m",
        type: "boolean",
        default: false,
      });
    },
    function (argv) {
      parser("install", argv);
    }
  )
  .command(
    "uninstall [version]",
    "uninstall a specific version. Must have config set up.",
    (yargs) => {
      yargs.option("godotVersion", {
        alias: "v",
        type: "string",
        describe: "the version to install",
      });
      yargs.option("release", {
        alias: "r",
        type: "string",
        default: "stable",
      });
      yargs.option("mono", {
        alias: "m",
        type: "boolean",
        default: false,
      });
    },
    function (argv) {
      console.log("uninstall");
    }
  )
  .command(
    "installed",
    "list all installed version. Must have config set up.",
    function (argv) {
      parser("installed", argv);
    }
  )
  .command(
    "available",
    "list all available version. Must have config set up.",
    function (argv) {
      parser("available", argv);
    }
  )
  .command(
    "crawl",
    "crawls the tuxfamily godot repo to look for newly available versions. Must have config set up.",
    function (argv) {
      parser("crawl", argv);
    }
  )
  .help().argv;

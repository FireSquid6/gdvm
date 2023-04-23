#!/usr/bin/env node
const yargs = require("yargs");

yargs
  .scriptName("gdvm")
  .usage("$0 <cmd> [args]")
  .command(
    "use [version]",
    "use a specific version. Must have config set up.",
    (yargs) => {
      yargs.positional("version", {
        type: "string",
        describe: "the version to use",
        default: "latest",
      });
    },
    function (argv) {
      console.log("hello", argv.version, "welcome to yargs!");
    }
  )
  .command(
    "install [version]",
    "install a specific version. Must have config set up.",
    (yargs) => {
      yargs.positional("version", {
        type: "string",
        describe: "the version to install",
        default: "latest",
      });
    },
    function (argv) {
      console.log("hello", argv.version, "welcome to yargs!");
    }
  )
  .command(
    "uninstall [version]",
    "uninstall a specific version. Must have config set up.",
    (yargs) => {
      yargs.positional("version", {
        type: "string",
        describe: "the version to uninstall",
        default: "latest",
      });
    },
    function (argv) {
      console.log("hello", argv.version, "welcome to yargs!");
    }
  )
  .command(
    "installed",
    "list all installed version. Must have config set up.",
    function (argv) {
      console.log("hello", argv.version, "welcome to yargs!");
    }
  )
  .command(
    "available",
    "list all available version. Must have config set up.",
    function (argv) {
      console.log("hello", argv.version, "welcome to yargs!");
    }
  )
  .command(
    "crawl",
    "crawls the tuxfamily godot repo to look for newly available versions",
    function (argv) {
      console.log("hello", argv.version, "welcome to yargs!");
    }
  )
  .command(
    "config",
    "configure gdvm",
    (yargs) => {},
    function (argv) {
      console.log("hello", argv.version, "welcome to yargs!");
    }
  )
  .help().argv;

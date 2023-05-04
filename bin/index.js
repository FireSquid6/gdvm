#!/usr/bin/env node
const yargs = require("yargs");
const parser = require("../src/parse_command.js").parse_command;

yargs
  .scriptName("gdvm")
  .usage("$0 <cmd> [args]")
  .command(
    "use [godot_version]",
    "use a specific version. Must have config set up.",
    (yargs) => {
      yargs.positional("godot_version", {
        type: "string",
        describe: "the version to use",
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
      yargs.positional("godot-version", {
        type: "string",
        describe: "the version to install",
        default: "latest",
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
      yargs.positional("godot-version ", {
        type: "string",
        describe: "the version to uninstall",
        default: "latest",
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
      console.log("installed");
    }
  )
  .command(
    "available",
    "list all available version. Must have config set up.",
    function (argv) {
      console.log("available");
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

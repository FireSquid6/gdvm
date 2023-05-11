const os = require("os");
const fs = require("fs");
const path = require("path");
const runCommand = require("./run_command");

function parse(command, args) {
  // get the config object
  const config = getConfig();
  if (config === null) {
    return;
  }

  // run the command
  runCommand(command, config, args);
}

function getConfig() {
  const configPath = os.homedir() + "/.gdvm.json";

  // chcek if the config file exists
  let config = null;
  if (fs.existsSync(configPath)) {
    config = require(configPath);
  } else {
    console.log(
      "No config file found. Please fill out the config file at ~/.gdvm.json before running any commands."
    );
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          godotPath: path.join(os.homedir(), "/.gdvm/current"),
          versionsPath: path.join(os.homedir(), "/.gdvm/versions"),
          dataPath: path.join(os.homedir(), "/.gdvm/data.json"),
        },
        null,
        2
      )
    );
    return null;
  }

  // check that the config has the required fields
  for (const field of ["godotPath", "versionsPath", "dataPath"]) {
    if (!config.hasOwnProperty(field)) {
      console.log(
        "Config file is missing required field: " +
          field +
          ". Please fill out the config file at ~/.gdvm.json before running any commands."
      );
      return null;
    }
  }
  return config;
}

module.exports = { parse };

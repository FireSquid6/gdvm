const validate_version = require("./utils/validate-version");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { mkdirp } = require("mkdirp");
const runCommand = require("./run_command");

const homedir = os.homedir();

function parse(command, args) {
  console.log("args are", args);
  // get the config object
  const config = get_config();
  if (config === null) {
    return;
  }

  // get the data.json file
  const data = get_data(config);
  if (data === null) {
    return;
  }

  // run the command
  run_command(command, config, data, args);
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
          godotPath: path.join(os.homedir(), "/gdvm/current"),
          versionsPath: path.join(os.homedir(), "/gdvm/versions"),
          dataPath: path.join(os.homedir(), "/gdvm/data"),
        },
        null,
        2
      )
    );
    return null;
  }

  // check that the config has the required fields
  for (const field of ["godot_path", "versions_path", "data_path"]) {
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

const defaultData = {
  installedVersions: [],
  availableVersions: [],
  currentVersion: null,
};

function getData(config) {
  const dataDath = path.join(config.data_path, "/data.json");

  // ensure that the data_path exists
  if (fs.existsSync(dataPath)) {
    return require(dataPath);
  }
  const made = mkdirp.sync(path.dirname(config.data_path));

  fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2));
  return defaultData;
}

module.exports = { parse, validateVersion };

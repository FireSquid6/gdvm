const validate_version = require("./validate-version");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { mkdirp } = require("mkdirp");
const run_command = require("./run-command");

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

function get_config() {
  const config_path = os.homedir() + "/.gdvm.json";

  // chcek if the config file exists
  let config = null;
  if (fs.existsSync(config_path)) {
    config = require(config_path);
  } else {
    console.log(
      "No config file found. Please fill out the config file at ~/.gdvm.json before running any commands."
    );
    fs.writeFileSync(
      config_path,
      JSON.stringify(
        {
          godot_path: path.join(os.homedir(), "/gdvm/current"),
          versions_path: path.join(os.homedir(), "/gdvm/versions"),
          data_path: path.join(os.homedir(), "/gdvm/data"),
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

const default_data = {
  installed_versions: [],
  available_versions: [],
  current_version: null,
};

function get_data(config) {
  const data_path = path.join(config.data_path, "/data.json");

  // ensure that the data_path exists
  if (fs.existsSync(data_path)) {
    return require(data_path);
  }
  const made = mkdirp.sync(path.dirname(config.data_path));

  fs.writeFileSync(data_path, JSON.stringify(default_data, null, 2));
  return default_data;
}

module.exports = { parse, validate_version };

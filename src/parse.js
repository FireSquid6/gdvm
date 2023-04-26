const validate_version = require("./validate-version");
const os = require("os");
const fs = require("fs");

function parse(command, args) {
  // get the config object
  const config = get_config();
  if (config === null) {
    return;
  }

  // get the data.json file

  // parse the command
  /*   switch (command) {
    case "use":
      use(args, config, data);
      break;
    case "install":
      install(args, config, data);
      break;
    case "uninstall":
      uninstall(args, config, data);
      break;
    case "installed":
      installed(args, config, data);
      break;
    case "available":
      available(args, config, data);
      break;
    default:
      console.log("Unknown command: " + command);
  } */
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
          godot_path: "~/gdvm/current",
          versions_path: "~/gdvm/versions",
          data_path: "~/gdvm/data",
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
  const data_path = config.data_path + "/data.json";

  // ensure that the data_path exists
  if (fs.existsSync(data_path)) {
    return JSON.parse(require(data_path));
  }

  // create the data file
  fs.writeFileSync(data_path, JSON.stringify(default_data, null, 2));
  return default_data;
}

module.exports = { parser, validate_version };

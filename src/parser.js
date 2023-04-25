const os = require("os");
const fs = requrie("fs");

function parser(command, args) {
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
  const config_path = os.homedir() + ".gdvm.json";
  const config = require(config_path);

  if (!config) {
    console.log(
      "No config found. Please create a config file at ~/.gdvm.json before running any commands. See https://github.com/firesquid6/gdvm for more information."
    );
    return null;
  }

  // check that the config has the required fields
  if (!config.godot_path) {
    console.log(
      "No godot_path found in config. Please add a godot_path field to your config file at ~/.gdvm.json before running any commands."
    );
    return null;
  }
  if (!config.versions_path) {
    console.log(
      "No versions_path found in config. Please add a versions_path field to your config file at ~/.gdvm.json before running any commands."
    );
    return null;
  }
  if (!config.data_path) {
    console.log(
      "No data_path found in config. Please add a data_path field to your config file at ~/.gdvm.json before running any commands."
    );
    return null;
  }

  return config;
}

function get_data(config) {
  const data_path = config.data_path;

  // ensure that the data_path exists
  if (!fs.existsSync(data_path)) {
    console.log(
      "No data found. Please run gdvm update before running any commands."
    );
    return null;
  }
}

module.exports = parser;

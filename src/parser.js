const os = require("os");

function parser(command, args) {
  const config = get_config();
  if (config === null) {
    return;
  }
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

  return config;
}

module.exports = parser;

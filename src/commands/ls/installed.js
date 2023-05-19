const { ls } = require("./ls");

module.exports = {
  name: "installed",
  requiredArgs: [],
  optionalArgs: [], //TODO: maybe add OS as optional parameter?
  command: (config, args) => {
    ls(
      config,
      "installedVersions",
      "No installed versions found. Run gdvm install to install a version, or do gdvm available to see all available versions."
    );
  },
};

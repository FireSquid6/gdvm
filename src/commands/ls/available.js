const { ls } = require("./ls");

module.exports = {
  name: "available",
  requiredArgs: [],
  optionalArgs: [], //TODO: maybe add OS as optional parameter?
  command: (config, args) => {
    ls(
      config,
      "availableVersions",
      "No available versions found. Run gdvm crawl to crawl for available versions."
    );
  },
};

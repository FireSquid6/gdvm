const fs = require("fs-extra");
const { Store } = require("../store");

module.exports = {
  name: "uninstall",
  requiredArgs: ["godotVersion"],
  optionalArgs: ["release", "mono"],
  command: async (config, args) => {
    const version = args.godotVersion;
    const release = args.release;
    const mono = args.mono;

    const path = `${config.versionsPath}/${version}-${release}-${mono}.zip`;
    try {
      fs.removeSync(path);

      // remove the version from installedVersions
      const store = new Store();
      store.open(config.dataPath);
      const installedVersions = store.get("installedVersions");
      const index = installedVersions.findIndex((version) => {
        return (
          version.version === args.godotVersion &&
          version.release === args.release &&
          version.mono === args.mono &&
          version.os === config.os
        );
      });
      installedVersions.splice(index, 1);
      store.set("installedVersions", installedVersions);
      store.write();
    } catch (err) {
      console.log("Version not installed");
    }
  },
};

const download = require("../utils/download");
const fs = require("fs-extra");
const { Store } = require("../store");

module.exports = {
  name: "install",
  requiredArgs: ["godotVersion"],
  optionalArgs: ["release", "mono"],
  command: (config, args) => {
    const store = new Store();
    store.open(config.dataPath);

    const version = args.godotVersion;
    const release = args.release;
    const mono = args.mono;

    console.log(version, release, mono);

    if (store.has("availableVersions")) {
      const availableVersions = store.get("availableVersions");
      for (let i = 0; i < availableVersions.length; i++) {
        const availableVersion = availableVersions[i];

        // awful terrible nesting
        if (
          availableVersion.version === version &&
          availableVersion.release === release &&
          availableVersion.mono === mono &&
          availableVersion.os === config.os
        ) {
          // Error handling is done in the download function so we don't need to worry about that crap
          fs.ensureDirSync(config.versionsPath); // this is the best way I've found to make sure the dir always exists
          download(
            availableVersion.link,
            `${config.versionsPath}/${version}-${release}-${mono}.zip`
          );

          // to make the available and install commands work properly, we need to remove the version from availableVersions and add it to installedVersions
          let installedVersions = store.get("installedVersions");
          if (installedVersions === null) {
            //should really just be making things null save but I'm a bad programmer
            installedVersions = [];
          }
          installedVersions.push(availableVersion);
          store.set("installedVersions", installedVersions);

          // remove the version from availableVersions
          availableVersions.splice(i, 1);
          store.set("availableVersions", availableVersions);

          console.log("Installed version " + version + " successfully.");
          return;
        }
      }
      console.log(
        `Version ${version} of release ${release} with mono as ${mono} for os ${config.os} is not available. Have you run gdvm crawl recently?`
      );
      return;
    }
  },

  versionEquality: (version1, version2) => {
    const removeZeroesAndPeriods = (version) => {
      return version.replace(/0/g, "").replace(/\./g, "");
    };

    if (removeZeroesAndPeriods(version1) === removeZeroesAndPeriods(version2)) {
      return true;
    }
    return false;
  },
};

const download = require("../utils/download");
const fs = require("fs-extra");
const { Store } = require("../store");
import { validateVersion } from "../utils/validate_version";

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
        if (
          availableVersion.version === version &&
          availableVersion.release === release &&
          availableVersion.mono === mono &&
          availableVersion.os === config.os
        ) {
          fs.ensureDirSync(config.versionsPath);

          download(
            availableVersion.link,
            `${config.versionsPath}/${version}-${release}-${mono}.zip`
          );
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

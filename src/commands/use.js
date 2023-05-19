const unzipper = require("unzipper");
const { Store } = require("../store");
const fs = require("fs-extra");
const { version } = require("yargs");

module.exports = {
  name: "use",
  requiredArgs: ["godotVersion"],
  optionalArgs: ["release", "mono"],
  command: async (config, args) => {
    const store = new Store();
    store.open(config.dataPath);

    fs.ensureDirSync(config.godotPath);
    let versionData = store.get("installedVersions").find((version) => {
      return (
        version.version === args.godotVersion &&
        version.release === args.release &&
        version.mono === args.mono &&
        version.os === config.os
      );
    });

    if (versionData === undefined) {
      console.log("Version not found");
      return;
    }

    const zipPath = `${config.versionsPath}/${versionData.version}-${versionData.release}-${versionData.mono}.zip`;

    // unzip the file
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: config.godotPath }))
      .on("finish", () => {
        console.log("Finished unzipping");

        // rename the executable
        const executableExtensions = [
          "exe",
          "64",
          "32",
          "x86_64",
          "x86_32",
          "app",
        ];
        fs.readdirSync(config.godotPath).forEach((file) => {
          const extension = file.split(".").pop();
          console.log(`renaming executable to godot.${extension}`);
          if (executableExtensions.includes(extension)) {
            fs.renameSync(
              `${config.godotPath}/${file}`,
              `${config.godotPath}/godot.${extension}`
            );
          }
        });
      });

    store.set("currentVersion", {
      version: args.godotVersion,
      release: args.release,
      mono: args.mono,
    });
  },
};

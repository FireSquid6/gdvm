const download = require("../utils/download");

module.exports = {
  name: "install",
  requiredArgs: ["godotVersion"],
  optionalArgs: [],
  command: (config, data, args) => {
    // check if version is already installed
    if (data.installed.includes(args.godotVersion)) {
      console.log(
        `Version already installed. Type 'gdvm use ${args.godotVersion}' to use it.`
      );
      return;
    }

    // find the link to download the version from
    const version = data.versions.find(
      (version) => version.version === args.godotVersion
    );
    if (!version) {
      console.log(
        `Version not available. This could be because:
         - You spelled the version wrong
         - You haven't updated the available versions in a while with 'gdvm crawl.' Check 'gdvm available' to see what versions have been crawled.
         - I am a bad programmer. Create an issue on GitHub if you think this is the case.`
      );
      return;
    }

    // download the version
    const downloadPath =
      config.versionsPath +
      "/" +
      `${version.version}-${version.release}-${
        version.mono ? "mono-" : ""
      }.zip`;

    console.log(`Downloading ${version.version}...`);
    download(version.url, downloadPath);
  },
};

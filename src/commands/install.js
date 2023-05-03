const download = require("../utils/download");

module.exports = {
  name: "install",
  required_args: ["godotVersion"],
  optional_args: [],
  command: (config, data, args) => {
    // check if version is already installed
    if (data.installed.includes(args.godot_version)) {
      console.log(
        `Version already installed. Type 'gdvm use ${args.godot_version}' to use it.`
      );
      return;
    }

    // find the link to download the version from
    const version = data.versions.find(
      (version) => version.version === args.godot_version
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
    const download_path =
      config.versions_path +
      "/" +
      `${version.version}-${version.release}-${
        version.mono ? "mono-" : ""
      }.zip`;

    console.log(`Downloading ${version.version}...`);
    download(version.url, download_path);
  },
};

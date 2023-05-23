const fs = require("fs-extra");
const { Store } = require("../store");
const request = require("request");
const cliProgress = require("cli-progress");

// due to the nature of this function, it is manually tested by me. I promise that it works.
const download = async (url, localPath) => {
  const bar = new cliProgress.SingleBar(
    {
      format:
        "Downloading [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} bytes",
    },
    cliProgress.Presets.shades_classic
  );
  const file = fs.createWriteStream(localPath);
  let recievedBytes = 0;

  request
    .get(url)
    .on("response", (response) => {
      if (response.statusCode !== 200) {
        return Promise.reject(
          `Bad status code ${response.statusCode}\n\nPlease report this issue to https://github.com/firesquid6/gdvm`
        );
      }

      const totalBytes = response.headers["content-length"];
      bar.start(totalBytes, 0);
    })
    .on("data", (chunk) => {
      recievedBytes += chunk.length;
      bar.update(recievedBytes);
    })
    .pipe(file)
    .on("error", (err) => {
      console.log(err);
      fs.unlink(localPath);
      bar.stop();
      return Promise.reject(
        `Error downloading file with mesage: ${err.message}\n\nPlease report this issue to https://github.com/firesquid6/gdvm`
      );
    });

  file.on("finish", () => {
    bar.stop();
    file.close();
    return Promise.resolve(`Downloaded ${localPath}`);
  });

  file.on("error", (err) => {
    fs.unlink(filename);

    return Promise.reject(
      `Error writing to file with mesage: ${err.message}\n\nPlease report this issue to https://github.com/firesquid6/gdvm`
    );
  });
};

module.exports = {
  name: "install",
  requiredArgs: ["godotVersion"],
  optionalArgs: ["release", "mono"],
  command: async (config, args) => {
    const store = new Store();
    store.open(config.dataPath);

    const version = args.godotVersion;
    const release = args.release;
    const mono = args.mono;

    if (store.has("installedVersions")) {
      const installedVersions = store.get("installedVersions");
      if (installedVersions.includes(version)) {
        console.log("Version already installed");
        return;
      }
    }

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
          await download(
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
          store.write();

          return;
        }
      }
    }

    console.log(
      `Version ${version} of release ${release} with mono as ${mono} for os ${config.os} is not available. Have you run gdvm crawl recently?`
    );
    return;
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

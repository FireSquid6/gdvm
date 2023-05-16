const request = require("request");
const cliProgress = require("cli-progress");
const fs = require("fs");

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

module.exports = download;

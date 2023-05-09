const https = require("https");
const fs = require("fs");

// this function also takes way too long for it to be worth it to test
const download = (url, localPath) => {
  const file = fs.createWriteStream(localPath);
  const request = https.get(url, (response) => {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("Download complete.");
    });
  });
};

module.exports = download;

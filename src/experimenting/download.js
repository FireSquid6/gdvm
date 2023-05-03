const https = require("https");
const fs = require("fs");

const output_path = "/home/firesquid/downloads/godot.zip";
const download_url =
  "https://downloads.tuxfamily.org/godotengine/3.2.3/Godot_v3.2.3-stable_x11.64.zip";

const download = (url, local_path) => {
  const file = fs.createWriteStream(local_path);
  const request = https.get(url, (response) => {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("Download complete.");
    });
  });
};

download(download_url, output_path);

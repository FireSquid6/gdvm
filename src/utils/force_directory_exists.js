const fs = require("node:fs");
const path = require("path");

function forceDirectoryExists(directory) {
  if (fs.existsSync(directory)) {
    return;
  }

  const parsed = path.parse(path.normalize(directory));
  const directories = [...parsed.dir.split(path.sep), parsed.base];

  for (let i = 0; i < directories.length; i++) {
    const dir = directories.slice(0, i + 1).join("/");

    if (fs.existsSync(dir)) {
      console.log("dir exists");
      continue;
    }
    fs.mkdirSync(dir, { recursive: true });
  }
}

module.exports = {
  forceDirectoryExists,
};

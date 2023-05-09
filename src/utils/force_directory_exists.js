const fs = require("fs");
const path = require("path");

function forceDirectoryExists(directory) {
  const parsed = path.parse(path.normalize(directory));
  const directories = [...parsed.dir.split(path.sep), parsed.base];

  for (let i = 0; i < directories.length; i++) {
    const dir = directories.slice(0, i + 1).join("/");

    if (fs.existsSync(dir)) {
      continue;
    }
    fs.mkdirSync(dir, { recursive: true });
  }
}

module.exports = {
  forceDirectoryExists,
};

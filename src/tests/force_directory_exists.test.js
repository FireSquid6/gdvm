const { forceDirectoryExists } = require("../utils/force_directory_exists");
const { rm } = require("shelljs");
const fs = require("fs");

describe("force_directory_exists", () => {
  test("It should iteratively create directories", () => {
    const path = "./temp/path/to/nowhere";
    expect(fs.existsSync(path)).toBeFalsy();
    forceDirectoryExists(path);
    expect(fs.existsSync(path)).toBeTruthy();

    fs.rmdirSync("./temp", { recursive: true, force: true });
  });
});

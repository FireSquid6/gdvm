const { versionEquality } = require("../commands/install");

it("returns true if two versions are the same", () => {
  expect(versionEquality("3.2.1", "3.2.1")).toBe(true);
  expect(versionEquality("4", "4.0")).toBe(true);
  expect(versionEquality("4.0.0", "4")).toBe(true);
  expect(versionEquality("4.0.1", "4")).toBe(false);
});

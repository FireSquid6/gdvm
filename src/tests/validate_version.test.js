const validate_version = require("../utils/validate_version");

describe("validate_version", () => {
  test("valid version", () => {
    expect(validate_version("3.2.3")).toEqual("3.2.3");
  });
  test("invalid version", () => {
    expect(validate_version("3.2")).toEqual(null);
  });
  test("weird text", () => {
    expect(validate_version("hello")).toEqual(null);
  });
});

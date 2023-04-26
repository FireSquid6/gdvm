function validate_version(input) {
  // check that the version is valid
  if (!/^\d+\.\d+\.\d+$/.test(input)) {
    console.log(
      "Invalid version: " +
        input +
        ". Please use the format MAJOR.MINOR.PATCH (e.g. 3.2.3)."
    );
    return null;
  }
  return input;
}

module.exports = validate_version;

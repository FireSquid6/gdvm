const fs = require("fs");

class Store {
  store = {};
  path = "";

  open(json_filepath) {
    if (fs.existsSync(json_filepath)) {
      this.store = JSON.parse(fs.readFileSync(json_filepath));
      this.path = json_filepath;
      return true;
    }

    return false;
  }

  write() {
    fs.writeFileSync(this.path, JSON.stringify(this.store));
  }

  set() {}

  get() {}

  has() {}
}

module.exports = { Store };

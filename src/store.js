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
    console.log("writing store to ", this.path);
    fs.writeFileSync(this.path, JSON.stringify(this.store));
  }

  set(key, value) {
    this.store[key] = value;
  }

  get(key) {
    if (this.has(key)) {
      return this.store[key];
    }

    return null;
  }

  has(key) {
    return this.store.hasOwnProperty(key);
  }
}

module.exports = { Store };

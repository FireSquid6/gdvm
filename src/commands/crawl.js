const fs = require("fs");
const parseUrl = require("../utils/parse_url");
const crawl = require("../utils/crawl_tuxfamily");
const { Store } = require("../store");

module.exports = {
  name: "crawl",
  requiredArgs: [],
  optionalArgs: [],
  command: async (config, args) => {
    console.log("Crawling tuxfamily repo...");
    const download_links = await crawl();

    console.log("Parsing download links...");
    let parsedData = [];
    download_links.forEach((link) => {
      const parsed = parseUrl(link);

      if (parsed !== null) {
        parsedData.push(parsed);
      }
    });

    console.log("Writing to store...");
    const store = new Store();

    store.open(config.dataPath);
    store.set("availableVersions", parsedData);
    store.set("lastCrawl", new Date().toISOString());
    store.write();
  },
};

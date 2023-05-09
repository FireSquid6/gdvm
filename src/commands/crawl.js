const fs = require("fs");
const parseUrl = require("../utils/parse_url");
const crawl = require("../utils/crawl_tuxfamily");

module.exports = {
  name: "crawl",
  requiredArgs: [],
  optionalArgs: [],
  command: async (config, data, args) => {
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

    console.log("Writing data to file...");
    data.available_versions = parsedData;
    fs.writeFileSync(
      config.data_path + "/data.json",
      JSON.stringify(data, null, 2)
    );
  },
};

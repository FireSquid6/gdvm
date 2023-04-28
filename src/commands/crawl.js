const fs = require("fs");
const parse_url = require("../utils/parse_url");
const crawl = require("../utils/crawl");

module.exports = {
  name: "crawl",
  required_args: [],
  optional_args: [],
  command: async (config, data, args) => {
    console.log("Crawling tuxfamily repo...");
    const download_links = await crawl();

    console.log("Parsing download links...");
    let parsed_data = [];
    download_links.forEach((link) => {
      const parsed = parse_url(link);

      if (parsed !== null) {
        parsed_data.push(parsed);
      }
    });

    console.log("Writing data to file...");
    fs.writeFileSync(
      config.data_path + "/crawl_results.json",
      JSON.stringify(
        {
          date: new Date(),
          data: parsed_data,
        },
        null,
        2
      )
    );
  },
};

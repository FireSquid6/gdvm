const axios = require("axios");
const cheerio = require("cheerio");

// given that the return value of this functino will be wildly different over time and it takes a very long time to execute, there is no point in writing unit teests for it
async function crawl() {
  const exclude = ["media", "patreon", "testing", "toolchains", "../"];

  let toVisit = ["https://downloads.tuxfamily.org/godotengine"];
  let visited = [];
  let downloads = [];

  while (toVisit.length > 0) {
    let currentUrl = toVisit.pop();
    console.log(`\n\nVisiting ${currentUrl}`);
    visited.push(currentUrl);

    let pageHtml = await axios
      .get(currentUrl)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    const $ = cheerio.load(pageHtml);
    console.log(pageHtml);
    $("a").each((index, element) => {
      let link = currentUrl + "/" + $(element).attr("href");
      let is_included = true;

      exclude.forEach((excluded) => {
        if (link.includes(excluded)) {
          is_included = false;
        }
      });

      if (!visited.includes(link) && !toVisit.includes(link) && is_included) {
        if (link.charAt(link.length - 1) === "/") {
          toVisit.push(link);
          console.log(`Added ${link} to toVisit`);
        } else {
          downloads.push(link);
          console.log(`Added ${link} to downloads`);
        }
      }
    });
  }
  return downloads;
}

module.exports = crawl;

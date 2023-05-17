// returns a list of strings that should be printed. It looks like the following:
// Last updated: <Date when last crawl>
// <Version1>
//   <Release1>
//   <Release1-mono>
//   <Release2>
//   <Release3>
// <Version2>
// ... etc
function listVersions(version_data, last_crawled, os) {
  let versions = new Map();
  for (let i = 0; i < version_data.length; i++) {
    if (version_data[i].os === os) {
      const release = `${version_data[i].release}${
        version_data[i].mono ? "-mono" : ""
      }`;
      let releases = versions.get(version_data[i].version);

      if (releases === undefined) {
        releases = [];
      }

      releases.push(release);
      versions.set(version_data[i].version, releases);
    }
  }

  let output = [];
  output.push(`Last crawled: ${last_crawled}`);
  output.push(`Available for ${os}:`);
  for (const [version, releases] of versions) {
    output.push(version);
    for (let i = 0; i < releases.length; i++) {
      output.push(`  ${releases[i]}`);
    }
  }

  return output;
}

const list_versions = require("./ls");
const { Store } = require("../../store");
function ls(config, storeName, unavailableMessage) {
  const store = new Store();
  store.open(config.dataPath);

  const last_crawled = store.get("lastCrawl");
  const version_data = store.get(storeName);

  if (version_data === null) {
    console.log(unavailableMessage);
    return;
  }

  const os = config.os;
  const output = listVersions(version_data, last_crawled, os);

  output.forEach((line) => {
    console.log(line);
  });
}

module.exports = { listVersions, ls };

/* const last_crawled = "2021-01-01";
const os = "linux64";
const example_data = require("../../tests/example_data.json");

console.log(list_versions(example_data, last_crawled, os)); */

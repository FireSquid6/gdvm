const { Store } = require("../store");
const fs = require("fs");
const path = require("path");

const test_data = {
  wallfacers: [
    {
      name: "Frederick Tyler",
      occupation: "former US secretary of defense",
      breaker: "Von Neumann",
    },
    {
      name: "Manuel Rey Dias",
      occupation: "Former President of Venezuela",
      breaker: "Mozi",
    },
    {
      name: "Bill Hines",
      occpation: "Neurocientist",
      breaker: "Aristotle",
    },
    {
      name: "Luo Ji",
      occupation: "Astronomer",
      breaker: "himself",
    },
  ],
};

describe("Test the store class", () => {
  beforeEach(() => {
    fs.mkdirSync("./temp", { recursive: true });
    fs.writeFileSync("./temp/data.json", JSON.stringify(test_data));
  });

  afterEach(() => {
    fs.rmdirSync("./temp", { recursive: true, force: true });
  });

  test("Opens a json file", () => {
    const store = new Store();
    expect(store.open("./temp/data.json")).toBe(true);
    expect(store.store).toMatchObject(test_data);
  });

  test("Modifies data and writes to a json file", () => {
    const store = new Store();
    expect(store.open("./temp/data.json")).toBe(true);

    store.set("book", "The Three Body Problem");
    const modified_data = {
      ...test_data,
      book: "The Three Body Problem",
    };

    expect(store.store).toMatchObject(modified_data);
    store.write();

    expect(fs.existsSync("./temp/data.json")).toBe(true);
    expect(JSON.parse(fs.readFileSync("./temp/data.json"))).toMatchObject(
      modified_data
    );
  });
});

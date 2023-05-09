module.exports = {
  name: "use",
  required_args: ["godotVersion"],
  optional_args: [],
  command: (config, data, args) => {
    console.log(args);
    console.log(config);
    console.log(data);
  },
};

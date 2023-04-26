const use = {
  name: "use",
  required_args: ["godot_version"],
  optional_args: [],
  command: (config, data, args) => {
    console.log("running the use command with", args, config, data);
  },
};

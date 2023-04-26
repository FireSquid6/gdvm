const commands = [require("./commands/use")];

function run_command(command_name, config, data, args) {
  commands.forEach((command) => {
    if (command.name === command_name) {
      // check that the command has the required args
      for (const arg of command.required_args) {
        if (!args.hasOwnProperty(arg)) {
          console.log(
            "Command " +
              command_name +
              " is missing required argument: " +
              arg +
              "."
          );
          return;
        }
      }
      command.command(config, data, args);
      return;
    }
  });
}

module.exports = run_command;

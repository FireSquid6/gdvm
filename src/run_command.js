const commands = [
  require("./commands/use"),
  require("./commands/crawl"),
  require("./commands/install"),
];

function runCommand(commandName, config, data, args) {
  commands.forEach((command) => {
    if (command.name === commandName) {
      // check that the command has the required args
      for (const arg of command.required_args) {
        if (!args.hasOwnProperty(arg)) {
          console.log(
            "Command " +
              commandName +
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

module.exports = runCommand;

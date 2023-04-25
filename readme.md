# Install
installation for gdvm is relativelty simple. You just need to install the package with `npm install -g gdvm`. After that, you need to create a .gdvm.json file in your home directory. This is `~` on linux and mac (I think?) based systems, and `C://Users/<your-username>/` on windows systems. Here's a template for what this file should look like:
```json
{
  "os": "linux64", // can be "linux64", "linux32", "win64", "win32", or "mac"
  "data-dir": "~/gdvm/data", // a folder gdvm can use to store various data
  "versions-dir": "~/gdvm/versions", // a folder that gdvm can use to store installed versions that aren't in use
  "use-dir": "~/gdvm/use", // a folder that the currently in-use version of Godot is in. This folder should be on your system's path
}
```
Once this file is created and filled out, make sure that the use-dir is added to your system path. This will allow you to call godot from the command line by calling `godot`. 
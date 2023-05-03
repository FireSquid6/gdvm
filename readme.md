# Godot Version Manager
gdvm is a tool simlar to nvm allowing you to install and update various versions of Godot from the command line. 

# Commands
Viewable with `gdvm --help`

# Install
installation for gdvm is relativelty simple. Assuming you have node installed, just need to install the package with `npm install -g gdvm`. After that, you need to create a .gdvm.json file in your home directory. This is `~` on linux and mac (I think?) based systems, and `C://Users/<your-username>/` on windows systems. Here's a template for what this file should look like:
```json
{
  "os": "linux64",
  "data-dir": "home/firesquid/.gdvm/data", 
  "versions-dir": "home/firesquid/.gdvm/versions", 
  "godot-path": "home/firesquid/.gdvm/use", 
}
```
`os` - the operating system to download godot for. It can either be `linux64`, `linux32`, `win32`, `win64`, or `mac`
`data-dir` - the directory gdvm uses to store excess data
`versions-dir` - the directory where zip files of installed versions will be stored
`use-dir` - the directory where the currently in-use version of godot is. This should be added to your system's path. ([wait, what is that?](https://en.wikipedia.org/wiki/PATH_(variable))) 
**All of these directories must exist**


Once this file is created and filled out, make sure that the use-dir is added to your system path. This will allow you to call godot from the command line by calling `godot`. 
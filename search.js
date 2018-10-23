
//############################
//### Author: Oran Shiner  ###
//###     23/10/2018       ###
//############################ 

var fs = require('fs');
var path = require('path');
var ext = process.argv[2];
var text = process.argv[3];
var flag = '0';

// Checks if the user entered the variables.
if (ext == undefined || text == undefined) {
    console.log('USAGE: node search [EXT] [TEXT]');
} else {
    // This function finds all the files with the relevant extension.
    function getFilesFromDir(dir, fileTypes, name) {
        var filesToReturn = [];
        // This (recursive) function is "walking" through the folders.
        function walkDir(currentPath) {
            var files = fs.readdirSync(currentPath);
            for (var i in files) {
                var currentFile = path.join(currentPath, files[i]);
                // Checks if this is a file with the relevant extension.
                if (fs.statSync(currentFile).isFile() && fileTypes.indexOf(path.extname(currentFile)) != -1) {
                    var data = fs.readFileSync(currentFile)
                    if (data.indexOf(name) >= 0) {
                            // Prints the current file found.
                            console.log(process.cwd() + '\\' + currentFile);
                            filesToReturn.push(currentFile.replace(dir, ''));
                            flag = '1';
                        };
                } else if (fs.statSync(currentFile).isDirectory()) {
                    walkDir(currentFile);
                } 
            }
        };
        walkDir(dir);
    }

    getFilesFromDir("./", ["." + ext], text);
    // Checks the flag - '0' means that no file was found, '1' means the file was found.
    if (flag === '0') {
        console.log("No file was found");
    }
}

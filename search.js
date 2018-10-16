var fs = require('fs');
var path = require('path');
var ext = process.argv[2];
var text = process.argv[3];

//Checks if the user entered the variables
if (ext == undefined || text == undefined) {
    console.log('USAGE: node search [EXT] [TEXT]');
} else {
    // Return a list of files
    // with the file path absulot to the given dir
    function getFilesFromDir(dir, fileTypes, name) {
        var filesToReturn = [];
        function walkDir(currentPath) {
            var files = fs.readdirSync(currentPath);
            for (var i in files) {
                var currentFile = path.join(currentPath, files[i]);
                //Splits the file name from the directory
                var splitDirAndFileName = currentFile.split('\\');
                //Take the last argument from the list - this is the name of the file dot external
                var fullFileName = splitDirAndFileName[splitDirAndFileName.length - 1];
                //Splits the Dot external from the file name
                var splitRmDotExt = fullFileName.split('.');
                //Check that this is the correct file
                if (fs.statSync(currentFile).isFile() && fileTypes.indexOf(path.extname(currentFile)) != -1 && name === splitRmDotExt[0]) {
                    filesToReturn.push(currentFile.replace(dir, ''));
                //check if this is the last folder and goes back with recursion
                } else if (fs.statSync(currentFile).isDirectory()) {
                    walkDir(currentFile);
                }
            }
        };
        walkDir(dir);
        return filesToReturn;
    }
    var file_name = getFilesFromDir("./", ["." + ext], text);
    //Print all results
    for (var j in file_name) {
        console.log(process.cwd() + '\\' + file_name[j]);
    }
    //Check if the file exists
    if (file_name[j] == undefined) {
        console.log("No file was found");
    }
}

//### Aurthor Oran Shiner ###
//###    16/10/2018       ###
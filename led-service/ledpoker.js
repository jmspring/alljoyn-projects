// this script is run in node as follows:
// node ./ledpoker.js <command> <args>
// 	commands are:
//		on <brightness>
//		off
//		flash <brightness> <frequency>
//		status
var exec = require('child_process').exec;

// update this script to point to the client process
var ledClientScript = "./led_client";

function displayStdout(data) {
    var output = JSON.parse(data);
    console.log("cmd - " + output['cmd'] + ", brightness: " + output['brightness'] + ", frequency: " + output['frequency']);
}

function doOff(callback) {
    var child = exec(ledClientScript + " off", function(err, stdout, stderr) {
        callback(stdout);
    });
}

function doOn(brightness, callback) {
    var child = exec(ledClientScript + " on " + brightness, function(err, stdout, stderr) {
        callback(stdout);
    });
}

function doStatus(brightness, callback) {
    var child = exec(ledClientScript + " status", function(err, stdout, stderr) {
        callback(stdout);
    });
}

function doFlash(brightness, frequency, callback) {
    var child = exec(ledClientScript + " flash " + brightness + " " + frequency, function(err, stdout, stderr) {
        callback(stdout);
    });
}


var args = process.argv.slice(2);
if(args[0] == "on") {
    doOn(args[1], displayStdout);
} else if(args[0] == "off") {
    doOff(displayStdout);
} else if(args[0] == "status") {
    doStatus(displayStdout);
} else if(args[0] == "flash") {
    doFlash(args[1], args[2], displayStdout);
} else {
    console.log("invalid command");
}

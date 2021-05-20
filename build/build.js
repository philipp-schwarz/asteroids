var fs = require('fs');
var args = process.argv.slice(2);


// Usage

if (!args.length) {
	console.log('	');
	console.log('	USAGE: node build.js FILE [PATH]');
	console.log('	');
	console.log('	FILE is the file you wish to build.');
	console.log('	PATH is the relative environment path. The path is relative to FILE if not given.');
	console.log('	');
	console.log('	Example:');
	console.log('	node build.js src/index.html > start.html');
	console.log('	');
	return;
}


// Arguments

var argFile = args[0];
var argPath = args[1];

if (!argPath)
	argPath = argFile.replace(/[^/]+$/, '');


var html = fs.readFileSync(argFile).toString();


// PNG Files

var pngList = html.match(/(['"])[a-z0-9/_.-]+\.png\1/ig);

for (var file of pngList) {
	var enc = file.substr(0, 1);
	var path = file.substr(1, file.length-2);
	var data = fs.readFileSync(argPath+path, {encoding: 'base64'});

	var url = 'data:image/png;base64,';
	html = html.split(file).join(enc+url+data+enc);
}


// JS Scripts

var jsList = html.match(/(['"])[a-z0-9/_.-]+\.js\1/ig);

for (var file of jsList) {
	var enc = file.substr(0, 1);
	var path = file.substr(1, file.length-2);
	var data = fs.readFileSync(argPath+path, {encoding: 'base64'});

	var url = 'data:text/javascript;base64,';
	html = html.split(file).join(enc+url+data+enc);
}

// Output
process.stdout.write(html);

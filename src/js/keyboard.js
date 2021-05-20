var keyState = {};

window.addEventListener('keydown', function(e) {
	if (!(
		e.ctrlKey
		|| e.altKey
		|| (e.code == 'KeyR' && e.ctrlKey) // Reload
		|| ((e.code.length==2||e.code.length==3) && e.code.charAt(0) == 'F') // Function keys
	)) {
		e.preventDefault();
	}

	var keyCode = e.code;
	if (keyCode.substr(0,3) == 'Key') keyCode = keyCode.substring(3, keyCode.length);
	keyCode = keyCode.substr(0,1).toLowerCase()+keyCode.substr(1);
	keyState[keyCode] = true;
});

window.addEventListener('keyup', function(e) {
	e.preventDefault();

	var keyCode = e.code;
	if (keyCode.substr(0,3) == 'Key') keyCode = keyCode.substring(3, keyCode.length);
	keyCode = keyCode.substr(0,1).toLowerCase()+keyCode.substr(1);
	keyState[keyCode] = false;
});

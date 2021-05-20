function spaceDistance(x1, y1, x2, y2) {
	var x = x2 - x1;
	var y = y2 - y1;
	while (x > Draw16.width/2) x -= Draw16.width;
	while (x < -Draw16.width/2) x += Draw16.width;
	while (y > Draw16.height/2) y -= Draw16.height;
	while (y < -Draw16.height/2) y += Draw16.height;
	return pointDistance(0, 0, x, y);
}

function pointDistance(x1, y1, x2, y2) {
	var a = (x2-x1)*(x2-x1);
	var b = (y2-y1)*(y2-y1);
	return Math.sqrt(a+b);
}

function pointInDir(x, y, d, a) {
	return pointRoundPoint(x, y - d, x, y, a);
}

function pointRoundPoint(px, py, cx, cy, a) {
	a = a/180*Math.PI;
	var s = Math.sin(a);
	var c = Math.cos(a);
	px -= cx;
	py -= cy;

	var nx = px * c - py * s;
	var ny = px * s + py * c;

	px = nx + cx;
	py = ny + cy;
	return [Math.round(px*10000)/10000, Math.round(py*10000)/10000];
}

function angleFromPoints(x1, y1, x2, y2) {
	var a = 180 * Math.atan2(y2-y1, x2-x1) / Math.PI;
	a -= 270;
	while (a < 0)
		a += 360;
	return a;
}

function rand(a, b) {
	if (typeof b == 'undefined') {
		b = a;
		a = 0;
	}
	if (a > b) {
		var c = b;
		b = a;
		a = c;
	}
	if (b-a < 1000) {
		// better random number
		return a + (Math.round(Math.random()*100000) % (b-a+1));
	}
	return a + Math.floor(Math.random()*(b-a+1));
}

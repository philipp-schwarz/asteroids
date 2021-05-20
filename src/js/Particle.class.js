class Particle {

	constructor(x, y, speed, dir, eol) {
		this.x = x;
		this.y = y;
		
		if (this.x < 0)
			this.x += Draw16.width;
		if (this.y < 0)
			this.y += Draw16.height;
		
		this.speed = speed;
		this.dir = dir;
		this.eol = (eol ? eol : 6);

		objectList.push(this);
	}

	onStep() {
		var p = pointInDir(this.x, this.y, this.speed, this.dir);
		this.x = p[0];
		this.y = p[1];

		if (this.x >= Draw16.width)
			this.x -= Draw16.width;
		if (this.x < 0)
			this.x += Draw16.width;
		if (this.y >= Draw16.height)
			this.y -= Draw16.height;
		if (this.y < 0)
			this.y += Draw16.height;

		this.eol--;
		if (this.eol == 0) {
			var i = objectList.indexOf(this);
			if (i >= 0)
				objectList.splice(i, 1);
		}
	}

	onDraw() {
		Draw16.drawPixel(0xffffff, this.x, this.y);
	}
}

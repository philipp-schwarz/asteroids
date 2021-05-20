class Laser {

	constructor(x, y, dir) {
		this.isLaser = true;

		this.x = x;
		this.y = y;
		this.speed = 8;
		this.dir = dir;

		this.frontX = 0;
		this.frontY = 0;
		this.backX = 0;
		this.backY = 0;

		this.eol = 15;

		objectList.push(this);
	}

	onStep() {
		var p;

		p = pointInDir(this.x, this.y, this.speed, this.dir);
		this.x = p[0];
		this.y = p[1];

		if (this.x > Draw16.width/2)
			this.x -= Draw16.width;
		if (this.x < -Draw16.width/2)
			this.x += Draw16.width;
		if (this.y > Draw16.height/2)
			this.y -= Draw16.height;
		if (this.y < -Draw16.height/2)
			this.y += Draw16.height;

		this.frontX = this.x;
		this.frontY = this.y-2;
		this.backX = this.x;
		this.backY = this.y+2;

		p = pointRoundPoint(this.frontX, this.frontY, this.x, this.y, this.dir);
		this.frontX = p[0];
		this.frontY = p[1];

		p = pointRoundPoint(this.backX, this.backY, this.x, this.y, this.dir);
		this.backX = p[0];
		this.backY = p[1];

		this.eol--;
		if (this.eol == 0) {
			this.destroy();
		}
	}

	onDraw() {
		Draw16.drawLine(0xffffff, this.frontX, this.frontY, this.backX, this.backY);

		Draw16.drawLine(0xffffff, Draw16.width+this.frontX, this.frontY, Draw16.width+this.backX, this.backY);

		Draw16.drawLine(0xffffff, this.frontX, Draw16.height+this.frontY, this.backX, Draw16.height+this.backY);

		Draw16.drawLine(0xffffff, Draw16.width+this.frontX, Draw16.height+this.frontY, Draw16.width+this.backX, Draw16.height+this.backY);
	}

	destroy() {
		var i = objectList.indexOf(this);
		if (i >= 0)
			objectList.splice(i, 1);
	}
}

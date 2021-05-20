class Ship {

	constructor(x, y) {
		this.isShip = true;

		this.preLive = true;

		this.x = x;
		this.y = y;
		this.speed = 0;
		this.dir = rand(0, 359);
		this.forceDir = this.dir;

		this.frontX = this.x;
		this.frontY = this.y;
		this.backX = this.x;
		this.backY = this.y;
		this.leftX = this.x;
		this.leftY = this.y;
		this.rightX = this.x;
		this.rightY = this.y;
		this.leftTipX = this.x;
		this.leftTipY = this.y;
		this.rightTipX = this.x;
		this.rightTipY = this.y;

		this.coolDown = 0;

		objectList.push(this);
		app.ship = this;
	}

	onStep() {
		var p;

		if (this.coolDown)
			this.coolDown--;

		if (keyState.arrowLeft)
			this.dir -= 4;

		if (keyState.arrowRight)
			this.dir += 4;

		if (keyState.arrowUp) {
			this.preLive = false;

			p = pointInDir(this.x, this.y, this.speed, this.forceDir);
			p = pointInDir(p[0], p[1], 0.1, this.dir);

			this.forceDir = angleFromPoints(this.x, this.y, p[0], p[1]);
			this.speed = pointDistance(this.x, this.y, p[0], p[1]);
			if (this.speed > 10)
				this.speed = 10;
			
			new Particle(this.backX, this.backY, rand(1,10), this.dir+180-10+rand(20));
			new Particle(this.backX, this.backY, rand(1,10), this.dir+180-10+rand(20));
			new Particle(this.backX, this.backY, rand(1,10), this.dir+180-10+rand(20));
			new Particle(this.backX, this.backY, rand(1,10), this.dir+180-10+rand(20));

			if (Draw16.step % 2) {
				beep('bpm=600 1/4 c2', 0.1);
			}
		}

		p = pointInDir(this.x, this.y, this.speed, this.forceDir);

		if (keyState.space && !this.coolDown) {
			this.preLive = false;

			app.score--;
			new Laser(this.frontX, this.frontY, this.dir);
			this.coolDown = 20;

			beep('bpm=600 1/4 c6', 0.1);
		}

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
		this.frontY = this.y-8;
		this.backX = this.x;
		this.backY = this.y+6;
		this.leftX = this.x-5;
		this.leftY = this.y+8;
		this.rightX = this.x+5;
		this.rightY = this.y+8;
		this.leftTipX = this.x-5;
		this.leftTipY = this.y+1;
		this.rightTipX = this.x+5;
		this.rightTipY = this.y+1;

		p = pointRoundPoint(this.frontX, this.frontY, this.x, this.y, this.dir);
		this.frontX = p[0];
		this.frontY = p[1];

		p = pointRoundPoint(this.backX, this.backY, this.x, this.y, this.dir);
		this.backX = p[0];
		this.backY = p[1];

		p = pointRoundPoint(this.leftX, this.leftY, this.x, this.y, this.dir);
		this.leftX = p[0];
		this.leftY = p[1];

		p = pointRoundPoint(this.rightX, this.rightY, this.x, this.y, this.dir);
		this.rightX = p[0];
		this.rightY = p[1];

		p = pointRoundPoint(this.leftTipX, this.leftTipY, this.x, this.y, this.dir);
		this.leftTipX = p[0];
		this.leftTipY = p[1];

		p = pointRoundPoint(this.rightTipX, this.rightTipY, this.x, this.y, this.dir);
		this.rightTipX = p[0];
		this.rightTipY = p[1];

	}

	onDraw() {
		if (this.preLive && Draw16.step % 30 < 10)
			return;
		
		var x, y;

		for (var c=0; c<4; c++) {
			if (c==1 || c==3) x = Draw16.width;
			else x = 0;
			if (c==2 || c==3) y = Draw16.height;
			else y = 0;

			Draw16.drawLine(0xffffff, x+this.frontX, y+this.frontY, x+this.leftX, y+this.leftY);
			Draw16.drawLine(0xffffff, x+this.frontX, y+this.frontY, x+this.rightX, y+this.rightY);
			Draw16.drawLine(0xffffff, x+this.leftX, y+this.leftY, x+this.backX, y+this.backY);
			Draw16.drawLine(0xffffff, x+this.backX, y+this.backY, x+this.rightX, y+this.rightY);

			Draw16.drawLine(0xffffff, x+this.leftX, y+this.leftY, x+this.leftTipX, y+this.leftTipY);
			Draw16.drawLine(0xffffff, x+this.rightX, y+this.rightY, x+this.rightTipX, y+this.rightTipY);
		}
	}

	damage() {
		if (this.preLive)
			return false;

		for (var j=0; j<200; j++) {
			new Particle(this.x, this.y, rand(1,60)/10, rand(0,359), rand(20,140));
		}
		this.destroy();

		app.lives--;

		if (app.lives) {
			beep('bpm=120 1/4 c3', 0.2);
		}
		else {
			beep('bpm=120 1/4 gap=1/40 e3 e3 d3 d3 2/4 c3', 0.2);
		}

		return true;
	}

	destroy() {
		var i = objectList.indexOf(this);
		if (i >= 0)
			objectList.splice(i, 1);
		
		if (app.ship == this)
			app.ship = null;
	}
}

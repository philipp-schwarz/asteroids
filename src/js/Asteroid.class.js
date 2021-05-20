class Asteroid {

	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.dia = (size+1)*4;
		this.speed = 1.5;
		this.dir = rand(0, 359);

		this.drawPoints = [];
		for (var i=0; i<16; i++)
			this.drawPoints.push(pointInDir(0, 0, this.dia/2, i*360/16));
		for (var i=0; i<16; i++) {
			this.drawPoints[i][0] += rand(-10,10)/10;
		}

		objectList.push(this);
		app.asteroidCount++;
	}

	onStep() {
		var p = pointInDir(this.x, this.y, this.speed, this.dir);
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

		if (!app.gameOver) {
			for (var i=0; i<objectList.length; i++) {
				if (objectList[i].isLaser) {
					if (spaceDistance(objectList[i].x, objectList[i].y, this.x, this.y) <= this.dia) {
						objectList[i].destroy();

						app.score += this.size*5;

						this.damage();
						return;
					}
				}
				if (objectList[i].isShip) {
					if (
						spaceDistance(objectList[i].x, objectList[i].y, this.x, this.y) <= this.dia/2
						|| spaceDistance(objectList[i].frontX, objectList[i].frontY, this.x, this.y) <= this.dia/2
						|| spaceDistance(objectList[i].leftX, objectList[i].leftY, this.x, this.y) <= this.dia/2
						|| spaceDistance(objectList[i].rightX, objectList[i].rightY, this.x, this.y) <= this.dia/2
					) {
						if (objectList[i].damage()) {
							this.damage(true);
							return;
						}
					}
				}
			}
		}
	}

	onDraw() {
		var x, y;

		for (var c=0; c<4; c++) {
			if (c==1 || c==3) x = this.x + Draw16.width;
			else x = this.x;
			if (c==2 || c==3) y = this.y + Draw16.height;
			else y = this.y;

			Draw16.drawEllipseFill(0x000000, x-this.dia/2, y-this.dia/2, this.dia, this.dia);

			for (var i=0; i<this.drawPoints.length-1; i++) {
				Draw16.drawLine(
					0xffffff,
					x+this.drawPoints[i][0], y+this.drawPoints[i][1],
					x+this.drawPoints[i+1][0], y+this.drawPoints[i+1][1]
				);
			}
			Draw16.drawLine(
				0xffffff,
				x+this.drawPoints[0][0], y+this.drawPoints[0][1],
				x+this.drawPoints[this.drawPoints.length-1][0], y+this.drawPoints[this.drawPoints.length-1][1]
			);
		}
	}

	damage(ship) {
		if (this.size > 1) {
			var asteroid;
			asteroid = new Asteroid(this.x, this.y, this.size-1);
			asteroid.dir = this.dir + rand(-30, 30);
			asteroid = new Asteroid(this.x, this.y, this.size-1);
			asteroid.dir = this.dir + rand(-30, 30);
		}
		for (var j=0; j<this.size*5; j++) {
			new Particle(this.x, this.y, rand(1,this.size*2), rand(0,359));
		}

		if (!ship) {
			beep('bpm=600 1/4 c3 d3', 0.2);
		}

		this.destroy();
	}

	destroy() {
		var i = objectList.indexOf(this);
		if (i >= 0)
			objectList.splice(i, 1);
		app.asteroidCount--;
	}
}

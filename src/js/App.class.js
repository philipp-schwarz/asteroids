class App {

	constructor() {
		window.app = this;

		this.score = 0;
		this.lives = 3;
		this.level = 1;

		this.startStep = 0;
		
		this.menu = true;
		this.gameOver = true;

		this.ship = null;
		this.shipCoolDown = 0;

		this.asteroidCount = 0;

		this.highscoreList = Highscore.getList();

		this.reset();
	}

	triggerStep() {

		// Call the onStep function on every object
		for (var i=0; i<objectList.length; i++) {
			if (objectList[i].onStep)
				objectList[i].onStep();
		}

		// Call own onStep function
		this.onStep();

		// Call the onDraw function on every object
		for (var i=0; i<objectList.length; i++) {
			if (objectList[i].onDraw)
				objectList[i].onDraw();
		}

		// Call own onDraw function
		this.onDraw();
	}

	onStep() {

		// Start game (Space key)
		if (keyState.space && this.menu && !this.shipCoolDown) {
			this.menu = false;
			this.reset();
		}

		// Back to menu (Space key)
		if (keyState.space && !this.menu && this.gameOver && !this.shipCoolDown) {
			this.menu = true;
			this.shipCoolDown = 60;
			this.reset();
		}

		// Respawn ship when at least one live is left
		if (this.shipCoolDown) {
			this.shipCoolDown--;
			if (!this.shipCoolDown && this.lives && !this.menu)
				new Ship(Draw16.width/2, Draw16.height/2);
		}

		// Set the cooldown when no ship is present
		if (!this.menu && !this.ship && !this.shipCoolDown && !this.gameOver) {
			this.shipCoolDown = 60;
		}

		// Game over condition
		if (!this.menu && !this.ship && !this.lives && !this.gameOver) {
			this.gameOver = true;
			Highscore.add(this.score);
		}

		// Next level condition
		if (!this.asteroidCount) {
			this.level++;
			this.resetLevel();
		}
	}

	onDraw() {

		// Draw the menu
		if (this.menu) {

			// Logo graphic
			Draw16.drawArea(Draw16.texture.logo, 0, 32);

			// Text: Highscore
			Draw16.drawText8(Draw16.texture.font, 1, 0xffffff, 'Highscore', 88, 112);

			// Text: Recent highscores with date and score
			for (var i=0; i<this.highscoreList.length; i++) {
				var score = this.highscoreList[i];
				Draw16.drawText8(Draw16.texture.font, 0, 0xffffff, score[1], 88, 122+i*10);
				Draw16.drawText8(Draw16.texture.font, 0, 0xffffff, score[0]+'', 144, 122+i*10);
			}

			// Blinking text: Press space to start!
			if (Math.floor(Draw16.step/30) % 2)
				Draw16.drawText8(Draw16.texture.font, 1, 0xffffff, 'Press space to start!', 78, 192);

			// Text: Version
			Draw16.drawText8(Draw16.texture.font, 0, 0xffffff, 'V 1.0', 8, Draw16.height-16);
		}

		// Draw ingame elements
		else {

			// Text: Level X
			if (Draw16.step - this.startStep < 120) {
				Draw16.drawText8(Draw16.texture.font, 1, 0xffffff, 'Level '+this.level, Draw16.width/2-16, 64);
			}

			// Text: GAME OVER
			if (!this.menu && this.gameOver) {
				Draw16.drawText8(Draw16.texture.font, 1, 0xffffff, 'GAME OVER', Draw16.width/2-26, Draw16.height/2-4);
			}

			// Text: SCORE + X
			Draw16.drawText8(Draw16.texture.font, 1, 0xffffff, 'SCORE', 8, 8);
			Draw16.drawText8(Draw16.texture.font, 0, 0xffffff, this.score+'', 8, 16);

			// Text: LIVES + hearts
			Draw16.drawText8(Draw16.texture.font, 1, 0xffffff, 'LIVES', Draw16.width-37, 8);

			if (app.lives >= 1)
				Draw16.drawText8(Draw16.texture.font, 0, 0xffffff, '~)', Draw16.width-15, 16);
			if (app.lives >= 2)
			Draw16.drawText8(Draw16.texture.font, 0, 0xffffff, '~)', Draw16.width-15-8, 16);
			if (app.lives >= 3)
			Draw16.drawText8(Draw16.texture.font, 0, 0xffffff, '~)', Draw16.width-15-16, 16);

		}
	}

	reset() {
		// Reset the game
		this.lives = 3;
		this.level = 1;
		this.score = 0;
		this.gameOver = false;

		// Reload highscore list
		this.highscoreList = Highscore.getList();

		// Also reset level parameters
		this.resetLevel();
	}

	resetLevel() {

		// Clear all objects
		objectList = [];

		// Set asteroid counter to zero
		this.asteroidCount = 0;

		// Add sample asteroids in the menu
		if (this.menu) {
			for (var i=0; i<8; i++) {
				new Asteroid(rand(0,Draw16.width), rand(0,Draw16.height), rand(1,4));
			}
		}

		// Add enemy asteroids in the game
		else {

			// Set the start step and cooldown
			this.shipCoolDown = 60;
			this.startStep = Draw16.step;

			// Add three smaller asteroids
			new Asteroid(rand(0,Draw16.width), rand(0,Draw16.height), 1);
			new Asteroid(rand(0,Draw16.width), rand(0,Draw16.height), 2);
			new Asteroid(rand(0,Draw16.width), rand(0,Draw16.height), 3);

			// Add a big asteroid for every reached level
			for (var i=1; i<this.level; i++) {
				new Asteroid(rand(0,Draw16.width), rand(0,Draw16.height), 4);
			}

		}
	}
}

function beep(notes, volume) {
	if (!volume)
		volume = 0.3;
	beepType(notes, 'square', volume);
	beepType(notes, 'sine', volume/2);
}

function beepInit() {
	if (!beep.audioCtx)
		beep.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function beepType(notes, type, volume) {
	if (!beep.audioCtx)
		beepInit();

	var audioCtx = beep.audioCtx;

	if (!notes)
		notes = [[400, 500]];
	if (!type)
		type = 'square'; // sine, square, sawtooth, triangle
	if (!volume)
		volume = 0.3;

	var timeStart = audioCtx.currentTime;
	var timeCurrent = timeStart;

	var gain = audioCtx.createGain();
	gain.connect(audioCtx.destination);
	gain.gain.value = volume;

	var oscillator = audioCtx.createOscillator();
	oscillator.type = 'square';
	oscillator.connect(gain);
	oscillator.start(timeStart);

	for (var i=0; i<notes.length; i+=2) {
		var frequency = notes[i];
		var duration = notes[i+1];

		if (frequency) {
			oscillator.frequency.setValueAtTime(frequency, timeCurrent);
			gain.gain.setValueAtTime(volume, timeCurrent);
		}
		else {
			oscillator.frequency.setValueAtTime(0, timeCurrent);
			gain.gain.setValueAtTime(0, timeCurrent);
		}

		timeCurrent += duration / 1000;
	}

	oscillator.stop(timeCurrent);
}

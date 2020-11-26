let recordedSoundLibrary = [[], [], [], []];
let recordingIndex = -1;
let playingIndex = -1;
let recordStartTime = null;

document.body.addEventListener("keypress", (event) => {
	let soundId;
	switch (event.code) {
		case "KeyA":
			soundId = "boom";
			break;
		case "KeyS":
			soundId = "clap";
			break;
		case "KeyD":
			soundId = "hihat";
			break;
		case "KeyF":
			soundId = "kick";
			break;
		case "KeyG":
			soundId = "openhat";
			break;
		case "KeyH":
			soundId = "ride";
			break;
		case "KeyJ":
			soundId = "snare";
			break;
		case "KeyK":
			soundId = "tink";
			break;
		case "KeyL":
			soundId = "tom";
			break;
	}
	if (soundId) {
		playSound(soundId);
	}
	if (recordingIndex > -1) {
		const soundTime = Date.now() - recordStartTime;
		const soundObj = {
			soundId: soundId,
			time: soundTime,
		};
		recordedSoundLibrary[recordingIndex].push(soundObj);
	}
});
document.querySelectorAll(".recordBtn").forEach((button, index) => {
	button.addEventListener("click", () => {
		if (recordingIndex === -1) {
			button.classList.add("recording");
			recordStartTime = Date.now();
			recordedSoundLibrary[index] = [];
			recordingIndex = index;
		} else {
			button.classList.remove("recording");
			recordStartTime = null;
			recordingIndex = -1;
		}
	});
});

document.querySelectorAll(".deleteBtn").forEach((button, index) => {
	button.addEventListener("click", () => {
		recordedSoundLibrary[index] = [];
	});
});

document.querySelectorAll(".playBtn").forEach((button, i) => {
	button.addEventListener("click", () => {
		if (playingIndex == -1)
			for (let index = 0; index < recordedSoundLibrary[i].length; index++) {
				playingIndex = i;
				button.classList.add("playing");
				const soundObj = recordedSoundLibrary[i][index];
				setTimeout(() => {
					playSound(soundObj.soundId);
					if (index === recordedSoundLibrary[i].length - 1) {
						playingIndex = -1;
						button.classList.remove("playing");
					}
				}, soundObj.time);
			}
	});
});
const playSound = (soundId) => {
	const sound = document.querySelector("#" + soundId);
	sound.play();
	sound.parentElement.classList.add("played");
	setTimeout(() => {
		sound.parentElement.classList.remove("played");
	}, 800);
};

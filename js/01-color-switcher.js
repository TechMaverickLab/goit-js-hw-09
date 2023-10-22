/* global document */

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let colorSwitchInterval = null;

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {
	startButton.disabled = true;
	stopButton.disabled = false;

	colorSwitchInterval = setInterval(() => {
		document.body.style.backgroundColor = getRandomHexColor();
	}, 1000);
});

stopButton.addEventListener('click', () => {
	startButton.disabled = false;
	stopButton.disabled = true;
	clearInterval(colorSwitchInterval);
});


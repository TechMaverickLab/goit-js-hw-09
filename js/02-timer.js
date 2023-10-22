/* global document */

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
	startBtn: document.querySelector('[data-start]'),
	days: document.querySelector('[data-days]'),
	hours: document.querySelector('[data-hours]'),
	minutes: document.querySelector('[data-minutes]'),
	seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const selectedTime = selectedDates[0].getTime();
		const currentTime = Date.now();
		const deltaTime = selectedTime - currentTime;

		if (deltaTime <= 0) {
			Notiflix.Notify.failure('Please choose a date in the future');
		} else {
			refs.startBtn.disabled = false;
			refs.startBtn.addEventListener('click', () => {
				startTimer(deltaTime);
				refs.startBtn.disabled = true;
			});
		}
	},
};

flatpickr('#datetime-picker', options);

function startTimer(time) {
	const intervalId = setInterval(() => {
		time -= 1000;
		const { days, hours, minutes, seconds } = convertMs(time);
		updateTimer({ days, hours, minutes, seconds });

		if (time <= 0) {
			playAlarm();
			clearInterval(intervalId);
			updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
		}
	}, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
	refs.days.textContent = addLeadingZero(days);
	refs.hours.textContent = addLeadingZero(hours);
	refs.minutes.textContent = addLeadingZero(minutes);
	refs.seconds.textContent = addLeadingZero(seconds);

	const secondsElement = document.querySelector('[data-seconds]');
  
	if (secondsElement) {
		const secondsText = secondsElement.textContent || '0';
		const seconds = parseInt(secondsText, 10);
    
		if (seconds < 10) {
			secondsElement.classList.add('red-text');
		} else {
			secondsElement.classList.remove('red-text');
		}
	} else {
		console.error('Element with data-seconds not found');
	}
}

function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);
	return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}

function playAlarm() {
	const audio = document.getElementById('alarm-audio');
	if (audio) {
		audio.play();
	} else {
		console.error('Audio element not found');
	}
}
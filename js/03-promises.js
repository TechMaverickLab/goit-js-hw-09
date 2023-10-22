/* global document */

import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', onSubmit);

function onSubmit(event) {
	event.preventDefault();

	const formData = new FormData(event.currentTarget);
	const delay = Number(formData.get('delay'));
	const step = Number(formData.get('step'));
	const amount = Number(formData.get('amount'));

	for (let i = 1; i <= amount; i++) {
		createPromise(i, delay + step * (i - 1))
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});
	}
}

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
	  const shouldResolve = Math.random() > 0.3;
	  setTimeout(() => {
			if (shouldResolve) {
		  resolve({ position, delay });
			} else {
		  reject({ position, delay });
			}
	  }, delay);
	});
}
  

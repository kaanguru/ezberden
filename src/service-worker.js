if ('serviceWorker' in navigator) {
	addEventListener('load', function () {
		navigator.serviceWorker.register('/service-worker.js');
	});
}

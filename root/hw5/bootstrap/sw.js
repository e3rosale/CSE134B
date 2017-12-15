var cacheName = 'v1';
var cacheFiles = [
	'/',
	'./addgame.js',
	'./addgameBootstrap.html',
	'./addplayerBootstrap.html',
	'./dashboardBootstrap.html',
	'./editgameBootstrap.html',
	'./editplayerBootstrap.html',
	'./login.js',
	'./loginBootstrap.html',
	'./main.js',
	'./register.js',
	'./registerBootstrap.html',
	'./rosterBootstrap.html',
	'./schedule.js',
	'./scheduleBootstrap.html',
	'./settings.js',
	'./settingsBootstrap.html',
	'./statsBootstrap.html',
	'./updatestatsBootstrap.html',
	'https://fonts.googleapis.com/css?family=Architects+Daughter|Pacifico',
	'./bootstrap-3.3.7-dist/css/bootstrap.min.css',
	'./bootstrap-3.3.7-dist/js/bootstrap.min.js',
	'https://www.gstatic.com/firebasejs/4.8.0/firebase.js',
	'https://www.gstatic.com/firebasejs/4.6.0/firebase-firestore.js',
	'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'

]


self.addEventListener('install', function(e) {
	console.log("[ServiceWorker] installed")

	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('caching files!');
			return cache.addAll(cacheFiles);
		})
	)
});

self.addEventListener('activate', function(e) {
	console.log("[ServiceWorker] activated")

	e.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if(thisCacheName !== cacheName) {
					return caches.delete(thisCacheName);
				}
			}))
		})
	)
});

self.addEventListener('fetch', function(e) {
	console.log("[ServiceWorker] Fetching");

	e.respondWith(
		caches.match(e.request).then(function(response) {
			if(response) {
				return response;
			}

			var requestClone = e.request.clone();
			fetch(requestClone).then(function(response) {
				if(!response) {
					return response;
				}

				var responseClone = response.clone();
				caches.open(cacheName).then(function(cache) {
					cache.put(e.request, responseClone);
					return response;
				});
			})
		})
	)
});
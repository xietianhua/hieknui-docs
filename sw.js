(function (that, caches, Promise) {
    var version = 'v14';
    var redirectUrl = '/hieknui/docs/images/29766.jpg';
    that.addEventListener('install', function (event) {
        that.skipWaiting();
        event.waitUntil(caches.open(version).then(function (cache) {
            return cache.addAll([
                '/hieknui/index.html',
                '/hieknui/src/ts/index.js',
                '/hieknui/src/less/index.css',
                '/hieknui/assets/jsformat.js',
                '/hieknui/assets/htmlformat.js',
                '/hieknui/assets/hieknui.js',
                '/hieknui/assets/font/iconfont.css',
                '/hieknui/assets/font/iconfont.eot?t=1502946374117',
                '/hieknui/assets/font/iconfont.eot?t=1502946374117#iefix',
                '/hieknui/assets/font/iconfont.js',
                '/hieknui/assets/font/iconfont.svg?t=1502946374117#hufont',
                '/hieknui/assets/font/iconfont.ttf?t=1502946374117',
                '/hieknui/assets/font/iconfont.woff?t=1502946374117',
                '/hieknui/assets/github.min.css',
                '/hieknui/assets/jquery.min.js',
                '/hieknui/assets/clipboard.min.js',
                '/hieknui/assets/jquery.mousewheel.min.js',
                '/hieknui/assets/lodash.min.js',
                '/hieknui/assets/highlight.min.js',
                '/hieknui/assets/xml.min.js',
                '/hieknui/assets/javascript.min.js',
                '/hieknui/assets/css.min.js'
            ]);
        }));
    });
    that.addEventListener('fetch', function (event) {
        event.respondWith(caches.match(event.request).catch(function () {
            return fetch(event.request);
        }).then(function (response) {
            caches.open(version).then(function (cache) {
                cache.put(event.request, response);
            });
            return response.clone();
        }).catch(function () {
            return caches.match(redirectUrl);
        }));
    });
    that.addEventListener('activate', function (event) {
        var cacheWhitelist = [version];
        event.waitUntil(caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        }));
    });
})(this, caches, Promise);
//# sourceMappingURL=sw.js.map
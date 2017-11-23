(function (that, caches, Promise) {
    var version = 'v14';
    var redirectUrl = '/hieknui/docs/images/29766.jpg';
    that.addEventListener('install', function (event) {
        that.skipWaiting();
        event.waitUntil(caches.open(version).then(function (cache) {
            return cache.addAll([
                '/hieknui/docs/demo.html',
                '/hieknui/docs/ts/demo.js',
                '/hieknui/docs/less/demo.css',
                '/hieknui/docs/assets/jsformat.js',
                '/hieknui/docs/assets/htmlformat.js',
                '/hieknui/dist/hieknui.js',
                '/hieknui/dist/font/iconfont.css',
                '/hieknui/dist/font/iconfont.eot?t=1502946374117',
                '/hieknui/dist/font/iconfont.eot?t=1502946374117#iefix',
                '/hieknui/dist/font/iconfont.js',
                '/hieknui/dist/font/iconfont.svg?t=1502946374117#hufont',
                '/hieknui/dist/font/iconfont.ttf?t=1502946374117',
                '/hieknui/dist/font/iconfont.woff?t=1502946374117',
                '/hieknui/docs/lib/github.min.css',
                '/hieknui/docs/lib/jquery.min.js',
                '/hieknui/docs/lib/clipboard.min.js',
                '/hieknui/docs/lib/jquery.mousewheel.min.js',
                '/hieknui/docs/lib/lodash.min.js',
                '/hieknui/docs/lib/highlight.min.js',
                '/hieknui/docs/lib/xml.min.js',
                '/hieknui/docs/lib/javascript.min.js',
                '/hieknui/docs/lib/css.min.js'
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
(function (that, caches, Promise) {
    var version = 'v14';
    var redirectUrl = '/hieknui-docs/docs/images/29766.jpg';
    that.addEventListener('install', function (event) {
        that.skipWaiting();
        event.waitUntil(caches.open(version).then(function (cache) {
            return cache.addAll([
                '/hieknui-docs/index.html',
                '/hieknui-docs/src/ts/index.js',
                '/hieknui-docs/src/less/index.css',
                '/hieknui-docs/assets/jsformat.js',
                '/hieknui-docs/assets/htmlformat.js',
                '/hieknui-docs/assets/hieknui.js',
                '/hieknui-docs/assets/font/iconfont.css',
                '/hieknui-docs/assets/font/iconfont.eot?t=1502946374117',
                '/hieknui-docs/assets/font/iconfont.eot?t=1502946374117#iefix',
                '/hieknui-docs/assets/font/iconfont.js',
                '/hieknui-docs/assets/font/iconfont.svg?t=1502946374117#hufont',
                '/hieknui-docs/assets/font/iconfont.ttf?t=1502946374117',
                '/hieknui-docs/assets/font/iconfont.woff?t=1502946374117',
                '/hieknui-docs/assets/github.min.css',
                '/hieknui-docs/assets/jquery.min.js',
                '/hieknui-docs/assets/clipboard.min.js',
                '/hieknui-docs/assets/jquery.mousewheel.min.js',
                '/hieknui-docs/assets/lodash.min.js',
                '/hieknui-docs/assets/highlight.min.js',
                '/hieknui-docs/assets/xml.min.js',
                '/hieknui-docs/assets/javascript.min.js',
                '/hieknui-docs/assets/css.min.js'
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
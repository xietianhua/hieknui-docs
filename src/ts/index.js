var Index = (function () {
    function Index() {
        this.init();
    }
    Index.highlight = function ($item, html, js, css) {
        if (html === void 0) { html = ''; }
        if (js === void 0) { js = ''; }
        if (css === void 0) { css = ''; }
        var tabId1 = HuCommonUtils.randomId('code-tab');
        var tabId2 = HuCommonUtils.randomId('code-tab');
        var tabId3 = HuCommonUtils.randomId('code-tab');
        var tabId4 = HuCommonUtils.randomId('code-tab');
        var tabHTML = "<div class=\"hu-card card-shadow code-demo\">\n                            <div class=\"hu-card-head\">\n                                <ul class=\"hu-tabs tabs-primary\">\n                                    <li class=\"active\"><a href=\"#" + tabId1 + "\">Demo</a></li>\n                                    " + (html ? "<li><a href=\"#" + tabId2 + "\">HTML</a></li>" : "") + "\n                                    " + (js ? "<li><a href=\"#" + tabId3 + "\">JAVASCRIPT</a></li>" : "") + "\n                                    " + (css ? "<li><a href=\"#" + tabId4 + "\">CSS</a></li>" : "") + "\n                                </ul>\n                            </div>\n                            <div class=\"hu-card-body\">\n                                <div class=\"hu-tab-content\">\n                                    <div class=\"tab-pane active\" id=\"" + tabId1 + "\">\n                                        " + html + "\n                                    </div>\n                                    <div class=\"tab-pane\" id=\"" + tabId2 + "\">\n                                        <pre><code class=\"html\"></code></pre>\n                                    </div>\n                                    <div class=\"tab-pane\" id=\"" + tabId3 + "\">\n                                        <pre><code class=\"javascript\">" + js + "</code></pre>\n                                    </div>\n                                    <div class=\"tab-pane\" id=\"" + tabId4 + "\">\n                                        <pre><code class=\"css\">" + css + "</code></pre>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>";
        var $new = $(tabHTML);
        html = style_html(html);
        $new.find('code.html').text(html);
        $item.replaceWith($new);
        hljs.highlightBlock($new.find('code.html')[0]);
        hljs.highlightBlock($new.find('code.javascript')[0]);
        hljs.highlightBlock($new.find('code.css')[0]);
    };
    Index.prototype.init = function () {
        this.sw();
        this.updateTabPos();
        this.buildDemo();
        this.copy();
        this.setDocs();
    };
    Index.prototype.updateTabPos = function () {
        if (location.hash) {
            var $a = $('a[href="' + location.hash + '"]');
            $a.parent().trigger('click');
            var $p = $a.closest('.tab-pane');
            if ($p.length) {
                var id = $p.attr('id');
                $('a[href="#' + id + '"]').parent().trigger('click');
            }
        }
    };
    Index.prototype.copy = function () {
        var clipboard = new Clipboard('.icon');
        $('li').find('i').each(function (i, v) {
            $(v).attr('data-clipboard-text', v.outerHTML);
        });
        clipboard.on('success', function () {
            $('.prompt-success').show(200, function () {
                setTimeout(function () {
                    $('.prompt-success').hide(200);
                }, 500);
            });
        });
    };
    Index.prototype.setDocs = function () {
        $('.demo-html').each(function (i, v) {
            var $form = $(v).removeClass('demo-html');
            var html = $form[0].outerHTML;
            if ($form.hasClass('line')) {
                html = $form.html();
            }
            Index.highlight($form, html);
        });
    };
    Index.prototype.buildDemo = function () {
        $('.code-demo').each(function (i, v) {
            var $v = $(v);
            var $demo = $v.find('[data-tab="demo"]');
            $("<div class=\"hu-card-head\">\n                    <ul class=\"hu-tabs tabs-primary\">\n                    </ul>\n                </div>").prependTo($v);
            var $head = $v.find('.hu-tabs');
            if ($demo.length) {
                var tabId1 = HuCommonUtils.randomId('code-tab');
                $demo.attr('id', tabId1);
                $head.append("<li><a href=\"#" + tabId1 + "\">Demo</a></li>");
                if ($demo.is('[data-html]')) {
                    var htmlRef = $demo.attr('data-html');
                    var html = $demo.html();
                    if (htmlRef) {
                        html = $(htmlRef)[0].outerHTML;
                    }
                    var tabId2 = HuCommonUtils.randomId('code-tab');
                    var $html = $("<div class=\"tab-pane\" data-tab=\"html\" id=\"" + tabId2 + "\">\n                                        <pre><code class=\"html\"></code></pre>\n                                    </div>");
                    $html.find('code.html').text(style_html(html));
                    $demo.after($html);
                    $head.append("<li><a href=\"#" + tabId2 + "\">HTML</a></li>");
                    hljs.highlightBlock($html.find('code.html')[0]);
                }
            }
            var $code = $v.find('[data-tab="javascript"]');
            if ($code.length) {
                var tabId = HuCommonUtils.randomId('code-tab');
                $code.attr('id', tabId);
                $head.append("<li><a href=\"#" + tabId + "\">JAVASCRIPT</a></li>");
                var code = $code.text().trim();
                if (code) {
                    eval(code);
                    $code.html("<pre><code class=\"javascript\">" + js_beautify(code) + "</code></pre>");
                    hljs.highlightBlock($code.find('code.javascript')[0]);
                }
            }
            var $api = $v.find('[data-tab="api"]');
            if ($api.length) {
                var tabId = HuCommonUtils.randomId('code-tab');
                $api.attr('id', tabId);
                $head.append("<li><a href=\"#" + tabId + "\">API</a></li>");
                var $code2 = $api.find('.javascript');
                if ($code2.length) {
                    var code = $code2.text().trim();
                    if (code) {
                        $code2.html("<pre><code class=\"javascript\">" + js_beautify(code) + "</code></pre>");
                        hljs.highlightBlock($code2.find('code.javascript')[0]);
                    }
                }
            }
            $head.find('li.tabs-decoration').appendTo($head);
            $head.find('li:eq(0)').trigger('click');
        });
    };
    Index.prototype.sw = function () {
        if ('serviceWorker' in navigator && location.protocol === 'https:') {
            navigator.serviceWorker.register('/hieknui/sw.js?t=' + new Date().getTime(), { scope: '/hieknui/' }).then(function (reg) {
                if (reg.installing) {
                    console.log('Service worker installing');
                }
                else if (reg.waiting) {
                    console.log('Service worker installed');
                }
                else if (reg.active) {
                    console.log('Service worker active');
                }
            }).catch(function (error) {
                // registration failed
                console.log('Registration failed with ' + error);
            });
        }
    };
    return Index;
}());
$(function () {
    var indexService = new Index();
});
//# sourceMappingURL=index.js.map
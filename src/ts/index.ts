declare const HuCommonUtils: any;
declare const hljs: any;
declare const _: any;
declare const Clipboard: any;
declare const style_html: any;
declare const js_beautify: any;

class Index {
    constructor() {
        this.init();
    }

    private init() {
        this.sw();
        this.updateTabPos();
        this.buildDemo();
        this.copy();
        this.setDocs();
    }

    private updateTabPos() {
        if (location.hash) {
            const $a = $('a[href="' + location.hash + '"]');
            $a.parent().trigger('click');
            const $p = $a.closest('.tab-pane');
            if ($p.length) {
                const id = $p.attr('id');
                $('a[href="#' + id + '"]').parent().trigger('click');
            }
        }
    }

    private copy() {
        const clipboard = new Clipboard('.icon');
        $('li').find('i').each(function (i, v) {
            $(v).attr('data-clipboard-text', v.outerHTML)
        });
        clipboard.on('success', () => {
            $('.prompt-success').show(200, () => {
                setTimeout(() => {
                    $('.prompt-success').hide(200)
                }, 500);
            });
        });
    }

    private setDocs() {
        $('.demo-html').each(function (i, v) {
            const $form = $(v).removeClass('demo-html');
            let html = $form[0].outerHTML;
            if ($form.hasClass('line')) {
                html = $form.html();
            }
            Demo.highlight($form, html);
        });
    }

    private static highlight($item: JQuery, html = '', js = '', css = '') {
        let tabId1 = HuCommonUtils.randomId('code-tab');
        let tabId2 = HuCommonUtils.randomId('code-tab');
        let tabId3 = HuCommonUtils.randomId('code-tab');
        let tabId4 = HuCommonUtils.randomId('code-tab');
        let tabHTML = `<div class="hu-card card-shadow code-demo">
                            <div class="hu-card-head">
                                <ul class="hu-tabs tabs-primary">
                                    <li class="active"><a href="#${tabId1}">Demo</a></li>
                                    ${html ? `<li><a href="#${tabId2}">HTML</a></li>` : `` }
                                    ${js ? `<li><a href="#${tabId3}">JAVASCRIPT</a></li>` : `` }
                                    ${css ? `<li><a href="#${tabId4}">CSS</a></li>` : `` }
                                </ul>
                            </div>
                            <div class="hu-card-body">
                                <div class="hu-tab-content">
                                    <div class="tab-pane active" id="${tabId1}">
                                        ${html}
                                    </div>
                                    <div class="tab-pane" id="${tabId2}">
                                        <pre><code class="html"></code></pre>
                                    </div>
                                    <div class="tab-pane" id="${tabId3}">
                                        <pre><code class="javascript">${js}</code></pre>
                                    </div>
                                    <div class="tab-pane" id="${tabId4}">
                                        <pre><code class="css">${css}</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        const $new = $(tabHTML);
        html = style_html(html);
        $new.find('code.html').text(html);
        $item.replaceWith($new);
        hljs.highlightBlock($new.find('code.html')[0]);
        hljs.highlightBlock($new.find('code.javascript')[0]);
        hljs.highlightBlock($new.find('code.css')[0]);
    }

    private buildDemo() {
        $('.code-demo').each((i, v) => {
            const $v = $(v);
            const $demo = $v.find('[data-tab="demo"]');
            $(`<div class="hu-card-head">
                    <ul class="hu-tabs tabs-primary">
                    </ul>
                </div>`).prependTo($v);
            const $head = $v.find('.hu-tabs');
            if ($demo.length) {
                let tabId1 = HuCommonUtils.randomId('code-tab');
                $demo.attr('id', tabId1);
                $head.append(`<li><a href="#${tabId1}">Demo</a></li>`);
                if ($demo.is('[data-html]')) {
                    const htmlRef = $demo.attr('data-html');
                    let html = $demo.html();
                    if (htmlRef) {
                        html = $(htmlRef)[0].outerHTML;
                    }
                    let tabId2 = HuCommonUtils.randomId('code-tab');
                    const $html = $(`<div class="tab-pane" data-tab="html" id="${tabId2}">
                                        <pre><code class="html"></code></pre>
                                    </div>`);
                    $html.find('code.html').text(style_html(html));
                    $demo.after($html);
                    $head.append(`<li><a href="#${tabId2}">HTML</a></li>`);
                    hljs.highlightBlock($html.find('code.html')[0]);
                }
            }
            const $code = $v.find('[data-tab="javascript"]');
            if ($code.length) {
                let tabId = HuCommonUtils.randomId('code-tab');
                $code.attr('id', tabId);
                $head.append(`<li><a href="#${tabId}">JAVASCRIPT</a></li>`);
                const code = $code.text().trim();
                if (code) {
                    eval(code);
                    $code.html(`<pre><code class="javascript">${js_beautify(code)}</code></pre>`);
                    hljs.highlightBlock($code.find('code.javascript')[0]);
                }
            }
            const $api = $v.find('[data-tab="api"]');
            if ($api.length) {
                let tabId = HuCommonUtils.randomId('code-tab');
                $api.attr('id', tabId);
                $head.append(`<li><a href="#${tabId}">API</a></li>`);
                const $code = $api.find('.javascript');
                if ($code.length) {
                    const code = $code.text().trim();
                    if (code) {
                        $code.html(`<pre><code class="javascript">${js_beautify(code)}</code></pre>`);
                        hljs.highlightBlock($code.find('code.javascript')[0]);
                    }
                }
            }
            $head.find('li.tabs-decoration').appendTo($head);
            $head.find('li:eq(0)').trigger('click');
        });
    }

    private sw() {
        if ('serviceWorker' in navigator && location.protocol == 'https:') {
            navigator.serviceWorker.register('/hieknui/sw.js?t=' + new Date().getTime(), {scope: '/hieknui/'}).then(function (reg) {

                if (reg.installing) {
                    console.log('Service worker installing');
                } else if (reg.waiting) {
                    console.log('Service worker installed');
                } else if (reg.active) {
                    console.log('Service worker active');
                }

            }).catch(function (error) {
                // registration failed
                console.log('Registration failed with ' + error);
            });
        }
    }
}

$(() => {
    new Index();
});

declare const HuCommonUtils: any;
declare const hljs: any;
declare const _: any;
declare const Clipboard: any;
declare const style_html: any;
declare const js_beautify: any;
declare class Index {
    private static highlight($item, html?, js?, css?);
    constructor();
    private init();
    private updateTabPos();
    private copy();
    private setDocs();
    private buildDemo();
    private sw();
}

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 显示方法，在DialogManager脚本中调用
     */
    View.prototype.show = function () {
        if (!this.parent) {
            Main.euiLayer.addChild(this);
        }
    };
    /**
     * 移除显示方法，在DialogManager脚本中调用
     */
    View.prototype.hide = function () {
        if (this.parent) {
            Main.euiLayer.removeChild(this);
        }
    };
    return View;
}(eui.Group));

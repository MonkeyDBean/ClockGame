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
var EndView = (function (_super) {
    __extends(EndView, _super);
    function EndView() {
        var _this = _super.call(this) || this;
        DialogManager.remove("GameView");
        return _this;
    }
    EndView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        EndView.m_UI = new EndViewSkin();
        this.addChild(EndView.m_UI);
    };
    return EndView;
}(View));
var EndViewSkin = (function (_super) {
    __extends(EndViewSkin, _super);
    function EndViewSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/skins/EndSkin.exml";
        return _this;
    }
    EndViewSkin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    return EndViewSkin;
}(eui.Component));

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
var MyLoadingView = (function (_super) {
    __extends(MyLoadingView, _super);
    function MyLoadingView() {
        return _super.call(this) || this;
    }
    MyLoadingView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.m_UI = new MyLoadingViewSkin();
        this.addChild(this.m_UI);
        this.showAnimation();
    };
    MyLoadingView.prototype.showAnimation = function () {
        egret.Tween.get(this.m_UI.whiteDot1, { loop: true }).to({ alpha: 0 }, 1).wait(100).to({ alpha: 1 }, 1).wait(300);
        egret.Tween.get(this.m_UI.whiteDot2, { loop: true }).to({ alpha: 0 }, 1).wait(200).to({ alpha: 1 }, 1).wait(200);
        egret.Tween.get(this.m_UI.whiteDot3, { loop: true }).to({ alpha: 0 }, 1).wait(300).to({ alpha: 1 }, 1).wait(100);
    };
    return MyLoadingView;
}(View));
var MyLoadingViewSkin = (function (_super) {
    __extends(MyLoadingViewSkin, _super);
    function MyLoadingViewSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/skins/MyLoadingSkin.exml";
        return _this;
    }
    MyLoadingViewSkin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    return MyLoadingViewSkin;
}(eui.Component));

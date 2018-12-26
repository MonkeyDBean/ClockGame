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
/**
 * Created by Bean on 2016/7/20.
 */
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Wall.prototype.init = function () {
        this.width = 640;
        this.height = 960;
        this.wallBgImage = new eui.Image();
        this.wallBgImage.source = "bgWall";
        this.wallBgImage.width = 640;
        this.wallBgImage.height = 960;
        this.wallBgImage.anchorOffsetX = this.wallBgImage.width / 2;
        this.wallBgImage.anchorOffsetY = this.wallBgImage.height / 2;
        this.wallBgImage.x = 320;
        this.wallBgImage.y = 480;
        this.addChild(this.wallBgImage);
        egret.Tween.get(this.wallBgImage, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    return Wall;
}(eui.Group));

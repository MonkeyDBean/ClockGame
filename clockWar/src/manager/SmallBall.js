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
var SmallBall = (function (_super) {
    __extends(SmallBall, _super);
    function SmallBall() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SmallBall.prototype.init = function () {
        this.moveSpeed = 10;
        this.smallBallImage = new eui.Image();
        this.smallBallImage.source = "pic_smallBall";
        this.setNormalSize();
        this.smallBallAngle = 0;
        this.addChild(this.smallBallImage);
    };
    SmallBall.prototype.setNormalSize = function () {
        this.width = 20;
        this.height = 20;
        this.smallBallImage.height = 20;
        this.smallBallImage.width = 20;
        this.smallBallImage.anchorOffsetX = this.smallBallImage.width / 2;
        this.smallBallImage.anchorOffsetY = this.smallBallImage.height / 2;
    };
    SmallBall.prototype.setBigSize = function () {
        this.width = 80;
        this.height = 80;
        this.smallBallImage.height = 80;
        this.smallBallImage.width = 80;
        this.smallBallImage.anchorOffsetX = this.smallBallImage.width / 2;
        this.smallBallImage.anchorOffsetY = this.smallBallImage.height / 2;
    };
    return SmallBall;
}(eui.Group));

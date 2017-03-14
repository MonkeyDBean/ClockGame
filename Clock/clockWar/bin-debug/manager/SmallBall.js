/**
 * Created by Bean on 2016/8/17.
 */
var SmallBall = (function (_super) {
    __extends(SmallBall, _super);
    function SmallBall() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=SmallBall,p=c.prototype;
    p.init = function () {
        this.moveSpeed = 10;
        //������С��
        this.smallBallImage = new eui.Image();
        this.smallBallImage.source = "pic_smallBall";
        this.setNormalSize();
        this.smallBallAngle = 0;
        this.addChild(this.smallBallImage);
    };
    p.setNormalSize = function () {
        this.width = 20;
        this.height = 20;
        this.smallBallImage.height = 20;
        this.smallBallImage.width = 20;
        this.smallBallImage.anchorOffsetX = this.smallBallImage.width / 2;
        this.smallBallImage.anchorOffsetY = this.smallBallImage.height / 2;
    };
    p.setBigSize = function () {
        this.width = 80;
        this.height = 80;
        this.smallBallImage.height = 80;
        this.smallBallImage.width = 80;
        this.smallBallImage.anchorOffsetX = this.smallBallImage.width / 2;
        this.smallBallImage.anchorOffsetY = this.smallBallImage.height / 2;
    };
    return SmallBall;
}(eui.Group));
egret.registerClass(SmallBall,'SmallBall');

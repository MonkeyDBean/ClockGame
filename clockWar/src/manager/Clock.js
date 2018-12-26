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
var clockType;
(function (clockType) {
    clockType[clockType["normal"] = 0] = "normal";
    clockType[clockType["tortoise"] = 1] = "tortoise";
    clockType[clockType["quick"] = 2] = "quick";
    clockType[clockType["bigger"] = 3] = "bigger";
    clockType[clockType["wall"] = 4] = "wall";
    clockType[clockType["allBlock"] = 5] = "allBlock";
    clockType[clockType["laser"] = 6] = "laser";
    clockType[clockType["wave"] = 7] = "wave";
    clockType[clockType["dart"] = 8] = "dart"; //8
})(clockType || (clockType = {}));
var Clock = (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Clock.prototype.init = function () {
        this.type = clockType.normal;
        this.activePoint = false;
        this.bg = new eui.Image();
        this.clockPoint = new eui.Image();
        this.bg.source = "clockBgWhite";
        this.clockPoint.source = "clockPointBlue";
        this.clockPoint.rotation = Math.floor(Math.random() * 360);
        this.randomSize = Math.ceil(Math.random() * 3);
        this.randomSpeed = Math.ceil(Math.random() * 3);
        this.randomWise = Math.ceil(Math.random() * 2);
        if (this.randomSize == 1) {
            this.width = 80;
            this.height = 80;
            this.bg.width = 80;
            this.bg.height = 80;
            this.clockPoint.width = 80;
            this.clockPoint.height = 80;
        }
        else if (this.randomSize == 2) {
            this.width = 120;
            this.height = 120;
            this.bg.width = 120;
            this.bg.height = 120;
            this.clockPoint.width = 120;
            this.clockPoint.height = 120;
        }
        else if (this.randomSize == 3) {
            this.width = 160;
            this.height = 160;
            this.bg.width = 160;
            this.bg.height = 160;
            this.clockPoint.width = 160;
            this.clockPoint.height = 160;
        }
        if (this.randomSpeed == 1) {
            this.randomSpeed = 450; //0.8s/r
        }
        else if (this.randomSpeed == 2) {
            this.randomSpeed = 360; //1s/r
        }
        else if (this.randomSpeed == 3) {
            this.randomSpeed = 300; //1.2s/r
        }
        if (this.randomWise == 2) {
            this.randomWise = -1;
        }
        this.bg.x = 0;
        this.bg.y = 0;
        this.addChild(this.bg);
        this.clockPoint.anchorOffsetX = this.clockPoint.width / 2;
        this.clockPoint.anchorOffsetY = this.clockPoint.height / 2;
        this.clockPoint.x = this.width / 2;
        this.clockPoint.y = this.height / 2;
        this.addChild(this.clockPoint);
        this.addEventListener(egret.Event.ENTER_FRAME, this.clockFrameHandler, this);
    };
    Clock.prototype.clockFrameHandler = function () {
        this.clockPoint.rotation += this.randomWise * this.randomSpeed * GameController.getInstance().durTime;
    };
    Clock.prototype.removeFrameHandler = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.clockFrameHandler, this);
    };
    Clock.prototype.setSize = function () {
        this.randomSize = 3;
        this.width = 160;
        this.height = 160;
        this.bg.width = 160;
        this.bg.height = 160;
        this.clockPoint.width = 160;
        this.clockPoint.height = 160;
        this.clockPoint.anchorOffsetX = this.clockPoint.width / 2;
        this.clockPoint.anchorOffsetY = this.clockPoint.height / 2;
        this.clockPoint.x = this.width / 2;
        this.clockPoint.y = this.height / 2;
    };
    return Clock;
}(eui.Group));

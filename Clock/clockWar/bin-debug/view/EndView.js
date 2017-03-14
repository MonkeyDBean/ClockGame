/**
 * Created by LN on 2016/1/23.
 */
var EndView = (function (_super) {
    __extends(EndView, _super);
    function EndView() {
        _super.call(this);
        DialogManager.remove("GameView");
    }
    var d = __define,c=EndView,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        EndView.m_UI = new EndViewSkin();
        this.addChild(EndView.m_UI);
        Advert.getInstance().ShowAdvert("end");
    };
    //获取运行平台
    p.isAndroidAgents = function () {
        var agent = window.navigator.userAgent.toLowerCase();
        if (("" + agent.match(/android/i)) == "android") {
            console.log("true");
            var url = "http://www.fcbrains.com/web/kjyx/dl/index.html";
            window.location.href = url;
        }
        else {
            console.log("false");
            var url = "http://www.fcbrains.com/web/kjyx/dl/index.html";
            window.location.href = url;
        }
    };
    /**
     * 点击按钮动画
     */
    p.onClickBtnAnimator = function (e) {
        e.target.touchEnabled = false;
        var target = e.currentTarget["_source"].toString();
        var _btn = e.target;
        _btn.scaleX = _btn.scaleY = 1;
        egret.Tween.get(_btn, { loop: false }).to({
            scaleX: 1.1,
            scaleY: 1.1
        }, 100).
            to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            switch (target) {
                case "tryAgain":
                    this.tryAgain();
                    break;
                case "more":
                    this.more();
                    break;
                case "detail":
                    this.detail();
                    break;
                case "share":
                    this.rankSystem();
                    break;
                default:
                    break;
            }
        }, this);
    };
    p.tryAgain = function () {
        console.log("再试一次");
        //Advert.getInstance().RemoveAdvert();
        egret.setTimeout(function () {
            DialogManager.open(GameView, "GameView", 1);
            GameController.getInstance().Init();
        }, this, 500);
    };
    p.more = function () {
        console.log("返回首页");
        egret.setTimeout(function () {
            var url = "http://" + Info.head + ".fcbrains.com/games/zqdn/index.html";
            window.location.href = url;
        }, this, 500);
    };
    p.detail = function () {
        console.log("返回潜能分析");
        egret.setTimeout(function () {
            var url = "http://" + Info.head + ".fcbrains.com/games/fkxt/index.html";
            window.location.href = url;
        }, this, 500);
    };
    p.rankSystem = function () {
        console.log("返回排行榜");
        egret.setTimeout(function () {
            var url = "http://" + Info.head + ".fcbrains.com/games/phxt/index.html";
            window.location.href = url;
        }, this, 500);
    };
    return EndView;
}(View));
egret.registerClass(EndView,'EndView');
var EndViewSkin = (function (_super) {
    __extends(EndViewSkin, _super);
    function EndViewSkin() {
        _super.call(this);
        this.skinName = "src/skins/EndSkin.exml";
    }
    var d = __define,c=EndViewSkin,p=c.prototype;
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    return EndViewSkin;
}(eui.Component));
egret.registerClass(EndViewSkin,'EndViewSkin');

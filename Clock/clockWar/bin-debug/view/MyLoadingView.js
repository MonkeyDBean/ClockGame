/**
 * Created by Bean on 2016/8/23.
 */
var MyLoadingView = (function (_super) {
    __extends(MyLoadingView, _super);
    function MyLoadingView() {
        _super.call(this);
    }
    var d = __define,c=MyLoadingView,p=c.prototype;
    /**
     * add·½·¨ִÐÐÍê±ϣ¬µ÷Óø÷½·¨
     */
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.m_UI = new MyLoadingViewSkin();
        this.addChild(this.m_UI);
        //console.log(this);
        //console.log(this.m_UI);
        //console.log(this.m_UI.whiteDot1);
        //console.log(this.m_UI.myLoadingBg);
        this.showAnimation();
    };
    p.showAnimation = function () {
        egret.Tween.get(this.m_UI.whiteDot1, { loop: true }).to({ alpha: 0 }, 1).wait(100).to({ alpha: 1 }, 1).wait(300);
        egret.Tween.get(this.m_UI.whiteDot2, { loop: true }).to({ alpha: 0 }, 1).wait(200).to({ alpha: 1 }, 1).wait(200);
        egret.Tween.get(this.m_UI.whiteDot3, { loop: true }).to({ alpha: 0 }, 1).wait(300).to({ alpha: 1 }, 1).wait(100);
    };
    return MyLoadingView;
}(View));
egret.registerClass(MyLoadingView,'MyLoadingView');
var MyLoadingViewSkin = (function (_super) {
    __extends(MyLoadingViewSkin, _super);
    function MyLoadingViewSkin() {
        _super.call(this);
        this.skinName = "src/skins/MyLoadingSkin.exml"; // ָ¶¨SkinĿ¼¼°ȫÃû
    }
    var d = __define,c=MyLoadingViewSkin,p=c.prototype;
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    return MyLoadingViewSkin;
}(eui.Component));
egret.registerClass(MyLoadingViewSkin,'MyLoadingViewSkin');

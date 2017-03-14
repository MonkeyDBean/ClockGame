/**
 * Created by LN on 2016/1/23.
 */
class EndView extends View {

    public static m_UI: EndViewSkin;

    public constructor ()
    {
        super ();
        DialogManager.remove("GameView");
    }


    public createChildren ()
    {
        super.createChildren ();
        EndView.m_UI = new EndViewSkin ();
        this.addChild( EndView.m_UI );

        Advert.getInstance().ShowAdvert("end");
    }

    //获取运行平台
    public isAndroidAgents()
    {
        var agent = window.navigator.userAgent.toLowerCase();
        if(("" + agent.match(/android/i)) == "android") {
            console.log("true");

            var url : string = "http://www.fcbrains.com/web/kjyx/dl/index.html";
            window.location.href = url;


        } else {
            console.log("false");

            var url : string = "http://www.fcbrains.com/web/kjyx/dl/index.html";
            window.location.href = url;
        }
    }

    /**
     * 点击按钮动画
     */
    private onClickBtnAnimator (e : egret.Event)
    {
        e.target.touchEnabled = false;
        var target = e.currentTarget["_source"].toString();
        var _btn = e.target;
        _btn.scaleX = _btn.scaleY = 1;
        egret.Tween.get(_btn, {loop: false}).to({
            scaleX: 1.1,
            scaleY: 1.1
        }, 100).
            to({scaleX:1,scaleY:1}, 100).call(function() {
                switch (target) {
                    case "tryAgain":
                        this.tryAgain()
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
                    default :
                        break;
                }
            }, this);
    }

    private tryAgain () {
        console.log("再试一次");

        //Advert.getInstance().RemoveAdvert();

        egret.setTimeout(function() {
            DialogManager.open(GameView,"GameView",1);
            GameController.getInstance().Init ();
        }, this, 500);

    }

    private more () {
        console.log("返回首页");
        egret.setTimeout(function(){
            var url = "http://" + Info.head + ".fcbrains.com/games/zqdn/index.html";
            window.location.href = url;
        },this, 500);
    }

    private detail () {
        console.log("返回潜能分析");

        egret.setTimeout(function(){
            var url = "http://" + Info.head + ".fcbrains.com/games/fkxt/index.html";
            window.location.href = url;
        },this, 500);
    }

    private rankSystem () {
        console.log("返回排行榜");
        
        egret.setTimeout(function(){
            var url = "http://" + Info.head + ".fcbrains.com/games/phxt/index.html";
            window.location.href = url;
        },this, 500);
    }

}






class EndViewSkin extends eui.Component
{
    public constructor ()
    {
        super ();

        this.skinName = "src/skins/EndSkin.exml";
    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);


    }

    
}
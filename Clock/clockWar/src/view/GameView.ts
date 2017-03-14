/**
 * Created by LN on 2016/1/20.
 */
class GameView extends View {

    public static m_UI: GameViewSkin;

    public constructor()
    {
        super();
        DialogManager.remove("EndView");
    }


    /**
     * add方法执行完毕，调用该方法
     */
    public createChildren() {
        super.createChildren();
        GameView.m_UI = new GameViewSkin();
        this.addChild(GameView.m_UI);

        Advert.getInstance().ShowAdvert("game");
    }
}

class GameViewSkin extends eui.Component
{
    public constructor ()
    {
        super ();
        this.skinName = "src/skins/GameSkin.exml";  // 指定Skin目录及全名
    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);
    }

    public game_bg : eui.Image;        //

    public myLife : eui.Label;
    public myAim : eui.Label;
    public myScore : eui.Label;
    public nextLevelText : eui.Label;
    public myBuff : eui.Label;
    public gameOverText : eui.Label;
    public winText:eui.Label;
    public authorText:eui.Label;
    public shareText:eui.Label;

    //模式按钮
    public modeLevel : eui.Image;
    public modeSurvival : eui.Image;

    //重新开始
    public restart : eui.Image;
    //分享图标
    public xinlang_Icon:eui.Image;
    public qq_Icon:eui.Image;
    public txWeibo_Icon:eui.Image;
    public erweima_Icon:eui.Image;

}
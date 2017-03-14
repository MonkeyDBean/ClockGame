/**
 * Created by Bean on 2016/8/22.
 */
/**
 * Created by Bean on 2016/8/17.
 */
class Wall extends eui.Group
{
    public wallBgImage:eui.Image; //Η½Με±³Ύ°

    public constructor(){
        super();
        this.init();
    }
    private init() {
        this.width = 640;
        this.height = 960;
        this.wallBgImage = new eui.Image();
        this.wallBgImage.source = "bgWall";
        this.wallBgImage.width = 640;
        this.wallBgImage.height = 960;
        this.wallBgImage.anchorOffsetX = this.wallBgImage.width/2;
        this.wallBgImage.anchorOffsetY = this.wallBgImage.height/2;
        this.wallBgImage.x = 320;
        this.wallBgImage.y = 480;
        this.addChild(this.wallBgImage);
        egret.Tween.get(this.wallBgImage,{loop:true}).to({alpha:0},500).to({alpha:1},500);
    }
}
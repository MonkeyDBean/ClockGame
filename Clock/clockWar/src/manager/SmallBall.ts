/**
 * Created by Bean on 2016/8/17.
 */
class SmallBall extends eui.Group
{
    public smallBallImage:eui.Image; //С��
    public smallBallAngle:number; //С��Ƕ�
    public moveSpeed:number;//С��ÿ֡�ƶ��ٶ�

    public constructor(){
        super();
        this.init();
    }
    private init() {
        this.moveSpeed = 10;
        //�����С��
        this.smallBallImage = new eui.Image();
        this.smallBallImage.source = "pic_smallBall";
        this.setNormalSize();
        this.smallBallAngle = 0;
        this.addChild(this.smallBallImage);

    }
    public setNormalSize(){
        this.width = 20;
        this.height = 20;
        this.smallBallImage.height = 20;
        this.smallBallImage.width = 20;
        this.smallBallImage.anchorOffsetX = this.smallBallImage.width/2;
        this.smallBallImage.anchorOffsetY = this.smallBallImage.height/2;
    }
    public setBigSize(){
        this.width = 80;
        this.height = 80;
        this.smallBallImage.height = 80;
        this.smallBallImage.width = 80;
        this.smallBallImage.anchorOffsetX = this.smallBallImage.width/2;
        this.smallBallImage.anchorOffsetY = this.smallBallImage.height/2;
    }

}
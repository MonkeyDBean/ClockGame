/**
 * Created by Bean on 2016/8/16.
 */

enum clockType
{
    normal,     //0，正常状态
    tortoise,   //1,龟速状态，所有钟表旋转速度减半
    quick,      //2,快速状态
    bigger,     //3,球变大
    wall,  //4,碰撞状态,四壁
    allBlock,    //5,地图变为满排方块
    laser,       //6,激光状态，指针增加激光束
    wave,        //7,月牙冲击波，指针变为月牙冲击波
    dart         //8,指针变为回力镖
}

class Clock extends eui.Group{

    public bg:eui.Image;
    public clockPoint:eui.Image;
    public activePoint:boolean;//当前时钟是否为激活的发射时钟
    public type:clockType;
    public clockPosition:number; //当前时钟在地图上的位置

    //钟表大小
    private randomSize:number;

    //钟表旋转速度
    public randomSpeed:number;

    //钟表旋转方向
    private randomWise:number;

    public constructor(){
        super();
        this.init();
    }

    private init()
    {
        this.type = clockType.normal;
        this.activePoint = false;
        this.bg = new eui.Image();
        this.clockPoint = new eui.Image();
        this.bg.source = "clockBgWhite";
        this.clockPoint.source = "clockPointBlue";
        this.clockPoint.rotation = Math.floor(Math.random() * 360);

        //1为80乘以80，2为120乘以120,3为160乘以160
        this.randomSize = Math.ceil(Math.random() * 3);

        //1为0.8s/r, 2为1s/r, 3为1.2s/r
        this.randomSpeed = Math.ceil(Math.random() * 3);

        //1为顺时针，2逆时针
        this.randomWise = Math.ceil(Math.random() * 2);

        //钟表大小
        if(this.randomSize == 1)
        {
            this.width = 80;
            this.height = 80;
            this.bg.width = 80;
            this.bg.height = 80;
            this.clockPoint.width = 80;
            this.clockPoint.height = 80;
        }
        else if(this.randomSize == 2)
        {
            this.width = 120;
            this.height = 120;
            this.bg.width = 120;
            this.bg.height = 120;
            this.clockPoint.width = 120;
            this.clockPoint.height = 120;
        }
        else if(this.randomSize == 3)
        {
            this.width = 160;
            this.height = 160;
            this.bg.width = 160;
            this.bg.height = 160;
            this.clockPoint.width = 160;
            this.clockPoint.height = 160;
        }

        //钟表旋转速度
        if(this.randomSpeed == 1)
        {
            this.randomSpeed = 450;        //0.8s/r
        }
        else if(this.randomSpeed == 2)
        {
            this.randomSpeed = 360;          //1s/r
        }
        else if(this.randomSpeed == 3)
        {
            this.randomSpeed = 300;       //1.2s/r
        }

        //钟表旋转方向
        if(this.randomWise == 2)
        {
            this.randomWise = -1;
        }

        this.bg.x = 0;
        this.bg.y = 0;
        this.addChild(this.bg);

        this.clockPoint.anchorOffsetX = this.clockPoint.width/2;
        this.clockPoint.anchorOffsetY = this.clockPoint.height/2;
        this.clockPoint.x = this.width/2;
        this.clockPoint.y = this.height/2;
        this.addChild(this.clockPoint);

        this.addEventListener(egret.Event.ENTER_FRAME,this.clockFrameHandler,this);
    }

    //钟表帧监听
    public clockFrameHandler(){
        //钟表指针旋转
        this.clockPoint.rotation += this.randomWise*this.randomSpeed*GameController.getInstance().durTime;
    }

    //移除钟表帧监听
    public removeFrameHandler(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.clockFrameHandler,this);
    }

    //用于雷丘的，allBlock
    public setSize()
    {
        this.randomSize = 3;
        this.width = 160;
        this.height = 160;
        this.bg.width = 160;
        this.bg.height = 160;
        this.clockPoint.width = 160;
        this.clockPoint.height = 160;

        this.clockPoint.anchorOffsetX = this.clockPoint.width/2;
        this.clockPoint.anchorOffsetY = this.clockPoint.height/2;
        this.clockPoint.x = this.width/2;
        this.clockPoint.y = this.height/2;
    }
}
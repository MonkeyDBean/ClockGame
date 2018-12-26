/**
 * Created by Bean on 2016/7/20.
 */
enum clockType
{
    normal, //0
    tortoise,
    quick,
    bigger, //4
    wall,
    allBlock,
    laser,
    wave,
    dart    //8
}

class Clock extends eui.Group{
    public bg:eui.Image;
    public clockPoint:eui.Image;
    public activePoint:boolean;
    public type:clockType;
    public clockPosition:number;
    private randomSize:number;
    public randomSpeed:number;
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

        this.randomSize = Math.ceil(Math.random() * 3);

        this.randomSpeed = Math.ceil(Math.random() * 3);

        this.randomWise = Math.ceil(Math.random() * 2);

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

    public clockFrameHandler(){
        this.clockPoint.rotation += this.randomWise*this.randomSpeed*GameController.getInstance().durTime;
    }

    public removeFrameHandler(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.clockFrameHandler,this);
    }

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
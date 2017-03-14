/**
 * Created by Bean on 2016/8/16.
 */
class MapLevel extends eui.Group {
    public clockArray:Array<Clock>;//关卡钟表数组
    public slowTime:number;//吃到杰尼龟后时钟变慢次数
    public quickTime:number;//吃到皮卡丘后时钟变快次数
    public bigTime:number;//吃到小火龙后小球变大次数
    public wallTime:number;//吃到妙蛙种子可碰撞墙体的次数
    public wallBg:eui.Group;//背景四周墙
    public clockNum:number;//当前地图时钟数量

    public constructor() {
        super();
        this.init();
    }

    private init()
    {
        this.bigTime = 0;
        this.slowTime = 0;
        this.quickTime = 0;
        this.wallTime = 0;

        this.width = 960;
        this.height = 640;
        this.readMap();
    }

    //碰撞检测
    private collisionFrameHandler()
    {
        if(GameController.getInstance().touchMove)
        {
            if(this.clockArray.length == 0)
            {
                GameController.getInstance().touchMove = false;
                this.removeCollisionFrame();
                return;
            }
            for(var i=0;i<this.clockArray.length;i++)
            {
                if(this.hitTest(GameController.getInstance().smallBall,this.clockArray[i].clockPoint))
                {
                    if(this.clockArray[i].type == clockType.normal)
                    {
                        PlayAudio(4, 1, false, false);
                        //每次碰撞slowTime自减1
                        if(this.slowTime>0)
                        {
                            this.slowTime --;
                            if(this.slowTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed*2;
                                }
                            }
                        }

                        //每次碰撞quickTime自减1
                        if(this.quickTime>0)
                        {
                            this.quickTime --;
                            if(this.quickTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed/2;
                                }
                            }
                        }

                        //碰撞到其他方块时，bigger自减
                        if(this.bigTime>0)
                        {
                            this.bigTime --;
                            if(this.bigTime == 0)
                            {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //碰撞到方块后，可撞墙次数更改
                        if(this.wallTime>3)
                        {
                            this.wallTime = 3;
                        }
                        else if(this.wallTime <=3 && this.wallTime>0)
                        {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if(this.clockArray[i].type == clockType.tortoise)
                    {
                        PlayAudio(5, 1, false, false);
                        //显示Buff
                        GameView.m_UI.myBuff.text = "Slow !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);

                        egret.setTimeout(function():void{
                            GameView.m_UI.myBuff.visible = false;
                        },this,1000);

                        //所有时钟转速减半
                        for(var j=0;j<this.clockArray.length;j++)
                        {
                            this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed/2;
                        }
                        this.slowTime = 1;

                        //每次碰撞quickTime自减1
                        if(this.quickTime>0)
                        {
                            this.quickTime --;
                            if(this.quickTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed/2;
                                }
                            }
                        }

                        //碰撞到其他方块时，bigger自减
                        if(this.bigTime>0)
                        {
                            this.bigTime --;
                            if(this.bigTime == 0)
                            {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //碰撞到方块后，可撞墙次数更改
                        if(this.wallTime>3)
                        {
                            this.wallTime = 3;
                        }
                        else if(this.wallTime <=3 && this.wallTime>0)
                        {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if(this.clockArray[i].type == clockType.quick)
                    {
                        PlayAudio(6, 1, false, false);
                        //显示Buff
                        GameView.m_UI.myBuff.text = "Quick !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);

                        egret.setTimeout(function():void{
                            GameView.m_UI.myBuff.visible = false;
                        },this,1000);
                        //所有时钟转速增加一倍
                        for(var j=0;j<this.clockArray.length;j++)
                        {
                            this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed*2;
                        }
                        this.quickTime = 1;

                        //每次碰撞slowTime自减1
                        if(this.slowTime>0)
                        {
                            this.slowTime --;
                            if(this.slowTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed*2;
                                }
                            }
                        }
                        //碰撞到其他方块时，bigger自减
                        if(this.bigTime>0)
                        {
                            this.bigTime --;
                            if(this.bigTime == 0)
                            {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //碰撞到方块后，可撞墙次数更改
                        if(this.wallTime>3)
                        {
                            this.wallTime = 3;
                        }
                        else if(this.wallTime <=3 && this.wallTime>0)
                        {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if(this.clockArray[i].type == clockType.bigger)
                    {
                        PlayAudio(9, 1, false, false);
                        //显示Buff
                        GameView.m_UI.myBuff.text = "Big !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);

                        egret.setTimeout(function():void{
                            GameView.m_UI.myBuff.visible = false;
                        },this,1000);

                        GameController.getInstance().smallBall.setBigSize();
                        this.bigTime = 2;


                        //每次碰撞quickTime自减1
                        if(this.quickTime>0)
                        {
                            this.quickTime --;
                            if(this.quickTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed/2;
                                }
                            }
                        }
                        //每次碰撞slowTime自减1
                        if(this.slowTime>0)
                        {
                            this.slowTime --;
                            if(this.slowTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed*2;
                                }
                            }
                        }
                        //碰撞到方块后，可撞墙次数更改
                        if(this.wallTime>3)
                        {
                            this.wallTime = 3;
                        }
                        else if(this.wallTime <=3 && this.wallTime>0)
                        {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if(this.clockArray[i].type == clockType.wall)
                    {
                        PlayAudio(7, 1, false, false);
                        //显示Buff
                        GameView.m_UI.myBuff.text = "Wall !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);

                        egret.setTimeout(function():void{
                            GameView.m_UI.myBuff.visible = false;
                        },this,1000);

                        if(this.wallTime == 0)
                        {
                            this.wallTime = 10;
                            this.wallBg = new Wall();
                            this.wallBg.x = 0;
                            this.wallBg.y = 0;
                            this.addChild(this.wallBg);
                        }
                        else
                        {
                            this.wallTime = 10;
                        }

                        //每次碰撞quickTime自减1
                        if(this.quickTime>0)
                        {
                            this.quickTime --;
                            if(this.quickTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed/2;
                                }
                            }
                        }
                        //每次碰撞slowTime自减1
                        if(this.slowTime>0)
                        {
                            this.slowTime --;
                            if(this.slowTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed*2;
                                }
                            }
                        }
                        //碰撞到其他方块时，bigger自减
                        if(this.bigTime>0)
                        {
                            this.bigTime --;
                            if(this.bigTime == 0)
                            {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                    }
                    else if(this.clockArray[i].type == clockType.allBlock)
                    {
                        PlayAudio(8, 1, false, false);
                        //显示Buff
                        GameView.m_UI.myBuff.text = "Square !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);

                        egret.setTimeout(function():void{
                            GameView.m_UI.myBuff.visible = false;
                        },this,1000);

                        this.removeChildren();
                        //记录当前砖块的位置
                        i=this.clockArray[i].clockPosition;

                        this.clockArray = new Array();
                        for(var j = 0;j<24;j++)
                        {
                            this.clockArray[j] = new Clock();
                            this.clockArray[j].setSize();

                            //左上角对齐
                            this.clockArray[j].anchorOffsetX = 0;
                            this.clockArray[j].anchorOffsetY = 0;
                            this.clockArray[j].x = j % 4 * 160;
                            this.clockArray[j].y = Math.floor(j / 4)*160;

                            this.clockArray[j].clockPosition = j;
                            this.addChild(this.clockArray[j]);
                        }

                        //每次碰撞quickTime自减1
                        if(this.quickTime>0)
                        {
                            this.quickTime --;
                            if(this.quickTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed/2;
                                }
                            }
                        }
                        //每次碰撞slowTime自减1
                        if(this.slowTime>0)
                        {
                            this.slowTime --;
                            if(this.slowTime == 0)
                            {
                                for(var j=0;j<this.clockArray.length;j++)
                                {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed*2;
                                }
                            }
                        }
                        //碰撞到其他方块时，bigger自减
                        if(this.bigTime>0)
                        {
                            this.bigTime --;
                            if(this.bigTime == 0)
                            {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //碰撞到方块后，可撞墙次数更改
                        if(this.wallTime>3)
                        {
                            this.wallTime = 3;
                        }
                        else if(this.wallTime <=3 && this.wallTime>0)
                        {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }

                    if(GameController.getInstance().curLevel == GameController.getInstance().maxLevel || GameController.getInstance().curLevel == GameController.getInstance().maxLevel+1) //关卡模式最后一关以及生存模式
                    {
                        if(this.clockArray.length == 4)
                        {
                            var clockPosition = Math.floor(Math.random() * 23);

                            while(this.clockArray[0].clockPosition == clockPosition || this.clockArray[1].clockPosition == clockPosition || this.clockArray[2].clockPosition == clockPosition || this.clockArray[3].clockPosition == clockPosition)
                            {
                                clockPosition = Math.floor(Math.random() * 23);
                            }

                            var randomPosition = Math.ceil(Math.random() * 4);
                            var newClock = new Clock();
                            this.clockArray.push(newClock);
                            switch (randomPosition)
                            {
                                //左上角对齐
                                case 1:
                                    newClock.anchorOffsetX = 0;
                                    newClock.anchorOffsetY = 0;
                                    newClock.x = clockPosition % 4 * 160;
                                    newClock.y = Math.floor(clockPosition / 4)*160;
                                    break;
                                //左下角对齐
                                case 2:
                                    newClock.anchorOffsetX = 0;
                                    newClock.anchorOffsetY = newClock.height;
                                    newClock.x = clockPosition % 4 * 160;
                                    newClock.y = Math.floor(clockPosition / 4)*160+160;
                                    break;
                                //右上角对齐
                                case 3:
                                    newClock.anchorOffsetX = newClock.width;
                                    newClock.anchorOffsetY = 0;
                                    newClock.x = clockPosition % 4 * 160+160;
                                    newClock.y = Math.floor(clockPosition / 4)*160;
                                    break;
                                //右下角对齐
                                case 4:
                                    newClock.anchorOffsetX = newClock.width;
                                    newClock.anchorOffsetY = newClock.height;
                                    newClock.x = clockPosition % 4 * 160+160;
                                    newClock.y = Math.floor(clockPosition / 4)*160+160;
                                    break;
                                default:
                                    ;
                            }
                            var randomType = Math.floor(Math.random() * 100);
                            if(randomType<10)  //quick
                            {
                                newClock.bg.source = "clockBgQuick";
                                newClock.type = clockType.quick;
                            }
                            else if(randomType<20) //slow
                            {
                                newClock.bg.source = "clockBgTortoise";
                                newClock.type = clockType.tortoise;
                            }
                            else if(randomType<30) //big
                            {
                                newClock.bg.source = "clockBgBig";
                                newClock.type = clockType.bigger;
                            }
                            else if(randomType<40) //wall
                            {
                                newClock.bg.source = "clockBgWall";
                                newClock.type = clockType.wall;
                            }
                            else
                            {
                                newClock.type = clockType.normal;
                            }
                            newClock.clockPosition = clockPosition;
                            this.addChild(newClock);
                        }
                    }

                    this.clockArray[i].bg.source = "clockBgMy";
                    this.clockArray[i].clockPoint.source = "clockPointMy";
                    this.clockArray[i].activePoint = true;
                    GameController.getInstance().touchMove = false;
                    Main.euiLayer.removeChild(GameController.getInstance().smallBall);
                    GameController.getInstance().myScore++;
                    GameView.m_UI.myScore.text = "Score : "+GameController.getInstance().myScore;
                    break;

                }
            }
            if(this.wallTime>0)
            {
                if(GameController.getInstance().smallBall.x<10&&GameController.getInstance().smallBall.x>0 || GameController.getInstance().smallBall.x>630&&GameController.getInstance().smallBall.x<640)
                {
                    GameController.getInstance().smallBall.smallBallAngle = Math.PI-GameController.getInstance().smallBall.smallBallAngle;
                    this.wallTime--;
                }
                else if(GameController.getInstance().smallBall.y<10&&GameController.getInstance().smallBall.y>0 || GameController.getInstance().smallBall.y>950&&GameController.getInstance().smallBall.y<960)
                {
                    GameController.getInstance().smallBall.smallBallAngle = -GameController.getInstance().smallBall.smallBallAngle;
                    this.wallTime--;
                }
                if(this.wallTime <= 0)
                {
                    this.removeChild(this.wallBg);
                }
            }
        }
    }

    public readMap()
    {
        //4乘以6的网格
        //网格与表盘重合的角，左上1，左下2，右上3，右下4，四种概率相同
        if(GameController.getInstance().curLevel <= GameController.getInstance().maxLevel)   //关卡模式
        {
            this.clockNum = GameController.getInstance()._stageJson["Level" + GameController.getInstance().curLevel]["clockNum"];
        }
        else if(GameController.getInstance().curLevel == GameController.getInstance().maxLevel+1)    //生存模式
        {
            this.clockNum = GameController.getInstance()._stageJson["Survival"]["clockNum"];
        }
        //随机的初始时钟
        var randomClock = Math.ceil(Math.random() * this.clockNum-1);

        this.clockArray = new Array();

        for(var i=0;i<this.clockNum;i++)
        {
            if(GameController.getInstance().curLevel <= GameController.getInstance().maxLevel)   //关卡模式
            {
                var clockPosition = GameController.getInstance()._stageJson["Level" + GameController.getInstance().curLevel]["clockPosition"][i];
            }
            else if(GameController.getInstance().curLevel == GameController.getInstance().maxLevel+1)    //生存模式
            {
                var clockPosition = GameController.getInstance()._stageJson["Survival"]["clockPosition"][i];
            }
            var randomPosition = Math.ceil(Math.random() * 4);
            this.clockArray[i] = new Clock();
            this.clockArray[i].clockPosition = clockPosition;
            this.addChild(this.clockArray[i]);
            switch (randomPosition)
            {
                //左上角对齐
                case 1:
                    this.clockArray[i].anchorOffsetX = 0;
                    this.clockArray[i].anchorOffsetY = 0;
                    this.clockArray[i].x = clockPosition % 4 * 160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4)*160;
                    break;
                //左下角对齐
                case 2:
                    this.clockArray[i].anchorOffsetX = 0;
                    this.clockArray[i].anchorOffsetY = this.clockArray[i].height;
                    this.clockArray[i].x = clockPosition % 4 * 160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4)*160+160;
                    break;
                //右上角对齐
                case 3:
                    this.clockArray[i].anchorOffsetX = this.clockArray[i].width;
                    this.clockArray[i].anchorOffsetY = 0;
                    this.clockArray[i].x = clockPosition % 4 * 160+160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4)*160;
                    break;
                //右下角对齐
                case 4:
                    this.clockArray[i].anchorOffsetX = this.clockArray[i].width;
                    this.clockArray[i].anchorOffsetY = this.clockArray[i].height;
                    this.clockArray[i].x = clockPosition % 4 * 160+160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4)*160+160;
                    break;
                default:
                    ;
            }
        }

        this.clockArray[randomClock].bg.source = "clockBgMy";
        this.clockArray[randomClock].clockPoint.source = "clockPointMy";
        this.clockArray[randomClock].activePoint = true;

        var randomSlow =  Math.ceil(Math.random() * this.clockNum-1);
        var randomQuick = Math.ceil(Math.random() * this.clockNum-1);
        var randomBigger = Math.ceil(Math.random() * this.clockNum-1);
        var randomWall = Math.ceil(Math.random() * this.clockNum-1);
        var randomBlock = Math.ceil(Math.random() * this.clockNum-1);

        //关卡初始特殊类型设置
        if(GameController.getInstance().curLevel == 2)   //allBlock
        {
            while(randomBlock == randomClock)
            {
                randomBlock =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomBlock].bg.source = "clockBgBlock";
            this.clockArray[randomBlock].type = clockType.allBlock;
        }
        else if(GameController.getInstance().curLevel == 3)   //slow
        {
            while(randomSlow == randomClock)
            {
                randomSlow =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;
        }
        else if(GameController.getInstance().curLevel == 4)  //quick
        {
            while(randomQuick == randomClock)
            {
                randomQuick =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomQuick].bg.source = "clockBgQuick";
            this.clockArray[randomQuick].type = clockType.quick;
        }
        else if(GameController.getInstance().curLevel == 5)  //big
        {
            while(randomBigger == randomClock)
            {
                randomBigger =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomBigger].bg.source = "clockBgBig";
            this.clockArray[randomBigger].type = clockType.bigger;
        }
        else if(GameController.getInstance().curLevel == 6)  //wall
        {
            while(randomWall == randomClock)
            {
                randomWall =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomWall].bg.source = "clockBgWall";
            this.clockArray[randomWall].type = clockType.wall;
        }
        else if(GameController.getInstance().curLevel == 7)  //quick,slow,big
        {
            while(randomSlow == randomClock)
            {
                randomSlow =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;

            while(randomQuick == randomClock || randomQuick == randomSlow)
            {
                randomQuick =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomQuick].bg.source = "clockBgQuick";
            this.clockArray[randomQuick].type = clockType.quick;

            while(randomBigger == randomClock || randomBigger == randomSlow|| randomBigger == randomQuick)
            {
                randomBigger =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomBigger].bg.source = "clockBgBig";
            this.clockArray[randomBigger].type = clockType.bigger;
        }
        else if(GameController.getInstance().curLevel == 8) //slow,wall
        {
            while(randomSlow == randomClock)
            {
                randomSlow =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;

            while(randomWall == randomClock || randomWall == randomSlow)
            {
                randomWall =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomWall].bg.source = "clockBgWall";
            this.clockArray[randomWall].type = clockType.wall;
        }
        else if(GameController.getInstance().curLevel >= 9)
        {
            while(randomSlow == randomClock)
            {
                randomSlow =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;

            while(randomQuick == randomClock || randomQuick == randomSlow)
            {
                randomQuick =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomQuick].bg.source = "clockBgQuick";
            this.clockArray[randomQuick].type = clockType.quick;

            while(randomBigger == randomClock || randomBigger == randomSlow|| randomBigger == randomQuick)
            {
                randomBigger =  Math.ceil(Math.random() * this.clockNum-1);
            }
            this.clockArray[randomBigger].bg.source = "clockBgBig";
            this.clockArray[randomBigger].type = clockType.bigger;
        }

        this.addEventListener(egret.Event.ENTER_FRAME,this.collisionFrameHandler,this);
        Main.euiLayer.addChild(GameView.m_UI.myScore);
    }

    //移除碰撞监听
    public removeCollisionFrame(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.collisionFrameHandler,this);
    }

    //碰撞检测
    public hitTest(obj1: egret.DisplayObject,obj2: egret.DisplayObject): boolean
    {
        var aa:egret.Point = obj1.parent.localToGlobal(obj1.x,obj1.y);
        var bb:egret.Point = obj2.parent.localToGlobal(obj2.x,obj2.y);
        var rect1:egret.Rectangle =  new egret.Rectangle(aa.x - obj1.width/2 ,aa.y - obj1.height/2, obj1.width ,obj1.height);
        var rect2:egret.Rectangle =  new egret.Rectangle(bb.x - obj2.width/2 ,bb.y - obj2.height/2, obj2.width ,obj2.height);
        return rect1.intersects(rect2);
    }
}
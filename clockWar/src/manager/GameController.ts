class GameController
{
    private static instance:GameController;
    public static getInstance():GameController {
        if(this.instance == null) {
            this.instance = new GameController();
        }
        return this.instance;
    }

    // 游戏的临时数据
    public data : any;

    //场景Json数据
    public _stageJson:any;

    //当前关卡,用于读取地图
    public curLevel:number;

    //关卡数量
    public maxLevel:number;

    //当前地图
    public mapLevel:MapLevel;

    //小球
    public smallBall:SmallBall;

    //获得分数
    public myScore:number;

    //玩家生命
    public myLife:number;

    //游戏模式，1为关卡模式,2为生存模式
    public gameMode:number;

    //根据fps获取单帧时间
    public beginTime:any;
    public endTime:any;
    public durTime:any;

    //触屏使指针开始移动
    public touchMove:boolean;

    //author的新浪微博主页
    private authorHref:string;

    //分享的文字内容
    private containerText:string;

    //分享的链接
    private url:string;

    //分享的图片链接
    private imgUrl:string;

    /**
     * 初始化游戏数据，然后开始
     */
    public Init ()
    {
        this.authorHref = "http://weibo.com/monkeybeanZ";
        this.containerText = "MonkeyBean Game : 时钟的空间,你能得几分？ ";
        this.url = window.location.href;
        this.imgUrl = "http://monkeybean.applinzi.com/clockGame/resource/assets_self/game/clockIcon.png";
        this._stageJson = RES.getRes("stageJson");
        this.maxLevel = this._stageJson["maxLevel"];
        GameView.m_UI.modeLevel.visible = true;
        GameView.m_UI.modeSurvival.visible = true;
        GameView.m_UI.modeLevel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginLevel,this);
        GameView.m_UI.modeSurvival.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginSurvival,this);
    }

    //关卡模式
    public touchBeginLevel()
    {
        GameView.m_UI.modeLevel.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginLevel,this);
        GameView.m_UI.modeSurvival.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginSurvival,this);
        PlayAudio(10, 1, false, false);
        egret.Tween.get(GameView.m_UI.modeLevel).to({scaleX:0.8,scaleY:0.8},200).to({scaleX:1,scaleY:1},200).call(function(){
            GameView.m_UI.modeLevel.visible = false;
            GameView.m_UI.modeSurvival.visible = false;
            GameView.m_UI.myAim.visible = true;
            GameView.m_UI.myLife.visible = true;
            this.myLife = 3;
            this.StartGameLevel();
        },this);
    }
    //生存模式
    public touchBeginSurvival(){
        GameView.m_UI.modeLevel.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginLevel,this);
        GameView.m_UI.modeSurvival.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginSurvival,this);
        PlayAudio(10, 1, false, false);
        egret.Tween.get(GameView.m_UI.modeSurvival).to({scaleX:0.8,scaleY:0.8},200).to({scaleX:1,scaleY:1},200).call(function(){
            GameView.m_UI.modeLevel.visible = false;
            GameView.m_UI.modeSurvival.visible = false;
            this.myLife = 1;
            this.StartGameSurvival();
        },this);
    }

    public StartGameSurvival(){
        PlayAudio(0, 1, false, false);
        this.myScore = 0;
        this.gameMode = 2;
        GameView.m_UI.myScore.text = "Score : "+GameController.getInstance().myScore;

        this.touchMove = false;

        this.curLevel = this.maxLevel+1; //生存模式单独处理

        //小球
        this.smallBall = new SmallBall();

        //地图
        this.mapLevel = new MapLevel();

        Main.euiLayer.addChild(this.mapLevel);

        //记录帧时间初始化
        this.beginTime = egret.getTimer();
        this.endTime = egret.getTimer();

        //时间监听
        Main.euiLayer.addEventListener(egret.Event.ENTER_FRAME,this.GameFrameHandler,this);
        Main.euiLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchEvent,this);
    }

    public StartGameLevel()
    {
        PlayAudio(0, 1, false, false);
        this.myScore = 0;
        this.gameMode = 1;
        GameView.m_UI.myScore.text = "Score : "+GameController.getInstance().myScore;

        this.touchMove = false;
        this.curLevel = 1;

        //小球
        this.smallBall = new SmallBall();
        //地图
        this.mapLevel = new MapLevel();

        Main.euiLayer.addChild(this.mapLevel);

        //记录帧时间初始化
        this.beginTime = egret.getTimer();
        this.endTime = egret.getTimer();

        //时间监听
        Main.euiLayer.addEventListener(egret.Event.ENTER_FRAME,this.GameFrameHandler,this);
        Main.euiLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchEvent,this);

        //显示当前关卡
        GameView.m_UI.nextLevelText.text = "Level 1";
        GameView.m_UI.nextLevelText.visible = true;
        Main.euiLayer.addChild(GameView.m_UI.nextLevelText);

        egret.setTimeout(function():void{
            GameView.m_UI.nextLevelText.visible = false;
        },this,1000);
    }

    //添加监听
    private GameFrameHandler() {
        //console.log("Main.euiLayer.numChildren",Main.euiLayer.numChildren);
        //console.log("this.mapLevel.numChildren",this.mapLevel.numChildren);

        this.endTime = this.beginTime;
        this.beginTime = egret.getTimer();
        this.durTime = (this.beginTime - this.endTime) / 1000;//两帧间隔时间，单位设置为秒

        //小球移动
        if(this.touchMove)
        {
            this.smallBall.x += this.smallBall.moveSpeed * Math.cos(this.smallBall.smallBallAngle);
            this.smallBall.y += this.smallBall.moveSpeed * Math.sin(this.smallBall.smallBallAngle);
        }
        //下一关
        if(this.mapLevel.clockArray.length == 0)
        {
            this.touchMove = false;
            Main.euiLayer.removeChild(this.smallBall);

            this.curLevel++;

            //if(this.curLevel<=1)
            if(this.curLevel<=this.maxLevel)
            {
                this.mapLevel.readMap();
                GameView.m_UI.nextLevelText.text = "Level "+this.curLevel;
                GameView.m_UI.nextLevelText.visible = true;
                Main.euiLayer.addChild(GameView.m_UI.nextLevelText);

                egret.setTimeout(function():void{
                    GameView.m_UI.nextLevelText.visible = false;
                },this,1000);
            }

        }

        //通关,游戏胜利
        if(this.myScore >= 120 && this.gameMode == 1)
        {
            Main.euiLayer.removeEventListener(egret.Event.ENTER_FRAME,this.GameFrameHandler,this);
            Main.euiLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchEvent,this);

            this.mapLevel.removeCollisionFrame();
            Main.euiLayer.removeChild(this.mapLevel);
            PlayAudio(2, 1, false, false);
            GameView.m_UI.winText.visible = true;
            this.IconEventEnd();
        }

        //游戏结束
        if(this.smallBall.x<0||this.smallBall.x>640||this.smallBall.y<0||this.smallBall.y>960)
        {
            this.myLife --;
            GameView.m_UI.myLife.text = "Life : "+this.myLife;
            if(this.myLife>0)
            {
                this.smallBall.x = 0;
                this.smallBall.y = 0;

                Main.euiLayer.removeChild(this.smallBall);
                Main.euiLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchEvent,this);

                this.touchMove = false;
                this.mapLevel.removeCollisionFrame();
                Main.euiLayer.removeChild(this.mapLevel);
                GameController.getInstance().mapLevel.removeChildren();
                GameController.getInstance().mapLevel.readMap();
                Main.euiLayer.addChild(this.mapLevel);

                PlayAudio(0, 1, false, false);
                GameView.m_UI.nextLevelText.visible = true;
                Main.euiLayer.addChild(GameView.m_UI.nextLevelText);
                egret.setTimeout(function():void{
                    GameView.m_UI.nextLevelText.visible = false;
                },this,1000);

                Main.euiLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchEvent,this);
            }
            else if(this.myLife <= 0)
            {
                this.gameFailure();
            }

            this.smallBall.setNormalSize();
        }
    }

    //结束界面添加监听和图标
    private IconEventEnd(){
        this.containerText = "MonkeyBean Game : 时钟的空间,我得了"+this.myScore+"分,你能得几分？ ";
        GameView.m_UI.authorText.visible = true;
        GameView.m_UI.authorText.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hrefEvent,this);

        GameView.m_UI.shareText.visible = true;

        GameView.m_UI.xinlang_Icon.visible = true;
        GameView.m_UI.xinlang_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareXinlang,this);

        GameView.m_UI.qq_Icon.visible = true;
        GameView.m_UI.qq_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareQQ,this);

        GameView.m_UI.txWeibo_Icon.visible = true;
        GameView.m_UI.txWeibo_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareTxWeibo,this);

        //二维码图标显示
        GameView.m_UI.erweima_Icon.visible = true;
        GameView.m_UI.erweima_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareIt,this);
    }

    //开始界面，顶层图标移除以及取消监听
    private IconEventStart(){
        this.containerText = "MonkeyBean Game : 时钟的空间,你能得几分？ ";
        GameView.m_UI.authorText.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hrefEvent,this);
        GameView.m_UI.authorText.visible = false;

        GameView.m_UI.shareText.visible = false;

        GameView.m_UI.xinlang_Icon.visible = false;
        GameView.m_UI.xinlang_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareXinlang,this);

        GameView.m_UI.qq_Icon.visible = false;
        GameView.m_UI.qq_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareQQ,this);

        GameView.m_UI.txWeibo_Icon.visible = false;
        GameView.m_UI.txWeibo_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareTxWeibo,this);

        GameView.m_UI.erweima_Icon.visible = false;
        GameView.m_UI.erweima_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareIt,this);
    }

    //重新开始
    private restartEvent(){
        this.IconEventStart();
        GameView.m_UI.gameOverText.visible = false;
        GameView.m_UI.restart.visible = false;
        GameView.m_UI.restart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.restartEvent,this);
        GameView.m_UI.myAim.visible = false;
        GameView.m_UI.myLife.visible = false;
        GameView.m_UI.modeLevel.visible = true;
        GameView.m_UI.modeSurvival.visible = true;
        GameView.m_UI.modeLevel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginLevel,this);
        GameView.m_UI.modeSurvival.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeginSurvival,this);
    }


    //触屏逻辑
    private touchEvent(){
        if(this.touchMove == false)
        {
            for(var i = 0;i< this.mapLevel.clockArray.length;i++)
            {
                if(this.mapLevel.clockArray[i].activePoint)
                {
                    var GloPos:egret.Point = this.mapLevel.clockArray[i].localToGlobal(this.mapLevel.clockArray[i].clockPoint.x,this.mapLevel.clockArray[i].clockPoint.y);
                    var localPos:egret.Point = this.mapLevel.globalToLocal(GloPos.x,GloPos.y);

                    this.smallBall.x =  localPos.x;
                    this.smallBall.y = localPos.y;

                    this.smallBall.smallBallAngle = this.mapLevel.clockArray[i].clockPoint.rotation;

                    //转化为sin和cos可处理的范围（正数0-180）
                    if( this.smallBall.smallBallAngle<0)
                    {
                        this.smallBall.smallBallAngle += 360;
                    }
                    //转化为弧度，sin和cos处理的是弧度
                    this.smallBall.smallBallAngle = this.smallBall.smallBallAngle*Math.PI/180;

                    //从舞台移除当前钟表
                    if(this.mapLevel.clockArray[i].bg.parent && this.mapLevel.clockArray[i].bg)
                    {
                        this.mapLevel.clockArray[i].activePoint = false;
                        this.mapLevel.clockArray[i].removeFrameHandler();
                        this.mapLevel.removeChild(this.mapLevel.clockArray[i]);
                        this.mapLevel.clockArray.splice(i,1);
                    }

                    Main.euiLayer.addChild(this.smallBall);
                }
            }
            PlayAudio(3, 1, false, false);
            this.touchMove = true;
        }
    }

    //author新浪主页链接跳转
    private hrefEvent(){
        //进入author新浪微博主页
        window.open(this.authorHref, 'newwindow');
    }

    //分享到新浪微博
    private shareXinlang(){
        var sharesinastring:string='http://v.t.sina.com.cn/share/share.php?title='+this.containerText+'&url='+this.url+'&content=utf-8&sourceUrl='+this.url+'&pic='+this.imgUrl;
        window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
    }

    //分享到qq
    private shareQQ(){
        var shareqqzonestring:string='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+this.containerText+'&url='+this.url+'&pics='+this.imgUrl;
        window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
    }

    //分享到腾讯微博
    private shareTxWeibo(){
        var shareqqstring:string='http://v.t.qq.com/share/share.php?title='+this.containerText+'&url='+this.url+'&pic='+this.imgUrl;
        window.open(shareqqstring,'newwindow','height=100,width=100,top=100,left=100');
    }


    //二维码
    private shareIt()
    {
        window.open(window.location.href, 'newwindow');
    }

    //游戏失败，结束
    private gameFailure(){
        Main.euiLayer.removeEventListener(egret.Event.ENTER_FRAME,this.GameFrameHandler,this);
        Main.euiLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchEvent,this);

        this.touchMove = false;

        this.mapLevel.removeCollisionFrame();
        Main.euiLayer.removeChild(this.mapLevel);
        Main.euiLayer.removeChild(this.smallBall);

        this.IconEventEnd();

        GameView.m_UI.gameOverText.visible = true;
        GameView.m_UI.restart.visible = true;
        GameView.m_UI.nextLevelText.visible = false;
        GameView.m_UI.restart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartEvent,this);
        PlayAudio(1, 1, false, false);
    }

    /**
     * 游戏结束逻辑
     */
    public GameOver()
    {
        Main.euiLayer.removeChildren();
        DialogManager.open(EndView, "EndView", 1);
    }
}

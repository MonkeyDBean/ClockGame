/**
 * Created by Bean on 2016/8/16.
 */
var MapLevel = (function (_super) {
    __extends(MapLevel, _super);
    function MapLevel() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=MapLevel,p=c.prototype;
    p.init = function () {
        this.bigTime = 0;
        this.slowTime = 0;
        this.quickTime = 0;
        this.wallTime = 0;
        this.width = 960;
        this.height = 640;
        this.readMap();
    };
    //��ײ����
    p.collisionFrameHandler = function () {
        if (GameController.getInstance().touchMove) {
            if (this.clockArray.length == 0) {
                GameController.getInstance().touchMove = false;
                this.removeCollisionFrame();
                return;
            }
            for (var i = 0; i < this.clockArray.length; i++) {
                if (this.hitTest(GameController.getInstance().smallBall, this.clockArray[i].clockPoint)) {
                    if (this.clockArray[i].type == clockType.normal) {
                        PlayAudio(4, 1, false, false);
                        //ÿ����ײslowTime�Լ�1
                        if (this.slowTime > 0) {
                            this.slowTime--;
                            if (this.slowTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed * 2;
                                }
                            }
                        }
                        //ÿ����ײquickTime�Լ�1
                        if (this.quickTime > 0) {
                            this.quickTime--;
                            if (this.quickTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed / 2;
                                }
                            }
                        }
                        //��ײ����������ʱ��bigger�Լ�
                        if (this.bigTime > 0) {
                            this.bigTime--;
                            if (this.bigTime == 0) {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //��ײ�������󣬿�ײǽ��������
                        if (this.wallTime > 3) {
                            this.wallTime = 3;
                        }
                        else if (this.wallTime <= 3 && this.wallTime > 0) {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if (this.clockArray[i].type == clockType.tortoise) {
                        PlayAudio(5, 1, false, false);
                        //��ʾBuff
                        GameView.m_UI.myBuff.text = "Slow !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);
                        egret.setTimeout(function () {
                            GameView.m_UI.myBuff.visible = false;
                        }, this, 1000);
                        //����ʱ��ת�ټ���
                        for (var j = 0; j < this.clockArray.length; j++) {
                            this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed / 2;
                        }
                        this.slowTime = 1;
                        //ÿ����ײquickTime�Լ�1
                        if (this.quickTime > 0) {
                            this.quickTime--;
                            if (this.quickTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed / 2;
                                }
                            }
                        }
                        //��ײ����������ʱ��bigger�Լ�
                        if (this.bigTime > 0) {
                            this.bigTime--;
                            if (this.bigTime == 0) {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //��ײ�������󣬿�ײǽ��������
                        if (this.wallTime > 3) {
                            this.wallTime = 3;
                        }
                        else if (this.wallTime <= 3 && this.wallTime > 0) {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if (this.clockArray[i].type == clockType.quick) {
                        PlayAudio(6, 1, false, false);
                        //��ʾBuff
                        GameView.m_UI.myBuff.text = "Quick !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);
                        egret.setTimeout(function () {
                            GameView.m_UI.myBuff.visible = false;
                        }, this, 1000);
                        //����ʱ��ת������һ��
                        for (var j = 0; j < this.clockArray.length; j++) {
                            this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed * 2;
                        }
                        this.quickTime = 1;
                        //ÿ����ײslowTime�Լ�1
                        if (this.slowTime > 0) {
                            this.slowTime--;
                            if (this.slowTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed * 2;
                                }
                            }
                        }
                        //��ײ����������ʱ��bigger�Լ�
                        if (this.bigTime > 0) {
                            this.bigTime--;
                            if (this.bigTime == 0) {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //��ײ�������󣬿�ײǽ��������
                        if (this.wallTime > 3) {
                            this.wallTime = 3;
                        }
                        else if (this.wallTime <= 3 && this.wallTime > 0) {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if (this.clockArray[i].type == clockType.bigger) {
                        PlayAudio(9, 1, false, false);
                        //��ʾBuff
                        GameView.m_UI.myBuff.text = "Big !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);
                        egret.setTimeout(function () {
                            GameView.m_UI.myBuff.visible = false;
                        }, this, 1000);
                        GameController.getInstance().smallBall.setBigSize();
                        this.bigTime = 2;
                        //ÿ����ײquickTime�Լ�1
                        if (this.quickTime > 0) {
                            this.quickTime--;
                            if (this.quickTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed / 2;
                                }
                            }
                        }
                        //ÿ����ײslowTime�Լ�1
                        if (this.slowTime > 0) {
                            this.slowTime--;
                            if (this.slowTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed * 2;
                                }
                            }
                        }
                        //��ײ�������󣬿�ײǽ��������
                        if (this.wallTime > 3) {
                            this.wallTime = 3;
                        }
                        else if (this.wallTime <= 3 && this.wallTime > 0) {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    else if (this.clockArray[i].type == clockType.wall) {
                        PlayAudio(7, 1, false, false);
                        //��ʾBuff
                        GameView.m_UI.myBuff.text = "Wall !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);
                        egret.setTimeout(function () {
                            GameView.m_UI.myBuff.visible = false;
                        }, this, 1000);
                        if (this.wallTime == 0) {
                            this.wallTime = 10;
                            this.wallBg = new Wall();
                            this.wallBg.x = 0;
                            this.wallBg.y = 0;
                            this.addChild(this.wallBg);
                        }
                        else {
                            this.wallTime = 10;
                        }
                        //ÿ����ײquickTime�Լ�1
                        if (this.quickTime > 0) {
                            this.quickTime--;
                            if (this.quickTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed / 2;
                                }
                            }
                        }
                        //ÿ����ײslowTime�Լ�1
                        if (this.slowTime > 0) {
                            this.slowTime--;
                            if (this.slowTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed * 2;
                                }
                            }
                        }
                        //��ײ����������ʱ��bigger�Լ�
                        if (this.bigTime > 0) {
                            this.bigTime--;
                            if (this.bigTime == 0) {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                    }
                    else if (this.clockArray[i].type == clockType.allBlock) {
                        PlayAudio(8, 1, false, false);
                        //��ʾBuff
                        GameView.m_UI.myBuff.text = "Square !";
                        GameView.m_UI.myBuff.visible = true;
                        Main.euiLayer.addChild(GameView.m_UI.myBuff);
                        egret.setTimeout(function () {
                            GameView.m_UI.myBuff.visible = false;
                        }, this, 1000);
                        this.removeChildren();
                        //��¼��ǰש����λ��
                        i = this.clockArray[i].clockPosition;
                        this.clockArray = new Array();
                        for (var j = 0; j < 24; j++) {
                            this.clockArray[j] = new Clock();
                            this.clockArray[j].setSize();
                            //���ϽǶ���
                            this.clockArray[j].anchorOffsetX = 0;
                            this.clockArray[j].anchorOffsetY = 0;
                            this.clockArray[j].x = j % 4 * 160;
                            this.clockArray[j].y = Math.floor(j / 4) * 160;
                            this.clockArray[j].clockPosition = j;
                            this.addChild(this.clockArray[j]);
                        }
                        //ÿ����ײquickTime�Լ�1
                        if (this.quickTime > 0) {
                            this.quickTime--;
                            if (this.quickTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed / 2;
                                }
                            }
                        }
                        //ÿ����ײslowTime�Լ�1
                        if (this.slowTime > 0) {
                            this.slowTime--;
                            if (this.slowTime == 0) {
                                for (var j = 0; j < this.clockArray.length; j++) {
                                    this.clockArray[j].randomSpeed = this.clockArray[j].randomSpeed * 2;
                                }
                            }
                        }
                        //��ײ����������ʱ��bigger�Լ�
                        if (this.bigTime > 0) {
                            this.bigTime--;
                            if (this.bigTime == 0) {
                                GameController.getInstance().smallBall.setNormalSize();
                            }
                        }
                        //��ײ�������󣬿�ײǽ��������
                        if (this.wallTime > 3) {
                            this.wallTime = 3;
                        }
                        else if (this.wallTime <= 3 && this.wallTime > 0) {
                            this.wallTime = 0;
                            this.removeChild(this.wallBg);
                        }
                    }
                    if (GameController.getInstance().curLevel == GameController.getInstance().maxLevel || GameController.getInstance().curLevel == GameController.getInstance().maxLevel + 1) {
                        if (this.clockArray.length == 4) {
                            var clockPosition = Math.floor(Math.random() * 23);
                            while (this.clockArray[0].clockPosition == clockPosition || this.clockArray[1].clockPosition == clockPosition || this.clockArray[2].clockPosition == clockPosition || this.clockArray[3].clockPosition == clockPosition) {
                                clockPosition = Math.floor(Math.random() * 23);
                            }
                            var randomPosition = Math.ceil(Math.random() * 4);
                            var newClock = new Clock();
                            this.clockArray.push(newClock);
                            switch (randomPosition) {
                                //���ϽǶ���
                                case 1:
                                    newClock.anchorOffsetX = 0;
                                    newClock.anchorOffsetY = 0;
                                    newClock.x = clockPosition % 4 * 160;
                                    newClock.y = Math.floor(clockPosition / 4) * 160;
                                    break;
                                //���½Ƕ���
                                case 2:
                                    newClock.anchorOffsetX = 0;
                                    newClock.anchorOffsetY = newClock.height;
                                    newClock.x = clockPosition % 4 * 160;
                                    newClock.y = Math.floor(clockPosition / 4) * 160 + 160;
                                    break;
                                //���ϽǶ���
                                case 3:
                                    newClock.anchorOffsetX = newClock.width;
                                    newClock.anchorOffsetY = 0;
                                    newClock.x = clockPosition % 4 * 160 + 160;
                                    newClock.y = Math.floor(clockPosition / 4) * 160;
                                    break;
                                //���½Ƕ���
                                case 4:
                                    newClock.anchorOffsetX = newClock.width;
                                    newClock.anchorOffsetY = newClock.height;
                                    newClock.x = clockPosition % 4 * 160 + 160;
                                    newClock.y = Math.floor(clockPosition / 4) * 160 + 160;
                                    break;
                                default:
                                    ;
                            }
                            var randomType = Math.floor(Math.random() * 100);
                            if (randomType < 10) {
                                newClock.bg.source = "clockBgQuick";
                                newClock.type = clockType.quick;
                            }
                            else if (randomType < 20) {
                                newClock.bg.source = "clockBgTortoise";
                                newClock.type = clockType.tortoise;
                            }
                            else if (randomType < 30) {
                                newClock.bg.source = "clockBgBig";
                                newClock.type = clockType.bigger;
                            }
                            else if (randomType < 40) {
                                newClock.bg.source = "clockBgWall";
                                newClock.type = clockType.wall;
                            }
                            else {
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
                    GameView.m_UI.myScore.text = "Score : " + GameController.getInstance().myScore;
                    break;
                }
            }
            if (this.wallTime > 0) {
                if (GameController.getInstance().smallBall.x < 10 && GameController.getInstance().smallBall.x > 0 || GameController.getInstance().smallBall.x > 630 && GameController.getInstance().smallBall.x < 640) {
                    GameController.getInstance().smallBall.smallBallAngle = Math.PI - GameController.getInstance().smallBall.smallBallAngle;
                    this.wallTime--;
                }
                else if (GameController.getInstance().smallBall.y < 10 && GameController.getInstance().smallBall.y > 0 || GameController.getInstance().smallBall.y > 950 && GameController.getInstance().smallBall.y < 960) {
                    GameController.getInstance().smallBall.smallBallAngle = -GameController.getInstance().smallBall.smallBallAngle;
                    this.wallTime--;
                }
                if (this.wallTime <= 0) {
                    this.removeChild(this.wallBg);
                }
            }
        }
    };
    p.readMap = function () {
        //4����6������
        //�����������غϵĽǣ�����1������2������3������4�����ָ�����ͬ
        if (GameController.getInstance().curLevel <= GameController.getInstance().maxLevel) {
            this.clockNum = GameController.getInstance()._stageJson["Level" + GameController.getInstance().curLevel]["clockNum"];
        }
        else if (GameController.getInstance().curLevel == GameController.getInstance().maxLevel + 1) {
            this.clockNum = GameController.getInstance()._stageJson["Survival"]["clockNum"];
        }
        //�����ĳ�ʼʱ��
        var randomClock = Math.ceil(Math.random() * this.clockNum - 1);
        this.clockArray = new Array();
        for (var i = 0; i < this.clockNum; i++) {
            if (GameController.getInstance().curLevel <= GameController.getInstance().maxLevel) {
                var clockPosition = GameController.getInstance()._stageJson["Level" + GameController.getInstance().curLevel]["clockPosition"][i];
            }
            else if (GameController.getInstance().curLevel == GameController.getInstance().maxLevel + 1) {
                var clockPosition = GameController.getInstance()._stageJson["Survival"]["clockPosition"][i];
            }
            var randomPosition = Math.ceil(Math.random() * 4);
            this.clockArray[i] = new Clock();
            this.clockArray[i].clockPosition = clockPosition;
            this.addChild(this.clockArray[i]);
            switch (randomPosition) {
                //���ϽǶ���
                case 1:
                    this.clockArray[i].anchorOffsetX = 0;
                    this.clockArray[i].anchorOffsetY = 0;
                    this.clockArray[i].x = clockPosition % 4 * 160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4) * 160;
                    break;
                //���½Ƕ���
                case 2:
                    this.clockArray[i].anchorOffsetX = 0;
                    this.clockArray[i].anchorOffsetY = this.clockArray[i].height;
                    this.clockArray[i].x = clockPosition % 4 * 160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4) * 160 + 160;
                    break;
                //���ϽǶ���
                case 3:
                    this.clockArray[i].anchorOffsetX = this.clockArray[i].width;
                    this.clockArray[i].anchorOffsetY = 0;
                    this.clockArray[i].x = clockPosition % 4 * 160 + 160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4) * 160;
                    break;
                //���½Ƕ���
                case 4:
                    this.clockArray[i].anchorOffsetX = this.clockArray[i].width;
                    this.clockArray[i].anchorOffsetY = this.clockArray[i].height;
                    this.clockArray[i].x = clockPosition % 4 * 160 + 160;
                    this.clockArray[i].y = Math.floor(clockPosition / 4) * 160 + 160;
                    break;
                default:
                    ;
            }
        }
        this.clockArray[randomClock].bg.source = "clockBgMy";
        this.clockArray[randomClock].clockPoint.source = "clockPointMy";
        this.clockArray[randomClock].activePoint = true;
        var randomSlow = Math.ceil(Math.random() * this.clockNum - 1);
        var randomQuick = Math.ceil(Math.random() * this.clockNum - 1);
        var randomBigger = Math.ceil(Math.random() * this.clockNum - 1);
        var randomWall = Math.ceil(Math.random() * this.clockNum - 1);
        var randomBlock = Math.ceil(Math.random() * this.clockNum - 1);
        //�ؿ���ʼ������������
        if (GameController.getInstance().curLevel == 2) {
            while (randomBlock == randomClock) {
                randomBlock = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomBlock].bg.source = "clockBgBlock";
            this.clockArray[randomBlock].type = clockType.allBlock;
        }
        else if (GameController.getInstance().curLevel == 3) {
            while (randomSlow == randomClock) {
                randomSlow = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;
        }
        else if (GameController.getInstance().curLevel == 4) {
            while (randomQuick == randomClock) {
                randomQuick = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomQuick].bg.source = "clockBgQuick";
            this.clockArray[randomQuick].type = clockType.quick;
        }
        else if (GameController.getInstance().curLevel == 5) {
            while (randomBigger == randomClock) {
                randomBigger = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomBigger].bg.source = "clockBgBig";
            this.clockArray[randomBigger].type = clockType.bigger;
        }
        else if (GameController.getInstance().curLevel == 6) {
            while (randomWall == randomClock) {
                randomWall = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomWall].bg.source = "clockBgWall";
            this.clockArray[randomWall].type = clockType.wall;
        }
        else if (GameController.getInstance().curLevel == 7) {
            while (randomSlow == randomClock) {
                randomSlow = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;
            while (randomQuick == randomClock || randomQuick == randomSlow) {
                randomQuick = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomQuick].bg.source = "clockBgQuick";
            this.clockArray[randomQuick].type = clockType.quick;
            while (randomBigger == randomClock || randomBigger == randomSlow || randomBigger == randomQuick) {
                randomBigger = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomBigger].bg.source = "clockBgBig";
            this.clockArray[randomBigger].type = clockType.bigger;
        }
        else if (GameController.getInstance().curLevel == 8) {
            while (randomSlow == randomClock) {
                randomSlow = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;
            while (randomWall == randomClock || randomWall == randomSlow) {
                randomWall = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomWall].bg.source = "clockBgWall";
            this.clockArray[randomWall].type = clockType.wall;
        }
        else if (GameController.getInstance().curLevel >= 9) {
            while (randomSlow == randomClock) {
                randomSlow = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomSlow].bg.source = "clockBgTortoise";
            this.clockArray[randomSlow].type = clockType.tortoise;
            while (randomQuick == randomClock || randomQuick == randomSlow) {
                randomQuick = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomQuick].bg.source = "clockBgQuick";
            this.clockArray[randomQuick].type = clockType.quick;
            while (randomBigger == randomClock || randomBigger == randomSlow || randomBigger == randomQuick) {
                randomBigger = Math.ceil(Math.random() * this.clockNum - 1);
            }
            this.clockArray[randomBigger].bg.source = "clockBgBig";
            this.clockArray[randomBigger].type = clockType.bigger;
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.collisionFrameHandler, this);
        Main.euiLayer.addChild(GameView.m_UI.myScore);
    };
    //�Ƴ���ײ����
    p.removeCollisionFrame = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.collisionFrameHandler, this);
    };
    //��ײ����
    p.hitTest = function (obj1, obj2) {
        var aa = obj1.parent.localToGlobal(obj1.x, obj1.y);
        var bb = obj2.parent.localToGlobal(obj2.x, obj2.y);
        var rect1 = new egret.Rectangle(aa.x - obj1.width / 2, aa.y - obj1.height / 2, obj1.width, obj1.height);
        var rect2 = new egret.Rectangle(bb.x - obj2.width / 2, bb.y - obj2.height / 2, obj2.width, obj2.height);
        return rect1.intersects(rect2);
    };
    return MapLevel;
}(eui.Group));
egret.registerClass(MapLevel,'MapLevel');

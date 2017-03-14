
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/jweixin/jweixin.js",
	"libs/modules/jstat/jstat.js",
	"libs/modules/dcagent/dcagent.js",
	"libs/modules/myaudio/myaudio.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/manager/Clock.js",
	"bin-debug/manager/GameController.js",
	"bin-debug/manager/MapLevel.js",
	"bin-debug/manager/SmallBall.js",
	"bin-debug/manager/Wall.js",
	"bin-debug/module/Advert.js",
	"bin-debug/module/AnchorUtil.js",
	"bin-debug/module/AudioManager.js",
	"bin-debug/module/DialogManager.js",
	"bin-debug/module/Erweima.js",
	"bin-debug/module/Info.js",
	"bin-debug/module/MyDebug.js",
	"bin-debug/module/net/NetAPI.js",
	"bin-debug/module/net/NetDetailRank.js",
	"bin-debug/module/net/NetManager.js",
	"bin-debug/module/ShareSDK.js",
	"bin-debug/module/UidUrlManager.js",
	"bin-debug/module/Week.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/view/View.js",
	"bin-debug/view/EndView.js",
	"bin-debug/view/GameView.js",
	"bin-debug/view/LoadingView.js",
	"bin-debug/view/MyLoadingView.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
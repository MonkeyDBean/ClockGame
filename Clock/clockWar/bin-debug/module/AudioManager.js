var AudioManager = (function () {
    function AudioManager() {
    }
    var d = __define,c=AudioManager,p=c.prototype;
    /** 播放 */
    AudioManager.PlaySound = function (_name) {
        if (_name != "" && _name != null) {
            this.sound = RES.getRes(_name);
            this.sound.play();
        }
    };
    return AudioManager;
}());
egret.registerClass(AudioManager,'AudioManager');

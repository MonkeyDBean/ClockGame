class AudioManager{
    private static sound : egret.Sound;

    /** 播放 */
    public static PlaySound (_name : string) {
        if (_name != "" && _name != null) {

            this.sound = RES.getRes(_name);
            this.sound.play();
        }

    }

}


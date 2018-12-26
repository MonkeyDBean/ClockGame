function SupportAudio()
{
    return audio.SupportAudio();
}

function LoadAudio()
{
    //console.log("isover"+audio.isover());
    return audio.isover();
}

//第几个音乐,音量(大于0),是否循环,是否继续播放
function PlayAudio (num, volume, isLoop, isContinue)
{
    if(audio.SupportAudio())
    {
        audio.play(num, volume, isLoop, isContinue);
    }
}

function PlayAllAudio()
{
    if(audio.SupportAudio())
    {
        audio.playAll();
    }
}

function StopAudio (num)
{
    audio.stop(num)
}

function StopAllAudio()
{
    audio.stopAll();
}

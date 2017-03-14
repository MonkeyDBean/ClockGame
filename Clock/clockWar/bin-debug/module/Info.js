/**
 * Created by WangChong on 15/12/7.
 */
var Info;
(function (Info) {
    Info.app = "clock"; // TODO 修改项目名称
    Info.appDataEyeId = "CDCF60D3DE923D3C5F2362086AD7718AB"; // TODO 修改项目对应DataEye的id
    Info.head = "www"; // 存储是dev还是www
    Info.uid = "";
    Info.pass = "";
    Info.fid = "";
    Info.nickname = "";
    Info.sex = "";
    Info.add = "";
    Info.iconUrl = "";
    Info.isLikeServer = true; // 是否关注公众号
    Info.averageScore = 2; // 常模平均值  TODO 修改
    Info.standardDeviation = 2; // 常模标准差  TODO 修改
    Info.rank = ""; // 排行 超过百分之多少的玩家
    var data; // 存储要上传到服务器详细记录(ops)的数据
    function SetData() {
        data =
            {
                "or": GameController.getInstance().data.originalScore,
                "fi": GameController.getInstance().data.finalScore,
                "de": // detail数据  TODO补全
                {}
            };
    }
    Info.SetData = SetData;
    function GetData() {
        var dataStr = JSON.stringify(data);
        console.log(dataStr);
        return dataStr;
    }
    Info.GetData = GetData;
})(Info || (Info = {}));

/**
 * Created by WangChong on 15/12/7.
 */
module Info {

    export var app : string = "clock";            // TODO 修改项目名称
    export var appDataEyeId : string = "CDCF60D3DE923D3C5F2362086AD7718AB";     // TODO 修改项目对应DataEye的id
    export var head : string = "www";             // 存储是dev还是www
    export var uid : string = "";
    export var pass : string = "";
    export var fid : string = "";
    export var nickname : string = "";
    export var sex : string = "";
    export var add : string = "";
    export var iconUrl : string = "";
    export var icon;
    export var isLikeServer : boolean = true;     // 是否关注公众号
    export var averageScore : number = 2;         // 常模平均值  TODO 修改
    export var standardDeviation : number = 2;    // 常模标准差  TODO 修改
    export var rank : string = "";               // 排行 超过百分之多少的玩家

    var data;                                     // 存储要上传到服务器详细记录(ops)的数据
    export function SetData ()                    // 在GameController.ts 的 Calculation方法中调用 TODO 补全data内容
    {
        data =
        {
            "or":GameController.getInstance().data.originalScore,       // 原始得分
            "fi":GameController.getInstance().data.finalScore,          // 最终得分
            "de":                                                       // detail数据  TODO补全
            {                                                           //

            }
        }
    }
    export function GetData() : string          // 在上传ops时调用  此时data已由json格式转换为string格式
    {
        var dataStr : string = JSON.stringify(data);
        console.log(dataStr);
        return dataStr;
    }
}
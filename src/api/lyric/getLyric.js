const request = require("request");
module.exports={
    getLyric:function (req,res,err) {
        let body= JSON.parse(Object.keys(req.body)[0]);//s 数据格式转化
        request({
            url:"https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg",
            qs:{
                // "-":"MusicJsonCallback_lrc",
                // "pcachetime":1578064451036,
                // songmid: body.songMid,
                // g_tk: 5381,
                // loginUin: 3003436226,
                // hostUin: 0,
                // format: "json",
                // inCharset: "utf8",
                // outCharset: "utf-8",
                // notice: 0,
                // platform: "yqq.json",
                // needNewCode: 0
                g_tk: "5381",
                uin: 0,
                format: "json",
                inCharset: "utf-8",
                outCharset: "utf-8",
                songmid: body.songMid,
                notice: 0,
                platform: "h5",
                needNewCode: 1,
                nobase64: 1,
                musicid: 104913384,
                songtype: 0,
                _: 1579847516500,
                jsonpCallback: "jsonp1",
            },
            headers:{
                referer: "https://i.y.qq.com/v8/playsong.html"
            }
        },function (err,response,body) {
            res.send(new Buffer(JSON.parse(body).lyric,'base64').toString() )
        })
    }
}
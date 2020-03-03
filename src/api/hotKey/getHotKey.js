const request = require("request");
const fs = require('fs');
module.exports = {
    getHotKey:function (req,res,err) {
        request({
            url:'https://u.y.qq.com/cgi-bin/musicu.fcg',
            qs:{
                cgiKey: "GetHomePage",
                _: 1580802949280,
                data:`{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
            }

        },function (err,response,body) {

            // fs.writeFile(`${__dirname}/demo.json`,body,
            //     {encoding:"utf8"},
            //     (err)=>{
            //     if( err ) throw err;
            //     console.log("写入成功")
            // })
            let searchKey=[];
            let data = JSON.parse(body);
            //console.log(data.hotkey);
            data.hotkey.data.vec_hotkey.forEach((item)=>{
                searchKey.push({
                    key:item.query,
                    score:item.score
                })
            })
            res.send(searchKey);

        })
    }
}
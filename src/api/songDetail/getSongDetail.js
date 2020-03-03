const  request = require("request");
const {JSDOM} = require("jsdom");
const fs = require('fs');
const {songTable} = require("./songTable")

module.exports={
    getSongDetail:function (req,res,err) {
        request({
            method:"GET",
            url:"https://i.y.qq.com/v8/playsong.html",
            qs:{
                songmid:req.params.mid
            },
            headers:{
                "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Mobile Safari/537.36"
            }
        },function (err,response,body) {
            songTable.find({
                songMid:req.params.mid
            }).then((data)=>{
                // eslint-disable-next-line no-console
                let dom = new JSDOM(body,{runScripts:"dangerously"});
                // eslint-disable-next-line no-console

                let songData=dom.window.songlist[0];
                // let songData=JSON.stringify(dom.window.songlist);
                // fs.writeFile(`${__dirname}/demo1.json`,songData,
                //     {encoding:"utf8"},
                //     (err)=>{
                //         if( err ) throw err;
                //         console.log("写入成功")
                // })
                let finalData={
                    songMid:songData.songmid,
                    m4aUrl:songData.m4aUrl,
                    songName:songData.songname,
                    playTime:songData.playTime,
                    songPic:songData.pic
                };
                // eslint-disable-next-line no-console
                console.log(finalData);
                res.send(finalData);
                songTable.create(
                    finalData
                )
                console.log(Number(data));
                if (Number(data) === 0) {
                    // eslint-disable-next-line no-console
                    console.log("此时数据库中无数据");

                } else {
                    // eslint-disable-next-line no-console
                    console.log("此时数据库中有数据");
                    res.send(data);
                }
            })
        });
        //let body= JSON.parse(Object.keys(req.body)[0]);//s 数据格式转化
    }
}
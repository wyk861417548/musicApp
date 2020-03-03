const request = require('request');
const {JSDOM} = require('jsdom');
//const fs = require('fs');
const {detailTable} = require("./detaillTable.js");

module.exports = {
    recommendDetail:function (req,res) {
        request({
            method:"GET",
            url:"https://y.qq.com/n/m/detail/taoge/index.html",
            //?ADTAG=myqq&from=myqq&channel=10007100&id=7256912512
            qs:{
                ADTAG:"myqq",
                from:"myqq",
                channel:"10007100",
                id:req.params.id         //获取映射到指定路径的参数：id
            }
        },function (err,response,body) {
            let dom =new JSDOM(body,{runScripts: "dangerously"});   //runScripts运行dom里面的script
            let taogeInfo = dom.window.taogeInfo;
            let songlist = dom.window.songList;
            //console.log(songlist);
            //let taogeInfo = JSON.stringify(dom.window.taogeInfo);写入要变成字符串格式
            // fs.writeFile(`${__dirname}/demo5.json`,taogeInfo,
            //     {encoding:"utf8"},
            //     (err)=>{
            //         if( err ) throw err;
            //         console.log("写入成功")
            //     })
            detailTable.find({
                id:req.params.id
            }).then(data=>{
                //  console.log(data);         data是个数组
                if( data.length==0 ){         //如果当前数据库找不到数据就去请求并保存数据库  找到了就直接返回
                    console.log("当前数据库无数据");
                    let finalData = {};
                    finalData.id = taogeInfo.id;   //歌单id
                    finalData.cover = taogeInfo.logo;   //歌单封面
                    finalData.title = taogeInfo.dissname;   //歌单名称
                    finalData.songlist=[];
                    songlist.forEach((item)=>{
                        // console.log(item);
                        // console.log(item.songmid);
                        // console.log(item.songname);
                        // console.log(item.singer);
                        let singer = item.singer;
                        finalData.songlist.push({
                            songMid: item.songmid,
                            songName: item.songname,
                            songAlbum:item.albumname,
                            singer: singer
                            // mid:item.songmid,  //歌曲mid
                            // name:item.songname,  //歌曲名称
                            // singer:singer
                        })
                    });
                    res.send(JSON.stringify(finalData));
                    detailTable.create(finalData);
                }else {
                    res.send(data);
                }
            })
        })
    }
}



















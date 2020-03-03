const  request = require("request");
const {JSDOM} = require("jsdom");
//const fs = require('fs');
const {singerDetailTable} = require("./singerDetailTable");
module.exports={
    getSingerDetailData:function (req,res,err) {
        //let body= JSON.parse(Object.keys(req.body)[0]);//s 数据格式转化
        // eslint-disable-next-line no-console
        request({
            method:"GET",
            url:"https://i.y.qq.com/n2/m/share/details/singer.html",
            qs:{
                ADTAG: "newyqq.singer",
                source: "ydetail",
                singermid: req.params.mid
            }
        },function (err,response,body) {
            // eslint-disable-next-line no-console

            //res.send(body);
            let dom = new JSDOM(body,{runScripts:"dangerously"});
            let firstPageData= dom.window.firstPageData;

            //基本的歌手信息
            //let firstPageData= JSON.stringify(dom.window.firstPageData);要写入文件就要转换
            // fs.writeFile(`${__dirname}/demo1.json`,firstPageData,
            //     {encoding:"utf8"},
            //     (err)=>{
            //         if( err ) throw err;
            //         console.log("写入成功")
            // })

            singerDetailTable.find({
                singer_mid:req.params.mid
            }).then((data)=>{
                // eslint-disable-next-line no-console
                console.log(Number(data));
                if (Number(data) === 0) {
                    // eslint-disable-next-line no-console
                    console.log("此时数据库中无数据");
                    let finalData={};
                    finalData.singer_name=firstPageData.singerData.singer_name;//歌手名称
                    finalData.singer_mid=firstPageData.singerData.singer_mid;//歌手mid
                    finalData.singer_pmid=firstPageData.singerData.singer_pmid;
                    finalData.singer_id=firstPageData.singerData.singer_id;//歌手id
                    finalData.singerDesc=firstPageData.singerData.SingerDesc;//歌手简介
                    finalData.songTotalNumber=firstPageData.singerData.total;//歌手歌曲总数
                    finalData.fansTotalNumber=firstPageData.singerData.fans;//歌手粉丝总数
                    //具体的歌曲信息
                    finalData.songList=[];//预存 歌曲信息列表
                    firstPageData.singerData.list.forEach((item)=>{
                        finalData.songList.push({
                            songName:item.songInfo.name,
                            songMid:item.songInfo.mid,
                            songAlbum:item.songInfo.album.name
                        })
                    })
                    res.send(finalData);
                    singerDetailTable.create(finalData).then(()=>{
                        // eslint-disable-next-line no-console
                        console.log("数据库写入成功");
                    });

                } else {
                    // eslint-disable-next-line no-console
                    console.log("此时数据库中有数据");
                    res.send(data);
                }
            })

        })
    }
};
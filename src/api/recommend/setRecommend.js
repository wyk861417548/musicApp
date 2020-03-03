const request = require('request');
const fs = require('fs');
const {recommendTable} = require('./recommendTable');
request({
    method:"GET",
    url:"https://u.y.qq.com/cgi-bin/musicu.fcg",
    qs:{
        cgiKey: "GetHomePage",
        _: "1579494805528",
        data:`{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
    }
},async (err,res,body)=>{//async
    //console.log(body);
    // fs.writeFile(`${__dirname}/demo.json`,body,
    //     {encoding:"utf8"},
    //     (err)=>{
    //     if( err ) throw err;
    //     console.log("写入成功")
    // })
    await recommendTable.deleteMany({});    //同步  等待全部删除
    let data = JSON.parse(body).MusicHallHomePage.data.v_shelf;  //获取所有的推荐分区信息
    data.forEach((item)=>{
        let category = item.title_template;
        let categoryList = item.v_niche[0].v_card;
        let arr = [];
        categoryList.forEach((list)=>{
            if( list.time ){
                return;
            }else {
                arr.push({
                    id:list.id,
                    title:list.title,
                    cover:list.cover
                })
            }
        });
        if( arr.length!=0 ){
            recommendTable.create({
                category:category,
                categoryList:categoryList
            }).then(()=>{
                console.log("写入成功");
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
})

















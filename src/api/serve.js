const express = require('express');
const bodyParser = require('body-parser');
let app = express();
app.all("*", function (req, res, next) { //解决跨域请求问题
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    });
    if (req.method === "OPTIONS") {
        res.status(200).send("OK")
        // eslint-disable-next-line no-console
        console.log("has option")
    } else {
        next()
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const {getSingerData} = require('./singer/getSingerData.js');
const {getRecommend} = require('./recommend/getRecommend.js');
const {recommendDetail} = require('./recommendDetail/setDetailDate.js');
const {getSingerDetailData} = require('./singerDetails/getSingerDetailData');
const {getSongDetail} = require('./songDetail/getSongDetail.js');
const {getLyric} = require('./lyric/getlyric.js');
const {getRankData} = require('./rank/getRankData.js');
const {getRankDetail} = require('./rankDetail/getRankDetail.js');
const {getHotKey} = require('./hotKey/getHotKey.js');
const {getSearchResult} = require('./search/getSearchData.js');

app.get("/api/getRecommend",getRecommend);
app.get("/api/recommendDetail/:id",recommendDetail);
app.get("/api/getSingerData",getSingerData);
app.get("/api/getSingerDetailData/:mid",getSingerDetailData);
app.get("/api/getSongDetail/:mid",getSongDetail);
app.post("/api/getLyric",getLyric);
app.get("/api/getRankData",getRankData);
app.get("/api/getRankDetail/:id",getRankDetail);
app.get("/api/getHotKey",getHotKey);
app.get("/api/getSearchResult/:id",getSearchResult);
app.listen(9378)









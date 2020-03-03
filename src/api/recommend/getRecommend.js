
const {recommendTable} = require('./recommendTable.js');

module.exports = {
    getRecommend:function (req,res) {
        recommendTable.find({},{           //查询条件与返回内容选项
            __v:false,
            _id:false
        }).then((data)=>{
            res.send(JSON.stringify(data))
        }).catch((err)=>{
            if( err ) throw err;
        })
    }
}














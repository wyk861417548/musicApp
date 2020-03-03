const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/xymusic",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    // eslint-disable-next-line no-console
    console.log("连接成功了recommend")
}).catch(() => {
    // eslint-disable-next-line no-console
    console.log("连接失败")
});;

let recommendSchema =  new Schema({
    category:{
        type:String,
        required:true
    },
    categoryList:[
        {
            id:{
                type:String,
                required:true
            },
            cover:{
                type:String,
                required:true
            },
            title:{
                type:String,
                required:true
            }
        }
    ]
});
let recommendDatas = mongoose.model("recommendDatas",recommendSchema);
module.exports={
    recommendTable:recommendDatas
}
















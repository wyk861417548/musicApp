const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/xymusic", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("连接成功detail")
}).catch(() => {
    console.log("连接失败")
});

let detailShema = new Schema({
    id: {// 方便后期查询数据, 这个id就是这个专区的id        
        type: String,
        required: true
    },
    cover: {// 专区封面图        
        type: String,
        required: true
    },
    title: {// 专区名字, 留意这个        
        type: String,
        required: true
    },
    // tag: [// 专区的类型      
    //     {
    //         id: {
    //             type: Number,
    //             required: true
    //         },
    //         name: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    songlist: [// 此专区下的具体音乐数据      
        {
            songMid: {
                required: true,
                type: String
            },
            songName: {
                required: true,
                type: String
            },
            songAlbum: {
                required: true,
                type: String
            },
            singer:[ //歌手
                {
                    id: { //歌手id               
                        type: String,
                        required: true
                    },
                    mid: {//歌手mid                
                        type: String,
                        required: true
                    },
                    name: {//歌手名称                 
                        type: String,
                        required: true
                    },
                    title: {//歌手名称                
                        type: String,
                        required: true
                    },
                }
            ]
        }
    ]
})

let detailDate = mongoose.model("detailDate", detailShema);
module.exports = { detailTable: detailDate };









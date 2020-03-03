<template>
    <!-- 增加个转场动画 -->
    <transition name="slide">
        <musiclist :title="title" :bgImage="bgImage" :songList="songList"></musiclist>
    </transition>
</template>

<script type="text/ecmascript-6">
    import musiclist from "../music-list/music-list";
    import {mapGetters} from "vuex";
    import axios from "axios";

    export default {
        computed:{    //在singer.vue中,用...mapMutations把歌手的信息得到
            ...mapGetters([//这里得到数据
                "singer"
            ]),
            //下面的数据传给musiclist音乐详情页组件
            title(){//歌手名称
                return this.singer.singer_name;
            },
            bgImage(){ // 歌手图片
                return this.singer.singer_pic;
            },
            mid(){// 歌手mid
                return this.singer.singer_mid;
            }
        },
        data(){
            return {
                songList:[]//具体的歌曲信息
            }
        },
        created() {    // 1
            this._getDetail(this.mid)
        },
        methods:{
            _getDetail(mid){  //2
                let data={
                    mid:mid
                };
                //JSON.stringify(data)
                axios.get(`http://localhost:9378/api/getSingerDetailData/${mid}`,JSON.stringify(data)).then(data=>{
                    // eslint-disable-next-line no-console
                    //console.log(1)
                    console.log(data)
                    this.songList=data.data[0].songList;
                    //console.log(this.songList)
                    //这里获取的是歌手的歌曲详细数据，其中有访问歌曲地址的关键songmid
                })
            }
        },
        components:{
            musiclist
        }

    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
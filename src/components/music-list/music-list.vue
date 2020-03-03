<template>    
    <div class="music-list">        
        <div class="back" @click="goBack">            
            <i class="icon-back"></i>        
        </div>        

        <Scorll :data="songList" class="list">
            <div>
                <h1 class="title">          
                    {{title}}        
                </h1>        
                <div class="bg-image" :style="bgStyle">
                    <div class="play-wrapper" v-show="songList.length>0" >
                        <!-- 设置随机播放选项的按钮, 该按钮在songlist数据传输进来之后再显示出来 -->
                        <div class="play" ref="playBtn"  >
                            <!-- 添加一个引用, 当蒙版移动到顶部的时候, 我们就对这个按钮做一些操作 -->
                            <i class="icon-play"></i>
                            <span class="text">随机播放全部</span>
                        </div>
                    </div>           
                    <div class="filter"></div> <!--模糊层-->      
                </div>  
                <!-- 传入数据, 使得scroll组件知道内容的量    设置该组件的top值-->
                <div class="song-list-wrapper">
                    <songlist v-bind:songs="songList" v-bind:singername="title" @select="selectItem"></songlist>
                </div>
                <div class="loading-container" v-show="!songList.length">
                    <loading></loading>
                </div>
            </div>
        </Scorll> 
    </div>
</template>

<script>    
    import songlist from "../base/song-list.vue"
    import Scorll from "../base/scroll.vue"
    import loading from "../base/loading.vue"
    import {mapActions} from "vuex";
    export default {        
        props: { //接受从singer-detail.vue组件传进来的数据            
             bgImage:{// 歌手图片                
                  type:String          
             },            
            songList:{         //歌手的歌曲详细数据列表     
                 type: Array          
            },            
            title:{                
                 type:String          
             }
        },        
        computed:{            
            bgStyle(){                
                return `background-image:url(${this.bgImage})`;          
                },      
        },        
        methods:{            
            goBack(){// 点击回到上级路由                
                 this.$router.go(-1);          
            },
            selectItem(item,index){
                //设置playlist,playing,fullscreen, playMode, currentIndex等值
                //这种复杂的值设置,我们可以专门设置一个actions来处理
                // eslint-disable-next-line no-console
                console.log(item,index)
                this.selectPlay({
                    list:this.songList,//传入当前数据的歌曲列表
                    index:index,//当前歌曲索引
                })
            },
            ...mapActions([
                "selectPlay"
            ])     
        },
        components:{
            songlist,
            Scorll,
            loading
        } 
    };
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"

    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background

        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50

            .icon-back
                display: block
                padding: 10px
                font-size: $font-size-large-x
                color: $color-theme

        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            font-size: $font-size-large
            color: $color-text

        .bg-image
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            transform-origin: top
            background-size: cover

            .play-wrapper
                position: absolute
                bottom: 20px
                z-index: 50
                width: 100%

                .play
                    box-sizing: border-box
                    width: 135px
                    padding: 7px 0
                    margin: 0 auto
                    text-align: center
                    border: 1px solid $color-theme
                    color: $color-theme
                    border-radius: 100px
                    font-size: 0

                    .icon-play
                        display: inline-block
                        vertical-align: middle
                        margin-right: 6px
                        font-size: $font-size-medium-x

                    .text
                        display: inline-block
                        vertical-align: middle
                        font-size: $font-size-small

            .filter
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background: rgba(7, 17, 27, 0.4)

        .bg-layer
            position: relative
            height: 100%
            background: $color-background

        .list
            position: fixed
            top: 0
            bottom: 0
            width: 100%
            background: $color-background

            .song-list-wrapper
                padding: 20px 30px

            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
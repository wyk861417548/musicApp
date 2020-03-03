<template>
    <div class="loading">
        <img width="40" height="40" src="../../common/images/2.webp">
        <p class="desc">{{title}}</p>
    </div>
</template>
<script >
    export default {
        //支持传入自定义的文案
        props: {
            title: {
                type: String,
                default: '朕知道了...'
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"

    .loading
        width: 100%
        text-align: center
        .desc
            line-height: 20px
            font-size: $font-size-small
            color: $color-text-l
</style>

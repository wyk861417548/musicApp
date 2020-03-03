//import (引入) * (所有export属性) as (到) types (types变量) from (从) /mutations-type
import * as types from "./mutations-type";// 这样后期就可以通过对象属性的方式访问, 简单明了
const mutations = {
    [types.SET_SINGER](state, singer) {    //歌手列表信息
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {   //得到具体的某首歌
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.playMode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_DISC](state,disc){
        state.disc=disc;
    },
    [types.SET_TOPLIST](state,toplist){
        state.topList = toplist;
    }
};
export default mutations;















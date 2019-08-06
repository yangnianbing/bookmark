import Vue from 'vue';
import Vuex from 'vuex';
import LeftMenu from './modules/LeftMenu.js';
import Header from './modules/Header'
import RecordList from './modules/RecordList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        LeftMenu,
        Header,
        RecordList
    }
})
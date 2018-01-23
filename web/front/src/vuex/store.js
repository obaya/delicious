import Vue from 'vue'
import Vuex from 'vuex'

// 引入需要用到vuex的文件
import y_myorder from '../components/y_myorder/y_myorder.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        y_myorder,
    }
})
export default store

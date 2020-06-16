import Vue from 'vue'
import App from './App'

import askList from "components/askList.vue";
Vue.component('askList', askList);

import anList from "components/anList.vue";
Vue.component('anList', anList);

import wechat from './common/wechat.js'
if(wechat.isWechat()){
    Vue.prototype.$wechat =wechat;
}

import anListb from "components/anListb.vue";
Vue.component('anListb', anListb);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

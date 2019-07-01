import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Util from './libs/util';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './styles/common.css';

import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上

import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(iView);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './libs/http.request'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import YanProgress from 'yan-progress';
import { left2RightDrag, bottom2TopDrag, right2LeftDrag } from "./common/js/directive";
// import JsonSchemaEditor from './components/common/json-schema/schema/index';
import mavonEditor from 'mavon-editor'
import CKEditor from '@ckeditor/ckeditor5-vue';

// import 'vue-testcase-minder-editor/lib/VueTestcaseMinderEditor.css'
// import VueTestcaseMinderEditor from 'vue-testcase-minder-editor'

import vueMinderEditor from 'vue-minder-editor-plus-qjie'

import 'testcase-factor-minder-editor/lib/VueTestcaseMinderEditor.css'
import VueTestcaseMinderEditor from 'testcase-factor-minder-editor'

Vue.use(VueTestcaseMinderEditor)

Vue.use(vueMinderEditor)

Vue.use(ElementUI)

Vue.use(YanProgress);
Vue.use(mavonEditor)
// Vue.use(JsonSchemaEditor)
Vue.use(CKEditor);

Vue.config.productionTip = false
Vue.prototype.$axios = http

//支持左右拖拽
Vue.directive('left-to-right-drag', left2RightDrag);
Vue.directive('right-to-left-drag', right2LeftDrag);
Vue.directive('bottom-to-top-drag', bottom2TopDrag);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

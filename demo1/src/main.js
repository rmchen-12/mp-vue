import Vue from "vue";
import App from "./App";
import * as filters from "./filters";
import icon from "@/components/Icon/index.vue";
// import mpvueToastRegistry from 'mptoast'

// mpvueToastRegistry(Vue)

Vue.component("icons", icon);

Object.keys(filters).forEach(key => {
  Vue.use(filters[key]);
});

Vue.use(filters);

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ["^pages/index/main", "pages/user/main", "pages/article/main"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "cnode社区",
      navigationBarTextStyle: "black"
    }
  }
};

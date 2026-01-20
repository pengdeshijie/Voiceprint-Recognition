"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const count = common_vendor.ref(0);
    const isLogin = common_vendor.ref(false);
    const username = common_vendor.ref("");
    const bannerList = common_vendor.ref([
      { url: "/static/b1.jpg", title: "我的观测相册 1" },
      { url: "/static/b2.jpg", title: "我的观测相册 2" },
      { url: "/static/b3.jpg", title: "我的观测相册 3" },
      { url: "/static/b4.jpg", title: "我的观测相册 4" },
      { url: "/static/b5.jpg", title: "我的观测相册 5" }
    ]);
    common_vendor.onShow(() => {
      const user = common_vendor.index.getStorageSync("current_user");
      if (user) {
        isLogin.value = true;
        username.value = user.username;
        const userKey = "data_" + user.username;
        const data = common_vendor.index.getStorageSync(userKey) || [];
        count.value = data.length;
      } else {
        isLogin.value = false;
        username.value = "游客";
        count.value = 0;
      }
    });
    const checkLogin = (callback) => {
      if (!isLogin.value) {
        common_vendor.index.showToast({ title: "请先登录", icon: "none" });
        setTimeout(() => common_vendor.index.navigateTo({ url: "/pages/login/login" }), 500);
      } else {
        callback();
      }
    };
    const goStore = () => common_vendor.index.switchTab({ url: "/pages/store/store" });
    const goMap = () => common_vendor.index.switchTab({ url: "/pages/map/map" });
    const goEdit = () => checkLogin(() => common_vendor.index.navigateTo({ url: "/pages/edit/edit" }));
    const goVoice = () => checkLogin(() => common_vendor.index.navigateTo({ url: "/pages/voice/voice" }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(isLogin.value ? username.value : "游客"),
        b: common_assets._imports_0,
        c: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.title),
            c: index
          };
        }),
        d: common_vendor.t(isLogin.value ? "我的记录" : "请先登录"),
        e: common_vendor.t(count.value),
        f: common_vendor.o(goStore),
        g: common_vendor.o(goMap),
        h: common_vendor.o(goEdit),
        i: common_vendor.o(goVoice),
        j: common_vendor.o(goEdit)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map

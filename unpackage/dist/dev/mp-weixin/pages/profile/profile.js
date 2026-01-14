"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const isLogin = common_vendor.ref(false);
    const userInfo = common_vendor.ref({});
    common_vendor.onShow(() => {
      const user = common_vendor.index.getStorageSync("current_user");
      if (user) {
        isLogin.value = true;
        userInfo.value = user;
      } else {
        isLogin.value = false;
        userInfo.value = {};
      }
    });
    const checkLogin = () => {
      if (!isLogin.value) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
      }
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("current_user");
            isLogin.value = false;
            userInfo.value = {};
            common_vendor.index.showToast({ title: "已退出", icon: "none" });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLogin.value ? "/static/logo.png" : "/static/logo.png",
        b: common_vendor.t(isLogin.value ? userInfo.value.username : "点击登录/注册"),
        c: common_vendor.o(checkLogin),
        d: isLogin.value
      }, isLogin.value ? {
        e: common_vendor.o(handleLogout)
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map

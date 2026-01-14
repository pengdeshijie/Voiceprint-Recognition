"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const handleLogin = () => {
      if (!username.value || !password.value)
        return;
      const users = common_vendor.index.getStorageSync("all_users") || [];
      const user = users.find((u) => u.username === username.value && u.password === password.value);
      if (user) {
        common_vendor.index.setStorageSync("current_user", user);
        common_vendor.index.showToast({ title: "登录成功", icon: "success" });
        setTimeout(() => {
          common_vendor.index.switchTab({ url: "/pages/profile/profile" });
        }, 500);
      } else {
        common_vendor.index.showToast({ title: "账号或密码错误", icon: "none" });
      }
    };
    const goRegister = () => {
      common_vendor.index.navigateTo({ url: "/pages/register/register" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: username.value,
        c: common_vendor.o(($event) => username.value = $event.detail.value),
        d: password.value,
        e: common_vendor.o(($event) => password.value = $event.detail.value),
        f: common_vendor.o(handleLogin),
        g: common_vendor.o(goRegister)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map

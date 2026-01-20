"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const form = common_vendor.ref({
      username: "",
      password: "",
      confirmPassword: ""
    });
    const handleRegister = () => {
      if (!form.value.username || !form.value.password) {
        return common_vendor.index.showToast({ title: "账号密码不能为空", icon: "none" });
      }
      if (form.value.password !== form.value.confirmPassword) {
        return common_vendor.index.showToast({ title: "两次密码不一致", icon: "none" });
      }
      const users = common_vendor.index.getStorageSync("all_users") || [];
      const exists = users.find((u) => u.username === form.value.username);
      if (exists) {
        return common_vendor.index.showToast({ title: "用户名已存在", icon: "none" });
      }
      users.push({
        username: form.value.username,
        password: form.value.password,
        // 实际开发中密码必须加密，这里仅演示
        nickname: "新用户" + Math.floor(Math.random() * 1e3)
        // 随机昵称
      });
      common_vendor.index.setStorageSync("all_users", users);
      common_vendor.index.showToast({ title: "注册成功" });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1e3);
    };
    const goLogin = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: form.value.username,
        b: common_vendor.o(($event) => form.value.username = $event.detail.value),
        c: form.value.password,
        d: common_vendor.o(($event) => form.value.password = $event.detail.value),
        e: form.value.confirmPassword,
        f: common_vendor.o(($event) => form.value.confirmPassword = $event.detail.value),
        g: common_vendor.o(handleRegister),
        h: common_vendor.o(goLogin)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map

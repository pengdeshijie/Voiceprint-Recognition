"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "store",
  setup(__props) {
    const list = common_vendor.ref([]);
    const isLogin = common_vendor.ref(false);
    const nickname = common_vendor.ref("游客");
    const currentUser = common_vendor.ref(null);
    common_vendor.onShow(() => {
      refreshData();
    });
    const refreshData = () => {
      const user = common_vendor.index.getStorageSync("current_user");
      if (user && user.username) {
        isLogin.value = true;
        currentUser.value = user;
        nickname.value = user.nickname || user.username;
        const userKey = "data_" + user.username;
        const storageData = common_vendor.index.getStorageSync(userKey);
        list.value = storageData || [];
        common_vendor.index.__f__("log", "at pages/store/store.vue:84", "仓库页已刷新，当前读取:", userKey, "长度:", list.value.length);
      } else {
        isLogin.value = false;
        nickname.value = "游客";
        list.value = [];
      }
    };
    const goLogin = () => common_vendor.index.navigateTo({ url: "/pages/login/login" });
    const goAdd = () => common_vendor.index.navigateTo({ url: "/pages/edit/edit" });
    const goEdit = (item) => common_vendor.index.navigateTo({ url: `/pages/edit/edit?id=${item.id}` });
    const deleteItem = (index) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这条记录吗？",
        success: function(res) {
          if (res.confirm) {
            list.value.splice(index, 1);
            const userKey = "data_" + currentUser.value.username;
            common_vendor.index.setStorageSync(userKey, list.value);
            common_vendor.index.showToast({ title: "已移除", icon: "none" });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(nickname.value),
        b: !isLogin.value
      }, !isLogin.value ? {
        c: common_vendor.o(goLogin)
      } : list.value.length === 0 ? {
        e: common_assets._imports_0
      } : {
        f: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: item.image ? item.image : "/static/logo.png",
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.content),
            d: common_vendor.t(item.time),
            e: common_vendor.o(($event) => deleteItem(index), item.id),
            f: item.id,
            g: common_vendor.o(($event) => goEdit(item), item.id)
          };
        })
      }, {
        d: list.value.length === 0,
        g: isLogin.value
      }, isLogin.value ? {
        h: common_vendor.o(goAdd)
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/store/store.js.map

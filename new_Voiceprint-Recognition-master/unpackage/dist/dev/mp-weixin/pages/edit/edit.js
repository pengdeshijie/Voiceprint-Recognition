"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const formData = common_vendor.ref({ id: null, title: "", content: "", time: "", image: "" });
    common_vendor.onLoad((options) => {
      const user = common_vendor.index.getStorageSync("current_user");
      if (!user) {
        common_vendor.index.showToast({ title: "未登录", icon: "none" });
        return;
      }
      if (options.id) {
        const userKey = "data_" + user.username;
        const allList = common_vendor.index.getStorageSync(userKey) || [];
        const target = allList.find((item) => item.id == options.id);
        if (target) {
          formData.value = { ...target };
        }
      }
    });
    const handleChooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          formData.value.image = res.tempFilePaths[0];
        }
      });
    };
    const removeImage = () => {
      formData.value.image = "";
    };
    const saveData = () => {
      if (!formData.value.title)
        return common_vendor.index.showToast({ title: "标题不能为空", icon: "none" });
      const user = common_vendor.index.getStorageSync("current_user");
      if (!user || !user.username) {
        return common_vendor.index.showToast({ title: "登录失效，请重新登录", icon: "none" });
      }
      const userKey = "data_" + user.username;
      let allList = common_vendor.index.getStorageSync(userKey) || [];
      const dataItem = {
        title: formData.value.title,
        content: formData.value.content,
        image: formData.value.image || "",
        time: (/* @__PURE__ */ new Date()).toLocaleString()
      };
      if (formData.value.id) {
        const index = allList.findIndex((item) => item.id == formData.value.id);
        if (index !== -1)
          allList[index] = { ...allList[index], ...dataItem };
      } else {
        allList.push({ id: Date.now(), ...dataItem });
      }
      common_vendor.index.setStorageSync(userKey, allList);
      common_vendor.index.showModal({
        title: "保存成功",
        content: `数据已存入箱子: [${userKey}]
当前箱子里有 ${allList.length} 条数据`,
        showCancel: false,
        success: () => {
          common_vendor.index.navigateBack();
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: formData.value.image
      }, formData.value.image ? {
        b: formData.value.image,
        c: common_vendor.o(removeImage)
      } : {}, {
        d: common_vendor.o(handleChooseImage),
        e: formData.value.title,
        f: common_vendor.o(($event) => formData.value.title = $event.detail.value),
        g: formData.value.content,
        h: common_vendor.o(($event) => formData.value.content = $event.detail.value),
        i: common_vendor.o(saveData)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/edit/edit.js.map

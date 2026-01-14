"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "voice",
  setup(__props) {
    const content = common_vendor.ref("");
    const statusText = common_vendor.ref("准备就绪");
    const isRecording = common_vendor.ref(false);
    const startRecord = () => {
      isRecording.value = true;
      statusText.value = "正在聆听...";
      if (typeof plus === "undefined") {
        common_vendor.index.showToast({ title: "浏览器已模拟录音", icon: "none" });
        return;
      }
      plus.speech.startRecognize(
        { engine: "iFly", lang: "zh-cn", continue: true, timeout: 1e4 },
        function(s) {
          content.value += s;
        },
        function(e) {
          statusText.value = "识别失败";
          isRecording.value = false;
        }
      );
    };
    const stopRecord = () => {
      if (!isRecording.value)
        return;
      isRecording.value = false;
      statusText.value = "识别结束";
      if (typeof plus === "undefined") {
        content.value += "【模拟】语音转文字测试内容。";
        return;
      }
      plus.speech.stopRecognize();
    };
    const saveToStore = () => {
      if (!content.value)
        return;
      const user = common_vendor.index.getStorageSync("current_user");
      if (!user) {
        common_vendor.index.showToast({ title: "请先登录", icon: "none" });
        return;
      }
      const userKey = "data_" + user.username;
      const allList = common_vendor.index.getStorageSync(userKey) || [];
      allList.push({
        id: Date.now(),
        title: "语音笔记 " + (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }),
        content: content.value,
        image: "",
        time: (/* @__PURE__ */ new Date()).toLocaleString()
      });
      common_vendor.index.setStorageSync(userKey, allList);
      common_vendor.index.showToast({ title: "已保存", icon: "success" });
      setTimeout(() => {
        content.value = "";
        common_vendor.index.navigateBack();
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(statusText.value),
        b: content.value,
        c: common_vendor.o(($event) => content.value = $event.detail.value),
        d: isRecording.value ? 1 : "",
        e: common_vendor.o(startRecord),
        f: common_vendor.o(stopRecord),
        g: common_vendor.o(startRecord),
        h: common_vendor.o(stopRecord),
        i: common_vendor.o(saveToStore),
        j: !content.value
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/voice/voice.js.map

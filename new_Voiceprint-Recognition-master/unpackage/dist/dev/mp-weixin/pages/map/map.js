"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "map",
  setup(__props) {
    const latitude = common_vendor.ref(39.909);
    const longitude = common_vendor.ref(116.397);
    const markers = common_vendor.ref([
      {
        id: 1,
        latitude: 39.909,
        longitude: 116.397,
        title: "中央观鸟区",
        iconPath: "/static/logo.png",
        // 如果有专门的地图钉图标更好
        width: 30,
        height: 30
      },
      {
        id: 2,
        latitude: 39.92,
        longitude: 116.42,
        title: "湿地保护区",
        iconPath: "/static/logo.png",
        width: 30,
        height: 30
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: latitude.value,
        b: longitude.value,
        c: markers.value
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/map/map.js.map

if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createLifeCycleHook(
    ON_SHOW,
    1 | 2
    /* HookFlags.PAGE */
  );
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const _imports_0 = "/static/logo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$9 = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const count = vue.ref(0);
      const isLogin = vue.ref(false);
      const username = vue.ref("");
      const bannerList = vue.ref([
        { url: "/static/b1.jpg", title: "我的观测相册 1" },
        { url: "/static/b2.jpg", title: "我的观测相册 2" },
        { url: "/static/b3.jpg", title: "我的观测相册 3" },
        { url: "/static/b4.jpg", title: "我的观测相册 4" },
        { url: "/static/b5.jpg", title: "我的观测相册 5" }
      ]);
      onShow(() => {
        const user = uni.getStorageSync("current_user");
        if (user) {
          isLogin.value = true;
          username.value = user.username;
          const userKey = "data_" + user.username;
          const data = uni.getStorageSync(userKey) || [];
          count.value = data.length;
        } else {
          isLogin.value = false;
          username.value = "游客";
          count.value = 0;
        }
      });
      const checkLogin = (callback) => {
        if (!isLogin.value) {
          uni.showToast({ title: "请先登录", icon: "none" });
          setTimeout(() => uni.navigateTo({ url: "/pages/login/login" }), 500);
        } else {
          callback();
        }
      };
      const goStore = () => uni.switchTab({ url: "/pages/store/store" });
      const goMap = () => uni.switchTab({ url: "/pages/map/map" });
      const goEdit = () => checkLogin(() => uni.navigateTo({ url: "/pages/edit/edit" }));
      const goVoice = () => checkLogin(() => uni.navigateTo({ url: "/pages/voice/voice" }));
      const goScan = () => checkLogin(() => uni.navigateTo({ url: "/pages/scan/scan" }));
      const __returned__ = { count, isLogin, username, bannerList, checkLogin, goStore, goMap, goEdit, goVoice, goScan, ref: vue.ref, get onShow() {
        return onShow;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "home-container" }, [
      vue.createElementVNode("view", { class: "top-header" }, [
        vue.createElementVNode("view", { class: "greeting" }, [
          vue.createElementVNode(
            "text",
            { class: "h1" },
            "你好，" + vue.toDisplayString($setup.isLogin ? $setup.username : "游客"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "h2" }, "今天想去哪里观测？")
        ]),
        vue.createElementVNode("image", {
          class: "avatar-small",
          src: _imports_0,
          mode: "aspectFill"
        })
      ]),
      vue.createElementVNode("view", { class: "swiper-box" }, [
        vue.createElementVNode("swiper", {
          class: "card-swiper",
          circular: "",
          autoplay: "",
          interval: "4000",
          duration: "500",
          "indicator-dots": "",
          "indicator-active-color": "#ffffff",
          "indicator-color": "rgba(255,255,255,0.5)"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.bannerList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                key: index,
                class: "swiper-item"
              }, [
                vue.createElementVNode("view", { class: "swiper-content" }, [
                  vue.createElementVNode("image", {
                    class: "swiper-img",
                    src: item.url,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "img-mask" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "img-text" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "stats-section" }, [
        vue.createElementVNode("view", { class: "stat-card" }, [
          vue.createElementVNode("view", { class: "stat-left" }, [
            vue.createElementVNode(
              "text",
              { class: "stat-label" },
              vue.toDisplayString($setup.isLogin ? "我的记录" : "请先登录"),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              { class: "stat-num" },
              vue.toDisplayString($setup.count),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "stat-right" }, [
            vue.createElementVNode("view", { class: "circle-icon" }, "🕊️")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "section-title" }, "快捷功能"),
      vue.createElementVNode("view", { class: "grid-menu" }, [
        vue.createElementVNode("view", {
          class: "grid-item",
          onClick: $setup.goStore
        }, [
          vue.createElementVNode("view", { class: "icon-box blue-bg" }, "📦"),
          vue.createElementVNode("text", null, "管理库存")
        ]),
        vue.createElementVNode("view", {
          class: "grid-item",
          onClick: $setup.goMap
        }, [
          vue.createElementVNode("view", { class: "icon-box green-bg" }, "🗺️"),
          vue.createElementVNode("text", null, "查看地图")
        ]),
        vue.createElementVNode("view", {
          class: "grid-item",
          onClick: $setup.goEdit
        }, [
          vue.createElementVNode("view", { class: "icon-box orange-bg" }, "✏️"),
          vue.createElementVNode("text", null, "快速记录")
        ]),
        vue.createElementVNode("view", {
          class: "grid-item",
          onClick: $setup.goVoice
        }, [
          vue.createElementVNode("view", { class: "icon-box purple-bg" }, "🎙️"),
          vue.createElementVNode("text", null, "语音记事")
        ]),
        vue.createElementVNode("view", {
          class: "grid-item",
          onClick: $setup.goScan
        }, [
          vue.createElementVNode("view", { class: "icon-box red-bg" }, "📷"),
          vue.createElementVNode("text", null, "拍照识别")
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/index/index.vue"]]);
  const _sfc_main$8 = {
    __name: "store",
    setup(__props, { expose: __expose }) {
      __expose();
      const list = vue.ref([]);
      const isLogin = vue.ref(false);
      const nickname = vue.ref("游客");
      const currentUser = vue.ref(null);
      onShow(() => {
        refreshData();
      });
      const refreshData = () => {
        const user = uni.getStorageSync("current_user");
        if (user && user.username) {
          isLogin.value = true;
          currentUser.value = user;
          nickname.value = user.nickname || user.username;
          const userKey = "data_" + user.username;
          const storageData = uni.getStorageSync(userKey);
          list.value = storageData || [];
          formatAppLog("log", "at pages/store/store.vue:84", "仓库页已刷新，当前读取:", userKey, "长度:", list.value.length);
        } else {
          isLogin.value = false;
          nickname.value = "游客";
          list.value = [];
        }
      };
      const goLogin = () => uni.navigateTo({ url: "/pages/login/login" });
      const goAdd = () => uni.navigateTo({ url: "/pages/edit/edit" });
      const goEdit = (item) => uni.navigateTo({ url: `/pages/edit/edit?id=${item.id}` });
      const deleteItem = (index) => {
        uni.showModal({
          title: "提示",
          content: "确定要删除这条记录吗？",
          success: function(res) {
            if (res.confirm) {
              list.value.splice(index, 1);
              const userKey = "data_" + currentUser.value.username;
              uni.setStorageSync(userKey, list.value);
              uni.showToast({ title: "已移除", icon: "none" });
            }
          }
        });
      };
      const __returned__ = { list, isLogin, nickname, currentUser, refreshData, goLogin, goAdd, goEdit, deleteItem, ref: vue.ref, get onShow() {
        return onShow;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode(
        "view",
        { class: "header-title" },
        "📦 " + vue.toDisplayString($setup.nickname) + "的仓库",
        1
        /* TEXT */
      ),
      !$setup.isLogin ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty-tip"
      }, [
        vue.createElementVNode("text", null, "请先登录后查看数据"),
        vue.createElementVNode("button", {
          size: "mini",
          type: "primary",
          style: { "margin-top": "20px" },
          onClick: $setup.goLogin
        }, "去登录")
      ])) : $setup.list.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty-tip"
      }, [
        vue.createElementVNode("image", {
          src: _imports_0,
          style: { "width": "50px", "height": "50px", "opacity": "0.5", "margin-bottom": "10px" }
        }),
        vue.createElementVNode("view", null, "暂无记录，快去添加吧~")
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "list-box"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.list, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: item.id,
              class: "card",
              onClick: ($event) => $setup.goEdit(item)
            }, [
              vue.createElementVNode("image", {
                class: "card-img",
                src: item.image ? item.image : "/static/logo.png",
                mode: "aspectFill"
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "card-content" }, [
                vue.createElementVNode("view", { class: "card-top" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "card-title" },
                    vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "card-desc" },
                  vue.toDisplayString(item.content),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "card-time" },
                  vue.toDisplayString(item.time),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "delete-btn",
                onClick: vue.withModifiers(($event) => $setup.deleteItem(index), ["stop"])
              }, [
                vue.createElementVNode("text", null, "🗑️")
              ], 8, ["onClick"])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])),
      $setup.isLogin ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "add-btn",
        onClick: $setup.goAdd
      }, [
        vue.createElementVNode("text", null, "+")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesStoreStore = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/store/store.vue"]]);
  const _sfc_main$7 = {
    __name: "map",
    setup(__props, { expose: __expose }) {
      __expose();
      const latitude = vue.ref(39.909);
      const longitude = vue.ref(116.397);
      const markers = vue.ref([
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
      const __returned__ = { latitude, longitude, markers, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("map", {
        class: "map-container",
        latitude: $setup.latitude,
        longitude: $setup.longitude,
        markers: $setup.markers,
        scale: 12,
        "show-location": "",
        "enable-traffic": ""
      }, null, 8, ["latitude", "longitude", "markers"])
    ]);
  }
  const PagesMapMap = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/map/map.vue"]]);
  const _sfc_main$6 = {
    __name: "profile",
    setup(__props, { expose: __expose }) {
      __expose();
      const isLogin = vue.ref(false);
      const userInfo = vue.ref({});
      onShow(() => {
        const user = uni.getStorageSync("current_user");
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
          uni.navigateTo({ url: "/pages/login/login" });
        }
      };
      const handleLogout = () => {
        uni.showModal({
          title: "提示",
          content: "确定要退出吗？",
          success: (res) => {
            if (res.confirm) {
              uni.removeStorageSync("current_user");
              isLogin.value = false;
              userInfo.value = {};
              uni.showToast({ title: "已退出", icon: "none" });
            }
          }
        });
      };
      const __returned__ = { isLogin, userInfo, checkLogin, handleLogout, ref: vue.ref, get onShow() {
        return onShow;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "center-container" }, [
      vue.createElementVNode("view", {
        class: "header",
        onClick: $setup.checkLogin
      }, [
        vue.createElementVNode("image", {
          class: "avatar",
          src: $setup.isLogin ? "/static/logo.png" : "/static/logo.png"
        }, null, 8, ["src"]),
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode(
            "text",
            { class: "main-id" },
            vue.toDisplayString($setup.isLogin ? $setup.userInfo.username : "点击登录/注册"),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "menu-list" }, [
        vue.createElementVNode("view", { class: "menu-item" }, [
          vue.createElementVNode("text", null, "我的收藏"),
          vue.createElementVNode("text", { class: "arrow" }, ">")
        ]),
        vue.createElementVNode("view", { class: "menu-item" }, [
          vue.createElementVNode("text", null, "设置"),
          vue.createElementVNode("text", { class: "arrow" }, ">")
        ]),
        $setup.isLogin ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "menu-item",
          onClick: $setup.handleLogout
        }, [
          vue.createElementVNode("text", { style: { "color": "red" } }, "退出登录"),
          vue.createElementVNode("text", { class: "arrow" }, ">")
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesProfileProfile = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/profile/profile.vue"]]);
  const _sfc_main$5 = {
    __name: "edit",
    setup(__props, { expose: __expose }) {
      __expose();
      const formData = vue.ref({ id: null, title: "", content: "", time: "", image: "" });
      onLoad((options) => {
        const user = uni.getStorageSync("current_user");
        if (!user) {
          uni.showToast({ title: "未登录", icon: "none" });
          return;
        }
        if (options.id) {
          const userKey = "data_" + user.username;
          const allList = uni.getStorageSync(userKey) || [];
          const target = allList.find((item) => item.id == options.id);
          if (target) {
            formData.value = { ...target };
          }
        }
      });
      const handleChooseImage = () => {
        uni.chooseImage({
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
          return uni.showToast({ title: "标题不能为空", icon: "none" });
        const user = uni.getStorageSync("current_user");
        if (!user || !user.username) {
          return uni.showToast({ title: "登录失效，请重新登录", icon: "none" });
        }
        const userKey = "data_" + user.username;
        let allList = uni.getStorageSync(userKey) || [];
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
        uni.setStorageSync(userKey, allList);
        uni.showModal({
          title: "保存成功",
          content: `数据已存入箱子: [${userKey}]
当前箱子里有 ${allList.length} 条数据`,
          showCancel: false,
          success: () => {
            uni.navigateBack();
          }
        });
      };
      const __returned__ = { formData, handleChooseImage, removeImage, saveData, ref: vue.ref, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "form-item" }, [
        vue.createElementVNode("text", { class: "label" }, "添加图片"),
        vue.createElementVNode("view", {
          class: "upload-box",
          onClick: $setup.handleChooseImage
        }, [
          $setup.formData.image ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "preview-box"
          }, [
            vue.createElementVNode("image", {
              src: $setup.formData.image,
              mode: "aspectFill",
              class: "preview-img"
            }, null, 8, ["src"]),
            vue.createElementVNode("view", {
              class: "delete-icon",
              onClick: vue.withModifiers($setup.removeImage, ["stop"])
            }, "×")
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "add-icon"
          }, [
            vue.createElementVNode("text", { class: "plus" }, "+"),
            vue.createElementVNode("text", { class: "tip" }, "点击上传")
          ]))
        ])
      ]),
      vue.createElementVNode("view", { class: "form-item" }, [
        vue.createElementVNode("text", { class: "label" }, "标题"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.formData.title = $event),
            placeholder: "请输入标题"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.formData.title]
        ])
      ]),
      vue.createElementVNode("view", { class: "form-item" }, [
        vue.createElementVNode("text", { class: "label" }, "详情备注"),
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            class: "textarea",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.formData.content = $event),
            placeholder: "请输入详细内容"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.formData.content]
        ])
      ]),
      vue.createElementVNode("button", {
        type: "primary",
        class: "save-btn",
        onClick: $setup.saveData
      }, "保存记录")
    ]);
  }
  const PagesEditEdit = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/edit/edit.vue"]]);
  const _sfc_main$4 = {
    __name: "voice",
    setup(__props, { expose: __expose }) {
      __expose();
      const content = vue.ref("");
      const statusText = vue.ref("准备就绪");
      const isRecording = vue.ref(false);
      const startRecord = () => {
        isRecording.value = true;
        statusText.value = "正在聆听...";
        if (typeof plus === "undefined") {
          uni.showToast({ title: "浏览器已模拟录音", icon: "none" });
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
        const user = uni.getStorageSync("current_user");
        if (!user) {
          uni.showToast({ title: "请先登录", icon: "none" });
          return;
        }
        const userKey = "data_" + user.username;
        const allList = uni.getStorageSync(userKey) || [];
        allList.push({
          id: Date.now(),
          title: "语音笔记 " + (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }),
          content: content.value,
          image: "",
          time: (/* @__PURE__ */ new Date()).toLocaleString()
        });
        uni.setStorageSync(userKey, allList);
        uni.showToast({ title: "已保存", icon: "success" });
        setTimeout(() => {
          content.value = "";
          uni.navigateBack();
        }, 1e3);
      };
      const __returned__ = { content, statusText, isRecording, startRecord, stopRecord, saveToStore, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "status-bar" }, [
        vue.createElementVNode(
          "text",
          { class: "status-text" },
          vue.toDisplayString($setup.statusText),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "result-box" }, [
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            class: "result-area",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.content = $event),
            placeholder: "长按下方按钮说话...",
            maxlength: "-1"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.content]
        ])
      ]),
      vue.createElementVNode("view", { class: "btn-group" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["mic-btn", { "recording": $setup.isRecording }]),
            onTouchstart: $setup.startRecord,
            onTouchend: $setup.stopRecord,
            onMousedown: $setup.startRecord,
            onMouseup: $setup.stopRecord
          },
          [
            vue.createElementVNode("text", { class: "mic-icon" }, "🎙️")
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ),
        vue.createElementVNode("text", { class: "tip" }, "长按说话"),
        vue.createElementVNode("button", {
          class: "save-btn",
          type: "primary",
          onClick: $setup.saveToStore,
          disabled: !$setup.content
        }, "保存到仓库", 8, ["disabled"])
      ])
    ]);
  }
  const PagesVoiceVoice = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/voice/voice.vue"]]);
  const _sfc_main$3 = {
    __name: "scan",
    setup(__props, { expose: __expose }) {
      __expose();
      const imageUrl = vue.ref("");
      const isScanning = vue.ref(false);
      const result = vue.ref({ name: "", desc: "", score: 0 });
      const mockBirdDB = [
        { name: "麻雀", desc: "小型鸟类，性格活泼，常见于人类居住区，叫声喳喳。" },
        { name: "喜鹊", desc: "体型较大，羽毛黑白相间，适应能力强，象征吉祥。" },
        { name: "翠鸟", desc: "羽毛翠蓝发亮，主要以鱼虾为食，飞行速度极快。" },
        { name: "白鹭", desc: "全身白色，颈长腿长，常见于水边，姿态优雅。" },
        { name: "红腹锦鸡", desc: "色彩艳丽，中国特有鸟种，被誉为鸟中凤凰。" },
        { name: "苍鹭", desc: "大型水鸟，头顶有黑色长羽冠，常伫立水中捕食。" }
      ];
      const handleChooseImage = () => {
        return new Promise((resolve, reject) => {
          uni.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: ["camera", "album"],
            success: (res) => {
              uni.getFileSystemManager().readFile({
                filePath: res.tempFilePaths[0],
                encoding: "base64",
                success: (r) => resolve("data:image/jpeg;base64," + r.data),
                fail: reject
              });
            }
          });
        });
      };
      const handleScan = async () => {
        if (isScanning.value)
          return;
        result.value = { name: "", desc: "", score: 0 };
        try {
          const base64Img = await handleChooseImage();
          imageUrl.value = base64Img;
          isScanning.value = true;
          setTimeout(() => {
            const randomBird = mockBirdDB[Math.floor(Math.random() * mockBirdDB.length)];
            result.value = {
              name: randomBird.name,
              desc: randomBird.desc,
              score: Math.floor(Math.random() * 10 + 90)
              // 随机生成 90-99% 匹配度
            };
            isScanning.value = false;
            uni.showToast({ title: "识别成功", icon: "success" });
          }, 2e3);
        } catch (e) {
          formatAppLog("error", "at pages/scan/scan.vue:112", e);
          isScanning.value = false;
        }
      };
      const saveToStore = () => {
        const user = uni.getStorageSync("current_user");
        if (!user || !user.username) {
          return uni.showToast({ title: "请先登录", icon: "none" });
        }
        const userKey = "data_" + user.username;
        const allList = uni.getStorageSync(userKey) || [];
        allList.push({
          id: Date.now(),
          title: `[AI识别] ${result.value.name}`,
          content: result.value.desc,
          image: imageUrl.value,
          // 保存刚才的图片
          time: (/* @__PURE__ */ new Date()).toLocaleString()
        });
        uni.setStorageSync(userKey, allList);
        uni.showModal({
          title: "保存成功",
          content: "已成功归档至您的仓库",
          showCancel: false,
          success: () => uni.navigateBack()
        });
      };
      const __returned__ = { imageUrl, isScanning, result, mockBirdDB, handleChooseImage, handleScan, saveToStore, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", {
        class: "image-box",
        onClick: $setup.handleScan
      }, [
        $setup.imageUrl ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: $setup.imageUrl,
          mode: "aspectFit",
          class: "scan-img"
        }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "placeholder"
        }, [
          vue.createElementVNode("text", { class: "camera-icon" }, "📷"),
          vue.createElementVNode("text", { class: "tip" }, "点击拍摄鸟类照片")
        ])),
        $setup.isScanning ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "scan-line"
        })) : vue.createCommentVNode("v-if", true)
      ]),
      $setup.result.name ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "result-card"
      }, [
        vue.createElementVNode("view", { class: "result-header" }, [
          vue.createElementVNode(
            "text",
            { class: "match-score" },
            "匹配度: " + vue.toDisplayString($setup.result.score) + "%",
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "tag" }, "AI智能识别")
        ]),
        vue.createElementVNode(
          "text",
          { class: "bird-name" },
          vue.toDisplayString($setup.result.name),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "bird-desc" },
          vue.toDisplayString($setup.result.desc),
          1
          /* TEXT */
        ),
        vue.createElementVNode("button", {
          type: "primary",
          class: "save-btn",
          onClick: $setup.saveToStore
        }, "保存到我的仓库")
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "start-tip"
      }, [
        $setup.isScanning ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "正在分析生物特征...")) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "请上传清晰的照片以获取准确结果"))
      ]))
    ]);
  }
  const PagesScanScan = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/scan/scan.vue"]]);
  const _sfc_main$2 = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const username = vue.ref("");
      const password = vue.ref("");
      const handleLogin = () => {
        if (!username.value || !password.value)
          return;
        const users = uni.getStorageSync("all_users") || [];
        const user = users.find((u) => u.username === username.value && u.password === password.value);
        if (user) {
          uni.setStorageSync("current_user", user);
          uni.showToast({ title: "登录成功", icon: "success" });
          setTimeout(() => {
            uni.switchTab({ url: "/pages/profile/profile" });
          }, 500);
        } else {
          uni.showToast({ title: "账号或密码错误", icon: "none" });
        }
      };
      const goRegister = () => {
        uni.navigateTo({ url: "/pages/register/register" });
      };
      const __returned__ = { username, password, handleLogin, goRegister, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: _imports_0
      }),
      vue.createElementVNode("view", { class: "title" }, "欢迎回来"),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "input",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.username = $event),
          placeholder: "请输入用户名"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $setup.username]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "input",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
          type: "password",
          placeholder: "请输入密码"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $setup.password]
      ]),
      vue.createElementVNode("button", {
        type: "primary",
        class: "btn",
        onClick: $setup.handleLogin
      }, "登录"),
      vue.createElementVNode("view", {
        class: "link",
        onClick: $setup.goRegister
      }, "没有账号？去注册")
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/login/login.vue"]]);
  const _sfc_main$1 = {
    __name: "register",
    setup(__props, { expose: __expose }) {
      __expose();
      const form = vue.ref({
        username: "",
        password: "",
        confirmPassword: ""
      });
      const handleRegister = () => {
        if (!form.value.username || !form.value.password) {
          return uni.showToast({ title: "账号密码不能为空", icon: "none" });
        }
        if (form.value.password !== form.value.confirmPassword) {
          return uni.showToast({ title: "两次密码不一致", icon: "none" });
        }
        const users = uni.getStorageSync("all_users") || [];
        const exists = users.find((u) => u.username === form.value.username);
        if (exists) {
          return uni.showToast({ title: "用户名已存在", icon: "none" });
        }
        users.push({
          username: form.value.username,
          password: form.value.password,
          // 实际开发中密码必须加密，这里仅演示
          nickname: "新用户" + Math.floor(Math.random() * 1e3)
          // 随机昵称
        });
        uni.setStorageSync("all_users", users);
        uni.showToast({ title: "注册成功" });
        setTimeout(() => {
          uni.navigateBack();
        }, 1e3);
      };
      const goLogin = () => {
        uni.navigateBack();
      };
      const __returned__ = { form, handleRegister, goLogin, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "title" }, "注册新账号"),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "input",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.username = $event),
          placeholder: "请输入用户名"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $setup.form.username]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "input",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.password = $event),
          type: "password",
          placeholder: "请输入密码"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $setup.form.password]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "input",
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.confirmPassword = $event),
          type: "password",
          placeholder: "请再次输入密码"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $setup.form.confirmPassword]
      ]),
      vue.createElementVNode("button", {
        type: "primary",
        class: "btn",
        onClick: $setup.handleRegister
      }, "立即注册"),
      vue.createElementVNode("view", {
        class: "link",
        onClick: $setup.goLogin
      }, "已有账号？去登录")
    ]);
  }
  const PagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/计算机/voiceApp/voiceApp01-project/pages/register/register.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/store/store", PagesStoreStore);
  __definePage("pages/map/map", PagesMapMap);
  __definePage("pages/profile/profile", PagesProfileProfile);
  __definePage("pages/edit/edit", PagesEditEdit);
  __definePage("pages/voice/voice", PagesVoiceVoice);
  __definePage("pages/scan/scan", PagesScanScan);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/register/register", PagesRegisterRegister);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/计算机/voiceApp/voiceApp01-project/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);

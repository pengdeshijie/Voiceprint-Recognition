<template>
  <view>
    <!-- 地图组件：latitude/longitude 是中心点坐标，markers 是标记点 -->
    <map 
      class="map-container"
      :latitude="latitude" 
      :longitude="longitude" 
      :markers="markers"
      :scale="12"
      show-location
      enable-traffic
    ></map>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 默认中心点 (这里设在北京，你可以换成你所在城市的经纬度)
const latitude = ref(39.909);
const longitude = ref(116.397);

// 地图上的标记点 (模拟观鸟点)
const markers = ref([
  {
    id: 1,
    latitude: 39.909,
    longitude: 116.397,
    title: '中央观鸟区',
    iconPath: '/static/logo.png', // 如果有专门的地图钉图标更好
    width: 30,
    height: 30
  },
  {
    id: 2,
    latitude: 39.920,
    longitude: 116.420,
    title: '湿地保护区',
    iconPath: '/static/logo.png',
    width: 30,
    height: 30
  }
]);
</script>

<style>
.map-container {
  width: 100%;
  height: 100vh; /* 占满全屏高度 */
}
</style>
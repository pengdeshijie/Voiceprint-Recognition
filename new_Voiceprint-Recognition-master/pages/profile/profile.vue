<template>
  <view class="center-container">
    <!-- 头部区域 -->
    <view class="header" @click="checkLogin">
      <!-- 头像 -->
      <image class="avatar" :src="isLogin ? '/static/logo.png' : '/static/logo.png'"></image>
      
      <view class="user-info">
        <!-- 只保留这一行：显示 ID (username) -->
        <text class="main-id">{{ isLogin ? userInfo.username : '点击登录/注册' }}</text>
      </view>
    </view>
    
    <!-- 菜单列表 -->
    <view class="menu-list">
      <view class="menu-item">
        <text>我的收藏</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item">
        <text>设置</text>
        <text class="arrow">></text>
      </view>
      
      <!-- 只有登录后才显示退出按钮 -->
      <view class="menu-item" v-if="isLogin" @click="handleLogout">
        <text style="color: red;">退出登录</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

const isLogin = ref(false);
const userInfo = ref({});

onShow(() => {
  const user = uni.getStorageSync('current_user');
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
    uni.navigateTo({ url: '/pages/login/login' });
  }
};

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出吗？',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('current_user');
        isLogin.value = false;
        userInfo.value = {};
        uni.showToast({ title: '已退出', icon: 'none' });
      }
    }
  });
};
</script>

<style>
/* 容器背景色 */
.center-container {
  min-height: 100vh;
  background-color: #f6f7f9;
}

/* 头部样式 */
.header {
  background-color: #007AFF; 
  padding: 50px 20px;
  display: flex; 
  align-items: center; /* 让头像和文字垂直居中 */
}

.avatar { 
  width: 64px; 
  height: 64px; 
  border-radius: 50%; 
  background: #fff; 
  margin-right: 15px; 
  border: 2px solid rgba(255,255,255,0.3);
}

.user-info { 
  display: flex; 
  flex-direction: column; 
  justify-content: center; /* 确保文字居中 */
}

/* 主要文字（ID） */
.main-id { 
  color: #fff; 
  font-size: 24px; /* 稍微调大了一点点，更显眼 */
  font-weight: bold; 
  letter-spacing: 1px;
}

/* 菜单样式 */
.menu-list { 
  margin-top: 20px; 
  background: #fff; 
}
.menu-item {
  padding: 18px 20px; 
  border-bottom: 1px solid #f0f0f0;
  display: flex; 
  justify-content: space-between;
  font-size: 16px;
  color: #333;
}
.menu-item:active {
  background-color: #f9f9f9;
}
.arrow { 
  color: #ccc; 
  font-weight: bold;
}
</style>
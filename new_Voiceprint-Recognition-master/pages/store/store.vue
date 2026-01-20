<template>
  <view class="container">
    <!-- 标题 -->
    <view class="header-title">📦 {{ nickname }}的仓库</view>

    <!-- 情况1：未登录 -->
    <view v-if="!isLogin" class="empty-tip">
      <text>请先登录后查看数据</text>
      <button size="mini" type="primary" style="margin-top: 20px;" @click="goLogin">去登录</button>
    </view>

    <!-- 情况2：已登录但没数据 -->
    <view v-else-if="list.length === 0" class="empty-tip">
      <image src="/static/logo.png" style="width: 50px; height: 50px; opacity: 0.5; margin-bottom: 10px;"></image>
      <view>暂无记录，快去添加吧~</view>
    </view>

    <!-- 情况3：有数据 (显示列表) -->
    <view v-else class="list-box">
      <view v-for="(item, index) in list" :key="item.id" class="card" @click="goEdit(item)">
        <!-- 图片展示 -->
        <image 
          class="card-img" 
          :src="item.image ? item.image : '/static/logo.png'" 
          mode="aspectFill"
        ></image>
        
        <!-- 文字内容 -->
        <view class="card-content">
          <view class="card-top">
            <text class="card-title">{{ item.title }}</text>
          </view>
          <text class="card-desc">{{ item.content }}</text>
          <text class="card-time">{{ item.time }}</text>
        </view>

        <!-- 删除按钮 -->
        <view class="delete-btn" @click.stop="deleteItem(index)">
          <text>🗑️</text> 
        </view>
      </view>
    </view>

    <!-- 悬浮添加按钮 -->
    <view v-if="isLogin" class="add-btn" @click="goAdd">
      <text>+</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

const list = ref([]);
const isLogin = ref(false);
const nickname = ref('游客');
const currentUser = ref(null);

// ★★★ 核心修复：每次页面显示，都强制刷新数据 ★★★
onShow(() => {
  refreshData();
});

const refreshData = () => {
  // 1. 获取当前登录用户
  const user = uni.getStorageSync('current_user');
  
  if (user && user.username) {
    // 已登录
    isLogin.value = true;
    currentUser.value = user;
    nickname.value = user.nickname || user.username;
    
    // 2. 找到专属 Key (例如 data_ddo)
    const userKey = 'data_' + user.username;
    
    // 3. 读取数据 (如果没有数据，就给个空数组 [])
    const storageData = uni.getStorageSync(userKey);
    
    // 4. 更新页面列表
    list.value = storageData || [];
    
    console.log('仓库页已刷新，当前读取:', userKey, '长度:', list.value.length);
  } else {
    // 未登录
    isLogin.value = false;
    nickname.value = '游客';
    list.value = [];
  }
};

// 跳转逻辑
const goLogin = () => uni.navigateTo({ url: '/pages/login/login' });
const goAdd = () => uni.navigateTo({ url: '/pages/edit/edit' });
const goEdit = (item) => uni.navigateTo({ url: `/pages/edit/edit?id=${item.id}` });

// 删除逻辑
const deleteItem = (index) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除这条记录吗？',
    success: function (res) {
      if (res.confirm) {
        // 1. 从视图删除
        list.value.splice(index, 1);
        
        // 2. 更新到本地存储
        const userKey = 'data_' + currentUser.value.username;
        uni.setStorageSync(userKey, list.value);
        
        uni.showToast({ title: '已移除', icon: 'none' });
      }
    }
  });
};
</script>

<style>
/* 保持原有样式，为了美观不要动 */
.container { padding: 20px; background-color: #f6f7f9; min-height: 100vh; }
.header-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; color: #333; }
.card { 
  background-color: #fff; padding: 15px; margin-bottom: 15px; border-radius: 12px; 
  display: flex; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
}
.card-img { 
  width: 80px; height: 80px; border-radius: 8px; background-color: #eee; 
  flex-shrink: 0; margin-right: 15px; 
}
.card-content { 
  flex: 1; display: flex; flex-direction: column; justify-content: space-between; 
  height: 80px; padding: 2px 0; overflow: hidden;
}
.card-title { 
  font-size: 18px; font-weight: bold; color: #333; 
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
}
.card-desc { 
  font-size: 13px; color: #666; 
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
}
.card-time { font-size: 12px; color: #999; margin-top: auto; }
.delete-btn { padding: 10px; opacity: 0.6; font-size: 18px; }

.empty-tip { 
  display: flex; flex-direction: column; align-items: center; justify-content: center; 
  color: #999; margin-top: 100px; 
}
.add-btn { 
  position: fixed; bottom: 80px; right: 30px; z-index: 99; 
  width: 55px; height: 55px; background: linear-gradient(135deg, #007AFF, #00C6FF); 
  border-radius: 50%; display: flex; align-items: center; justify-content: center; 
  color: #fff; font-size: 32px; box-shadow: 0 4px 15px rgba(0,122,255,0.4); 
}
</style>
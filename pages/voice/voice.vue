<template>
  <view class="container">
    <view class="status-bar">
      <text class="status-text">{{ statusText }}</text>
    </view>
    <view class="result-box">
      <textarea class="result-area" v-model="content" placeholder="长按下方按钮说话..." maxlength="-1" />
    </view>
    <view class="btn-group">
      <view class="mic-btn" :class="{ 'recording': isRecording }" @touchstart="startRecord" @touchend="stopRecord" @mousedown="startRecord" @mouseup="stopRecord">
        <text class="mic-icon">🎙️</text>
      </view>
      <text class="tip">长按说话</text>
      <button class="save-btn" type="primary" @click="saveToStore" :disabled="!content">保存到仓库</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const content = ref('');
const statusText = ref('准备就绪');
const isRecording = ref(false);

const startRecord = () => {
  isRecording.value = true;
  statusText.value = '正在聆听...';
  if (typeof plus === 'undefined') {
    uni.showToast({ title: '浏览器已模拟录音', icon: 'none' });
    return; 
  }
  plus.speech.startRecognize({ engine: 'iFly', lang: 'zh-cn', continue: true, timeout: 10000 }, 
    function(s) { content.value += s; }, 
    function(e) { statusText.value = '识别失败'; isRecording.value = false; }
  );
};

const stopRecord = () => {
  if (!isRecording.value) return;
  isRecording.value = false;
  statusText.value = '识别结束';
  if (typeof plus === 'undefined') { content.value += "【模拟】语音转文字测试内容。"; return; }
  plus.speech.stopRecognize();
};

const saveToStore = () => {
  if (!content.value) return;
  
  // 1. 获取用户
  const user = uni.getStorageSync('current_user');
  if (!user) {
    uni.showToast({ title: '请先登录', icon: 'none' });
    return;
  }

  // 2. ★★★ 关键修改：存入专属 Key ★★★
  const userKey = 'data_' + user.username;
  const allList = uni.getStorageSync(userKey) || [];
  
  allList.push({
    id: Date.now(),
    title: '语音笔记 ' + new Date().toLocaleTimeString('zh-CN', { hour12: false }),
    content: content.value,
    image: '', 
    time: new Date().toLocaleString()
  });

  uni.setStorageSync(userKey, allList);
  uni.showToast({ title: '已保存', icon: 'success' });
  setTimeout(() => { content.value = ''; uni.navigateBack(); }, 1000);
};
</script>

<style>
/* 样式保持不变 */
.container { display: flex; flex-direction: column; height: 100vh; background-color: #2c3e50; align-items: center; padding-top: 50px; box-sizing: border-box; }
.status-bar { margin-bottom: 20px; }
.status-text { color: #fff; font-size: 18px; opacity: 0.8; letter-spacing: 1px;}
.result-box { width: 90%; height: 35vh; background: #fff; border-radius: 20px; padding: 20px; box-sizing: border-box; margin-bottom: 50px; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
.result-area { width: 100%; height: 100%; font-size: 18px; line-height: 1.6; color: #333; }
.btn-group { display: flex; flex-direction: column; align-items: center; width: 100%; }
.mic-btn { width: 90px; height: 90px; border-radius: 50%; background-color: #fff; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; transition: all 0.2s; box-shadow: 0 5px 15px rgba(0,0,0,0.3); user-select: none; cursor: pointer; }
.mic-icon { font-size: 45px; }
.mic-btn.recording { background-color: #ff5252; transform: scale(1.1); box-shadow: 0 0 30px rgba(255, 82, 82, 0.6); }
.tip { color: #ccc; font-size: 14px; margin-bottom: 40px; }
.save-btn { width: 80%; border-radius: 25px; font-weight: bold;}
</style>
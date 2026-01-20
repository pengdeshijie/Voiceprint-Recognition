<template>
  <view class="container">
    
    <!-- 1. 图片展示与扫描区 -->
    <view class="image-box" @click="handleScan">
      <!-- 显示拍摄的照片 -->
      <image v-if="imageUrl" :src="imageUrl" mode="aspectFit" class="scan-img"></image>
      <!-- 初始占位符 -->
      <view v-else class="placeholder">
        <text class="camera-icon">📷</text>
        <text class="tip">点击拍摄鸟类照片</text>
      </view>
      
      <!-- 扫描光效动画 (扫描时显示) -->
      <view v-if="isScanning" class="scan-line"></view>
    </view>

    <!-- 2. 识别结果卡片 -->
    <view class="result-card" v-if="result.name">
      <view class="result-header">
        <text class="match-score">匹配度: {{ result.score }}%</text>
        <text class="tag">AI智能识别</text>
      </view>
      <text class="bird-name">{{ result.name }}</text>
      <text class="bird-desc">{{ result.desc }}</text>
      
      <!-- 保存按钮 -->
      <button type="primary" class="save-btn" @click="saveToStore">保存到我的仓库</button>
    </view>

    <!-- 3. 底部状态提示 -->
    <view class="start-tip" v-else>
      <text v-if="isScanning">正在分析生物特征...</text>
      <text v-else>请上传清晰的照片以获取准确结果</text>
    </view>

  </view>
</template>

<script setup>
import { ref } from 'vue';

const imageUrl = ref('');
const isScanning = ref(false);
const result = ref({ name: '', desc: '', score: 0 });

// 模拟的鸟类数据库 (因为没有接真实的百度AI，用这个模拟效果)
const mockBirdDB = [
  { name: '麻雀', desc: '小型鸟类，性格活泼，常见于人类居住区，叫声喳喳。' },
  { name: '喜鹊', desc: '体型较大，羽毛黑白相间，适应能力强，象征吉祥。' },
  { name: '翠鸟', desc: '羽毛翠蓝发亮，主要以鱼虾为食，飞行速度极快。' },
  { name: '白鹭', desc: '全身白色，颈长腿长，常见于水边，姿态优雅。' },
  { name: '红腹锦鸡', desc: '色彩艳丽，中国特有鸟种，被誉为鸟中凤凰。' },
  { name: '苍鹭', desc: '大型水鸟，头顶有黑色长羽冠，常伫立水中捕食。' }
];

// 1. 选择图片并转 Base64 (兼容浏览器和App)
const handleChooseImage = () => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera', 'album'], 
      success: (res) => {
        // #ifdef H5
        const reader = new FileReader();
        reader.readAsDataURL(res.tempFiles[0]);
        reader.onload = (e) => resolve(e.target.result);
        // #endif

        // #ifndef H5
        uni.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: r => resolve('data:image/jpeg;base64,' + r.data),
          fail: reject
        });
        // #endif
      }
    });
  });
};

// 2. 执行扫描逻辑
const handleScan = async () => {
  if (isScanning.value) return;
  
  // 重置结果
  result.value = { name: '', desc: '', score: 0 };
  
  try {
    const base64Img = await handleChooseImage();
    imageUrl.value = base64Img;
    isScanning.value = true;

    // --- 模拟 AI 分析过程 (延迟2秒) ---
    setTimeout(() => {
      // 随机从库里拿一个鸟
      const randomBird = mockBirdDB[Math.floor(Math.random() * mockBirdDB.length)];
      
      result.value = {
        name: randomBird.name,
        desc: randomBird.desc,
        score: Math.floor(Math.random() * 10 + 90) // 随机生成 90-99% 匹配度
      };
      
      isScanning.value = false;
      uni.showToast({ title: '识别成功', icon: 'success' });
    }, 2000); 

  } catch (e) {
    console.error(e);
    isScanning.value = false;
  }
};

// 3. 保存结果到仓库 (多用户隔离版)
const saveToStore = () => {
  // 获取当前用户
  const user = uni.getStorageSync('current_user');
  if (!user || !user.username) {
    return uni.showToast({ title: '请先登录', icon: 'none' });
  }

  // 找到专属箱子
  const userKey = 'data_' + user.username;
  const allList = uni.getStorageSync(userKey) || [];

  // 添加数据
  allList.push({
    id: Date.now(),
    title: `[AI识别] ${result.value.name}`,
    content: result.value.desc,
    image: imageUrl.value, // 保存刚才的图片
    time: new Date().toLocaleString()
  });

  // 存回去
  uni.setStorageSync(userKey, allList);

  uni.showModal({
    title: '保存成功',
    content: '已成功归档至您的仓库',
    showCancel: false,
    success: () => uni.navigateBack()
  });
};
</script>

<style>
.container { padding: 20px; background-color: #1c1c1e; min-height: 100vh; display: flex; flex-direction: column; align-items: center; }

/* 扫描框 */
.image-box {
  width: 100%; height: 55vh; background-color: #2c2c2e; border-radius: 20px;
  overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center;
  border: 2px dashed #444; margin-top: 20px;
}
.scan-img { width: 100%; height: 100%; }
.placeholder { display: flex; flex-direction: column; align-items: center; }
.camera-icon { font-size: 60px; color: #666; margin-bottom: 10px; }
.tip { color: #888; font-size: 14px; }

/* 扫描线动画 */
.scan-line {
  position: absolute; top: 0; left: 0; width: 100%; height: 4px;
  background: linear-gradient(to right, transparent, #00ff00, transparent);
  box-shadow: 0 0 15px #00ff00;
  animation: scan 2s infinite linear;
}
@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* 结果展示卡片 */
.result-card {
  width: 100%; background: #fff; border-radius: 20px; padding: 25px; margin-top: -40px; z-index: 10;
  box-sizing: border-box; box-shadow: 0 -5px 25px rgba(0,0,0,0.5); 
  animation: slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
@keyframes slideUp { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.match-score { color: #007AFF; font-weight: bold; font-size: 14px; }
.tag { background: #e0f2ff; padding: 4px 10px; border-radius: 10px; font-size: 12px; color: #007AFF; font-weight: bold;}
.bird-name { font-size: 32px; font-weight: bold; color: #333; display: block; margin-bottom: 10px; }
.bird-desc { font-size: 15px; color: #666; line-height: 1.6; display: block; margin-bottom: 25px; }
.save-btn { border-radius: 30px; background: linear-gradient(90deg, #007AFF, #00c6ff); font-weight: bold; }

.start-tip { margin-top: 40px; color: #666; font-size: 14px; }
</style>
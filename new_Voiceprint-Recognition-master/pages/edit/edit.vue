<template>
  <view class="container">
    
    <!-- 图片上传区 -->
    <view class="form-item">
      <text class="label">添加图片</text>
      <view class="upload-box" @click="handleChooseImage">
        <view v-if="formData.image" class="preview-box">
          <image :src="formData.image" mode="aspectFill" class="preview-img"></image>
          <view class="delete-icon" @click.stop="removeImage">×</view>
        </view>
        <view v-else class="add-icon">
          <text class="plus">+</text>
          <text class="tip">点击上传</text>
        </view>
      </view>
    </view>

    <!-- 文本输入区 -->
    <view class="form-item">
      <text class="label">标题</text>
      <input class="input" v-model="formData.title" placeholder="请输入标题" />
    </view>
    
    <view class="form-item">
      <text class="label">详情备注</text>
      <textarea class="textarea" v-model="formData.content" placeholder="请输入详细内容" />
    </view>

    <!-- 保存按钮 -->
    <button type="primary" class="save-btn" @click="saveData">保存记录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const formData = ref({ id: null, title: '', content: '', time: '', image: '' });

// 页面加载
onLoad((options) => {
  // 1. 检查登录
  const user = uni.getStorageSync('current_user');
  if (!user) {
    uni.showToast({ title: '未登录', icon: 'none' });
    return;
  }

  // 2. 如果是修改，从专属Key里读取
  if (options.id) {
    const userKey = 'data_' + user.username;
    const allList = uni.getStorageSync(userKey) || [];
    const target = allList.find(item => item.id == options.id);
    if (target) {
      formData.value = { ...target };
    }
  }
});

// 选择图片
const handleChooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: (res) => { formData.value.image = res.tempFilePaths[0]; }
  });
};

// 删除图片
const removeImage = () => { formData.value.image = ''; };


const saveData = () => {
  if (!formData.value.title) return uni.showToast({ title: '标题不能为空', icon: 'none' });

  // 1. 重新读取当前用户 (防止页面停留太久数据丢失)
  const user = uni.getStorageSync('current_user');
  if (!user || !user.username) {
    return uni.showToast({ title: '登录失效，请重新登录', icon: 'none' });
  }

  // 2. 生成专属 Key (必须是 data_ddo 这种格式)
  const userKey = 'data_' + user.username;

  // 3. 读取旧数据
  let allList = uni.getStorageSync(userKey) || [];
  
  // 4. 构造新数据
  const dataItem = {
    title: formData.value.title,
    content: formData.value.content,
    image: formData.value.image || '',
    time: new Date().toLocaleString()
  };

  // 5. 更新数组
  if (formData.value.id) {
    const index = allList.findIndex(item => item.id == formData.value.id);
    if (index !== -1) allList[index] = { ...allList[index], ...dataItem };
  } else {
    allList.push({ id: Date.now(), ...dataItem });
  }

  // 6. 存入 Storage 
  uni.setStorageSync(userKey, allList);

  uni.showModal({
    title: '保存成功',
    content: `数据已存入箱子: [${userKey}]\n当前箱子里有 ${allList.length} 条数据`,
    showCancel: false,
    success: () => {
      uni.navigateBack();
    }
  });
};
</script>

<style>
.container { padding: 20px; background-color: #fff; min-height: 100vh; }
.form-item { margin-bottom: 25px; }
.label { display: block; margin-bottom: 10px; font-weight: bold; font-size: 16px; color: #333; }
.input { background: #f8f8f8; padding: 12px; border-radius: 8px; font-size: 16px; }
.textarea { background: #f8f8f8; padding: 12px; border-radius: 8px; width: 100%; height: 100px; box-sizing: border-box;}
.upload-box { width: 120px; height: 120px; background-color: #f0f2f5; border-radius: 12px; overflow: hidden; position: relative; border: 1px dashed #ccc; }
.add-icon { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; }
.plus { font-size: 40px; line-height: 40px; font-weight: 300; }
.tip { font-size: 12px; margin-top: 5px; }
.preview-box { width: 100%; height: 100%; position: relative; }
.preview-img { width: 100%; height: 100%; }
.delete-icon { position: absolute; top: 0; right: 0; width: 24px; height: 24px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; line-height: 24px; border-bottom-left-radius: 8px; z-index: 9; }
.save-btn { margin-top: 40px; background-color: #007AFF; border-radius: 25px; }
</style>
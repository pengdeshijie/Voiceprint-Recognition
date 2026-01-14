<template>
	<view class="container">
		<view class="title">注册新账号</view>
		
		<input class="input" v-model="form.username" placeholder="请输入用户名" />
		<input class="input" v-model="form.password" type="password" placeholder="请输入密码" />
		<input class="input" v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
		
		<button type="primary" class="btn" @click="handleRegister">立即注册</button>
		<view class="link" @click="goLogin">已有账号？去登录</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
	username: '',
	password: '',
	confirmPassword: ''
});

const handleRegister = () => {
	// 1. 校验输入
	if(!form.value.username || !form.value.password) {
		return uni.showToast({ title: '账号密码不能为空', icon: 'none' });
	}
	if(form.value.password !== form.value.confirmPassword) {
		return uni.showToast({ title: '两次密码不一致', icon: 'none' });
	}

	// 2. 获取现有的所有用户
	const users = uni.getStorageSync('all_users') || [];

	// 3. 检查用户名是否已存在
	const exists = users.find(u => u.username === form.value.username);
	if(exists) {
		return uni.showToast({ title: '用户名已存在', icon: 'none' });
	}

	// 4. 保存新用户
	users.push({
		username: form.value.username,
		password: form.value.password, // 实际开发中密码必须加密，这里仅演示
		nickname: '新用户' + Math.floor(Math.random()*1000) // 随机昵称
	});
	
	uni.setStorageSync('all_users', users);

	uni.showToast({ title: '注册成功' });
	
	// 5. 延迟跳转去登录
	setTimeout(() => {
		uni.navigateBack(); // 返回登录页
	}, 1000);
};

const goLogin = () => {
	uni.navigateBack();
};
</script>

<style>
.container { padding: 30px; }
.title { font-size: 24px; font-weight: bold; margin-bottom: 30px; text-align: center; }
.input { border-bottom: 1px solid #ddd; padding: 15px 0; margin-bottom: 15px; font-size: 16px; }
.btn { margin-top: 30px; border-radius: 25px; }
.link { text-align: center; margin-top: 20px; color: #007AFF; font-size: 14px; }
</style>
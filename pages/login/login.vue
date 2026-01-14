<template>
	<view class="container">
		<image class="logo" src="/static/logo.png"></image>
		<view class="title">欢迎回来</view>
		
		<input class="input" v-model="username" placeholder="请输入用户名" />
		<input class="input" v-model="password" type="password" placeholder="请输入密码" />
		
		<button type="primary" class="btn" @click="handleLogin">登录</button>
		<view class="link" @click="goRegister">没有账号？去注册</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleLogin = () => {
	if(!username.value || !password.value) return;

	// 1. 读取所有注册用户
	const users = uni.getStorageSync('all_users') || [];
	
	// 2. 查找匹配的用户
	const user = users.find(u => u.username === username.value && u.password === password.value);
	
	if(user) {
		// 3. 登录成功：保存当前用户信息
		uni.setStorageSync('current_user', user);
		
		uni.showToast({ title: '登录成功', icon: 'success' });
		
		// 4. 跳转回首页 (因为首页是 TabBar 页面，必须用 switchTab)
		setTimeout(() => {
			uni.switchTab({ url: '/pages/profile/profile' });
		}, 500);
	} else {
		uni.showToast({ title: '账号或密码错误', icon: 'none' });
	}
};

const goRegister = () => {
	uni.navigateTo({ url: '/pages/register/register' });
};
</script>

<style>
.container { padding: 40px; display: flex; flex-direction: column; }
.logo { width: 80px; height: 80px; align-self: center; margin-bottom: 20px; border-radius: 10px;}
.title { font-size: 24px; font-weight: bold; margin-bottom: 40px; text-align: center; }
.input { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px; font-size: 16px; }
.btn { margin-top: 20px; border-radius: 25px; width: 100%; }
.link { text-align: center; margin-top: 20px; color: #007AFF; font-size: 14px; }
</style>
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
// 引入请求封装工具
import request from '../../common/request.js'; 

const username = ref('');
const password = ref('');

const handleLogin = async () => {
	// 1. 非空校验
	if(!username.value || !password.value) {
		return uni.showToast({ title: '请输入账号密码', icon: 'none' });
	}

	try {
		uni.showLoading({ title: '登录中...' });

		// 2. 连接后端登录接口
		// 对应后端 main.py 里的 @app.post("/token")
		const res = await request({
			url: '/token', 
			method: 'POST',
			header: {
				// ⚠️ FastAPI 登录接口必须用这个格式
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				username: username.value,
				password: password.value
			}
		});

		// 3. 登录成功
		console.log("登录成功，Token:", res.access_token);
		
		// 保存 Token (这是最重要的一步)
		uni.setStorageSync('token', res.access_token);
		// 保存用户信息方便展示
		uni.setStorageSync('current_user', { username: username.value });
		
		uni.hideLoading();
		uni.showToast({ title: '登录成功', icon: 'success' });
		
		// 4. 跳转页面 (保持你原来的逻辑，跳到个人中心)
		setTimeout(() => {
			uni.switchTab({ url: '/pages/profile/profile' });
		}, 500);

	} catch (err) {
		uni.hideLoading();
		console.error("登录失败:", err);
		// request.js 会自动弹出错误提示(如"账号密码错误")，这里不用重复弹
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
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
// 引入请求封装工具
import request from '../../common/request.js';

const form = ref({
	username: '',
	password: '',
	confirmPassword: ''
});

const handleRegister = async () => {
	// 1. 基础校验
	if(!form.value.username || !form.value.password) {
		return uni.showToast({ title: '账号密码不能为空', icon: 'none' });
	}
	if(form.value.password !== form.value.confirmPassword) {
		return uni.showToast({ title: '两次密码不一致', icon: 'none' });
	}

	try {
		uni.showLoading({ title: '注册中...' });

		// 2. 连接后端注册接口
		// 对应后端 main.py 里的 @app.post("/register")
		const res = await request({
			url: '/register',
			method: 'POST',
			// 注册接口接收 JSON，不需要改 header，request.js 默认就是 JSON
			data: {
				username: form.value.username,
				password: form.value.password
			}
		});

		uni.hideLoading();
		
		// 3. 注册成功
		uni.showToast({ title: '注册成功', icon: 'success' });
		
		// 4. 延迟返回登录页
		setTimeout(() => {
			uni.navigateBack(); 
		}, 1000);

	} catch (err) {
		uni.hideLoading();
		console.error("注册失败:", err);
		// 如果用户名已存在，后端返回400，request.js会自动提示
	}
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
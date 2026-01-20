// common/config.js
// ⚠️ 请将下面的 IP 改成你电脑的局域网 IP，千万不要写 localhost
const IP = "127.0.0.1"; 

const BASE_URL = `http://${IP}:8000`;

export default {
	BASE_URL,
	// 拼接静态图片路径用 (对应后端 main.py 的 app.mount)
	STATIC_URL: `${BASE_URL}/static`
}
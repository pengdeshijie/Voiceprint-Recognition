## backend使用说明

### 1. 项目结构

```text
bird_backend/
├── main.py              # 程序主入口：定义接口和路由
├── models.py            # 数据库模型：定义表结构
├── schemas.py           # 数据交互模型：定义请求和响应的数据格式
├── database.py          # 数据库配置：连接 SQLite
├── auth.py              # 认证模块：处理密码加密和 JWT Token
├── requirements.txt     # 依赖列表
└── uploads/             # (自动生成) 存放上传文件的目录
```

### 2. 测试端口

启动服务后，访问 Swagger 文档进行测试：
http://127.0.0.1:8000/docs

### 3. 前端连接 (UniApp)

在 HBuilderX 项目管理器中，找到 `common/config.js` 文件。
**修改 IP**：将 `const IP = "..."` 中的地址改为你电脑的 **IPv4 地址**。

```javascript
// common/config.js
const IP = "192.168.1.5"; 
// 注意：这里一定要改！不要用 localhost，否则手机端无法连接
```

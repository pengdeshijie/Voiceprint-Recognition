from flask import Flask, request, jsonify
import os

# 初始化服务器应用
app = Flask(__name__)

# --- 配置区 ---
# 创建一个文件夹用来存队友传来的音频
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# --- 接口 1: 首页 (测试用) ---
# 访问 http://你的链接/ 就能看到
@app.route('/', methods=['GET'])
def home():
    return "Voiceprint Server is Running! (队长 Pogačar 的服务器)"

# --- 接口 2: 接收音频 (核心功能) ---
# iOS 队友把文件发到 http://你的链接/upload_audio
@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    # 1. 检查有没有文件
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    # 2. 保存文件
    if file.filename != '':
        save_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(save_path)
        print(f"收到文件: {file.filename}")
        
        # --- 这里留着以后加 AI 模型代码 ---
        # result = model.predict(save_path)
        # -------------------------------
        
        return jsonify({"message": "File received", "status": "success"})
    
    return jsonify({"error": "Empty filename"}), 400

# --- 启动开关 ---
if __name__ == '__main__':
    # port=5000 对应你在 NATAPP 里填的端口
    app.run(host='0.0.0.0', port=5000)

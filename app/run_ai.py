import os
import sys
import yaml
import torch

# 1. 把 pymodel 目录加入到系统路径，这样才能引用里面的 macls 库
# 获取当前脚本所在目录
current_dir = os.path.dirname(os.path.abspath(__file__))
# 拼接出 pymodel 的路径
pymodel_path = os.path.join(current_dir, 'pymodel')
sys.path.append(pymodel_path)

print(f"正在尝试从这里加载模型: {pymodel_path}")

try:
    # 尝试导入音频预测工具
    from macls.predict import MAClsPredictor
    from macls.utils.utils import dict_to_object
except ImportError as e:
    print("错误：找不到 macls 库。请确认你在 'app' 文件夹下运行此脚本，且 'pymodel' 文件夹存在。")
    print(f"详细错误: {e}")
    sys.exit(1)

def run_recognition():
    # ================= 配置路径 (根据你的截图推测) =================
    # 1. 配置文件路径 (通常在 configs 文件夹下，名字可能是 campplus.yml)
    # 我们先尝试找一下 yml 文件
    configs_dir = os.path.join(pymodel_path, 'configs')
    config_path = ""
    
    # 自动寻找 yaml 配置文件
    if os.path.exists(configs_dir):
        for file in os.listdir(configs_dir):
            if file.endswith('.yml') or file.endswith('.yaml'):
                config_path = os.path.join(configs_dir, file)
                print(f"找到配置文件: {file}")
                break
    
    if not config_path:
        print("错误：在 pymodel/configs 下找不到 .yml 配置文件！")
        return

    # 2. 模型权重文件路径 (就是你那个 28MB 的文件)
    model_path = os.path.join(pymodel_path, 'models', 'model.pth')
    
    if not os.path.exists(model_path):
        print(f"错误：找不到模型文件 {model_path}")
        return

    # ================= 开始识别 =================
    print("正在加载模型，请稍候...")
    
    # 初始化预测器
    predictor = MAClsPredictor(configs=config_path,
                               model_path=model_path,
                               use_gpu=False) # 小白先用 CPU 跑，稳一点
    
    # 测试音频路径
    audio_path = os.path.join(current_dir, 'test.wav')
    
    if not os.path.exists(audio_path):
        print("错误：请在 app 目录下放一个 'test.wav' 音频文件用来测试！")
        return

    print(f"正在识别音频: {audio_path} ...")
    
    # 获取结果
    label, score = predictor.predict(audio_path)
    
    print("\n============= 识别结果 =============")
    print(f"🐦 鸟类标签 (Latin): {label}")
    print(f"📊 置信度 (Score): {score}")
    print("===================================")

if __name__ == '__main__':
    run_recognition()

import os
import shutil
import uuid
from typing import List

import uvicorn
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt

import models
import schemas
import database
import auth

# 1. 初始化数据库表结构
models.Base.metadata.create_all(bind=database.engine)

# 2. 创建 FastAPI 应用实例
app = FastAPI(title="自然观测站后端 API", description="UniApp Bird Watcher Backend")

# 3. 创建文件上传目录
os.makedirs("uploads/images", exist_ok=True)
os.makedirs("uploads/voices", exist_ok=True)

# 4. 挂载静态资源目录
# 这样前端可以通过 http://IP:8000/static/images/xxx.jpg 访问图片
app.mount("/static", StaticFiles(directory="uploads"), name="static")

# 5. 配置 CORS (跨域资源共享)
# 允许 UniApp 前端访问后端接口
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 开发阶段允许所有来源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 定义 Token 获取地址
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# --- 依赖函数：获取当前登录用户 ---
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="无法验证凭据",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # 解码 Token
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # 查找用户
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user


# ================= 接口定义 =================

# 1. 注册接口
@app.post("/register", response_model=schemas.User, summary="用户注册")
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # 检查用户名是否已存在
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="用户名已被注册")

    # 创建新用户
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# 2. 登录接口 (获取 Token)
@app.post("/token", response_model=schemas.Token, summary="用户登录")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    # 验证用户名和密码
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="用户名或密码错误")

    # 生成 Token
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


# 3. 获取当前用户信息
@app.get("/users/me", response_model=schemas.User, summary="获取个人信息")
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user


# 4. 获取所有观测记录 (首页/仓库页)
@app.get("/records", response_model=List[schemas.Record], summary="获取记录列表")
def read_records(
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(database.get_db)
):
    # 这里返回所有人的记录，如果只想返回自己的，可以加过滤条件
    records = db.query(models.Record).order_by(models.Record.created_at.desc()).offset(skip).limit(limit).all()
    return records


# 5. 创建新记录 (编辑页)
@app.post("/records", response_model=schemas.Record, summary="新建记录")
def create_record(
        record: schemas.RecordCreate,
        current_user: models.User = Depends(get_current_user),
        db: Session = Depends(database.get_db)
):
    # 将记录与当前登录用户绑定
    db_record = models.Record(**record.model_dump(), owner_id=current_user.id)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


# 6. 上传图片 (智能识别页)
@app.post("/upload/image", summary="上传图片")
async def upload_image(file: UploadFile = File(...)):
    # 生成唯一文件名，防止重名
    file_ext = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_ext}"
    file_path = f"uploads/images/{file_name}"

    # 保存文件
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 生成访问 URL
    url = f"/static/images/{file_name}"

    # TODO: 接入 AI 模型识别逻辑
    mock_ai_result = "麻雀 (Passer montanus)"

    return {"url": url, "recognition_result": mock_ai_result}


# 7. 上传语音 (语音记事页)
@app.post("/upload/voice", summary="上传语音")
async def upload_voice(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1]
    # 简单的容错，防止没有后缀
    if not file_ext: file_ext = "mp3"

    file_name = f"{uuid.uuid4()}.{file_ext}"
    file_path = f"uploads/voices/{file_name}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    url = f"/static/voices/{file_name}"
    return {"url": url, "message": "上传成功"}


if __name__ == "__main__":
    # 启动服务，监听所有 IP，端口 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
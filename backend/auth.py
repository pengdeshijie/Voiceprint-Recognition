from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

# !!! 生产环境中请修改这个密钥，保持机密 !!!
SECRET_KEY = "my_super_secret_key_for_birdwatcher_app"
ALGORITHM = "HS256"
# Token 有效期：3000分钟 (约2天，方便调试)
ACCESS_TOKEN_EXPIRE_MINUTES = 3000

# 密码加密上下文
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    """验证明文密码和哈希密码是否匹配"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """将明文密码转换为哈希值"""
    return pwd_context.hash(password)

def create_access_token(data: dict):
    """生成 JWT Token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
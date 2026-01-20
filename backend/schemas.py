from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# --- Token 相关模型 ---
class Token(BaseModel):
    access_token: str
    token_type: str


# --- 用户相关模型 ---
class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    """注册时需要密码"""
    password: str


class User(UserBase):
    """返回给前端的用户信息（不包含密码）"""
    id: int

    class Config:
        from_attributes = True  # 允许从 ORM 模型读取数据


# --- 记录相关模型 ---
class RecordBase(BaseModel):
    title: str
    content: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None
    voice_url: Optional[str] = None


class RecordCreate(RecordBase):
    """创建记录时的参数"""
    pass


class Record(RecordBase):
    """返回给前端的完整记录信息"""
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class User(Base):
    """用户表"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)  # 用户名唯一
    hashed_password = Column(String)  # 存储加密后的密码，严禁存储明文

    # 建立与 Record 的关联：一个用户拥有多条记录
    records = relationship("Record", back_populates="owner")


class Record(Base):
    """观测记录表"""
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)  # 标题
    content = Column(String, nullable=True)  # 内容描述

    # 媒体文件路径 (存储服务器上的相对路径)
    image_url = Column(String, nullable=True)
    voice_url = Column(String, nullable=True)

    # 地理位置信息
    latitude = Column(Float, nullable=True)  # 纬度
    longitude = Column(Float, nullable=True)  # 经度

    # 创建时间，默认为当前时间
    created_at = Column(DateTime, default=datetime.utcnow)

    # 外键：关联到用户ID
    owner_id = Column(Integer, ForeignKey("users.id"))

    # 建立与 User 的反向关联
    owner = relationship("User", back_populates="records")
from sqlalchemy import Column, Integer, String, Text, Date, DateTime, Enum
from .database import Base
import datetime

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(Date, nullable=False)
    status = Column(
        Enum('todo', 'in_progress', 'done', 'postponed', name='status_enum'),
        default='todo',
        nullable=False
    )
    priority = Column(
        Enum('low', 'medium', 'high', name='priority_enum'),
        default='medium',
        nullable=False
    )
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)

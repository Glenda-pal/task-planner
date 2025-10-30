from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime, date
from enum import Enum

class StatusEnum(str, Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"
    postponed = "postponed"

class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: date
    status: StatusEnum = StatusEnum.todo
    priority: PriorityEnum = PriorityEnum.medium

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    status: Optional[StatusEnum] = None
    priority: Optional[PriorityEnum] = None

class Task(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

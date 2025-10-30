from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import date

from .. import models, schemas, database

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=List[schemas.Task])
def list_tasks(
    status: Optional[schemas.StatusEnum] = Query(None, description="Status filter"),
    date_from: Optional[date] = Query(None, description="Filter tasks due after this date"),
    date_to: Optional[date] = Query(None, description="Filter tasks due before this date"),
    order_by: Optional[str] = Query("due_date", description="Order by 'priority' or 'due_date'"),
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Task)
    if status:
        query = query.filter(models.Task.status == status.value)
    if date_from:
        query = query.filter(models.Task.due_date >= date_from)
    if date_to:
        query = query.filter(models.Task.due_date <= date_to)
    if order_by == "priority":
        query = query.order_by(models.Task.priority)
    else:
        query = query.order_by(models.Task.due_date)
    tasks = query.all()
    return tasks

@router.get("/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(database.get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        status=task.status.value,
        priority=task.priority.value,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.put("/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    db: Session = Depends(database.get_db)
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    update_data = task_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        # handle enum conversion if needed
        if key in ["status", "priority"] and value is not None:
            value = value.value
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted"}

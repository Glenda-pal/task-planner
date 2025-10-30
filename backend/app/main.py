from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models, database
from .routers import tasks

app = FastAPI(title="Task Planner API", version="1.0.0")

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    models.Base.metadata.create_all(bind=database.engine)

app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Task Planner API", "docs": "/docs"}

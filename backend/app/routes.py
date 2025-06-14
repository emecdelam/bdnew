from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Example: List all BD
@router.get("/bd", response_model=list[schemas.BDBase])
def list_bd(db: Session = Depends(get_db)):
    return db.query(models.BD).all()

# Example: List all Membres
@router.get("/membres", response_model=list[schemas.MembresBase])
def list_membres(db: Session = Depends(get_db)):
    return db.query(models.Membres).all()

# Add more CRUD endpoints as needed for bd, membres, bdpass, locations

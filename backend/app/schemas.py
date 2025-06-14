from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import date, datetime

class BDBase(BaseModel):
    bid: str
    cote: str
    titreserie: Optional[str] = None
    titrealbum: Optional[str] = None
    numtome: Optional[str] = None
    scenariste: str
    dessinateur: str
    collection: Optional[str] = None
    editeur: Optional[str] = None
    genre: Optional[str] = None
    date_creation: Optional[datetime] = None
    date_modification: Optional[datetime] = None
    titre_norm: Optional[str] = None
    serie_norm: Optional[str] = None

    @field_validator('date_creation', 'date_modification', mode='before')
    @classmethod
    def validate_datetime(cls, v):
        if v is None or v == '0000-00-00 00:00:00' or str(v).startswith('0000-00-00'):
            return None
        return v

    class Config:
        from_attributes = True

class MembresBase(BaseModel):
    mid: Optional[int] = None
    nom: str
    prenom: str
    gsm: str
    rue: str
    numero: int
    boite: Optional[str] = None
    codepostal: int
    ville: str
    mail: Optional[str] = None
    caution: int
    remarque: Optional[str] = None
    bdpass: Optional[str] = None
    abonnement: Optional[date] = None
    vip: Optional[int] = None

    @field_validator('abonnement', mode='before')
    @classmethod
    def validate_date(cls, v):
        if v is None or v == '0000-00-00' or str(v).startswith('0000-00-00'):
            return None
        return v

    class Config:
        from_attributes = True

class BDPassBase(BaseModel):
    mid: int
    nblocations: Optional[str] = None
    date: Optional[date] = None

    @field_validator('date', mode='before')
    @classmethod
    def validate_date(cls, v):
        if v is None or v == '0000-00-00' or str(v).startswith('0000-00-00'):
            return None
        return v

    class Config:
        from_attributes = True

class LocationsBase(BaseModel):
    bid: str
    mid: int
    date: date
    paye: Optional[int] = None
    mail_rappel_1_envoye: Optional[int] = None
    mail_rappel_2_envoye: Optional[int] = None
    debut: Optional[datetime] = None
    fin: Optional[datetime] = None

    @field_validator('date', mode='before')
    @classmethod
    def validate_date(cls, v):
        if v is None or v == '0000-00-00' or str(v).startswith('0000-00-00'):
            return None
        return v

    @field_validator('debut', 'fin', mode='before')
    @classmethod
    def validate_datetime(cls, v):
        if v is None or v == '0000-00-00 00:00:00' or str(v).startswith('0000-00-00'):
            return None
        return v

    class Config:
        from_attributes = True

from tortoise.contrib.pydantic import pydantic_model_creator
from models import Card, User, Deck, Game
from pydantic import BaseModel
from typing import List

CardSchema = pydantic_model_creator(Card, name="Card", exclude=("id", "deck"))
DeckSchema = pydantic_model_creator(Deck, name="Deck", exclude=("id", "cards"))
UserSchema = pydantic_model_creator(User, name="User", exclude=("id", "disabled"))
GameSchema = pydantic_model_creator(
    Game, name="Game", exclude=("id", "creator", "state", "created_at", "finished")
)


class CardCreationSchema(BaseModel):
    challenge: str
    deck_name: str


class CardEditSchema(BaseModel):
    id: int
    challenge: str


class CardIdSchema(BaseModel):
    id: int


class DeckEditSchema(BaseModel):
    name: str
    new_name: str


class GameCreationSchema(BaseModel):
    name: str
    deck_names: List[str]
    players: List[str]
    rounds: int

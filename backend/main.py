import random
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="VegGrade AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

VEGETABLES = {
    "Onion": {"criteria": ["Skin dryness", "Firmness", "Sprouting", "Color uniformity"], "issues": ["sprouted onion", "soft spot", "black mold"]},
    "Tomato": {"criteria": ["Ripeness", "Skin integrity", "Color", "Firmness"], "issues": ["damaged tomato", "overripe tomato", "cracked skin"]},
    "Potato": {"criteria": ["Greening", "Skin smoothness", "Firmness", "Sprouting"], "issues": ["green patches", "sprouting", "bruising"]},
    "Carrot": {"criteria": ["Color", "Crispness", "Shape", "Surface cracks"], "issues": ["cracked carrot", "limp carrot", "forked root"]},
    "Brinjal": {"criteria": ["Skin gloss", "Firmness", "Color", "Calyx freshness"], "issues": ["wrinkled skin", "soft rot", "insect hole"]},
    "Cabbage": {"criteria": ["Head compactness", "Leaf color", "Outer leaf damage", "Freshness"], "issues": ["loose head", "yellow leaves", "worm damage"]},
    "Cauliflower": {"criteria": ["Curd whiteness", "Compactness", "Leaf freshness", "Spots"], "issues": ["browning curd", "black spots", "loose curd"]},
    "Chilli": {"criteria": ["Color", "Stem freshness", "Firmness", "Shrivel level"], "issues": ["shriveled chilli", "stem rot", "discoloration"]},
    "Capsicum": {"criteria": ["Skin gloss", "Firmness", "Color", "Wall thickness"], "issues": ["soft spot", "wrinkling", "sunscald"]},
    "Cucumber": {"criteria": ["Firmness", "Color", "Shape", "Skin damage"], "issues": ["yellowing", "soft end", "skin damage"]},
    "Garlic": {"criteria": ["Bulb firmness", "Skin intact", "Clove fill", "Mold"], "issues": ["blue mold", "dried cloves", "sprouting"]},
}


def to_grade(score: int) -> str:
    if score >= 80:
        return "A"
    if score >= 65:
        return "B"
    if score >= 50:
        return "C"
    return "Reject"


def run_model(image_bytes: bytes, hint: Optional[str]) -> dict:
    """Replace this function with a real model later. Keep the same return shape."""
    name = hint if hint in VEGETABLES else random.choice(list(VEGETABLES))
    veg = VEGETABLES[name]
    quantity = random.randint(4, 12)

    items = []
    for i in range(quantity):
        score = min(100, max(15, random.randint(40, 100) + 8))
        grade = to_grade(score)
        issues = [] if grade == "A" else [random.choice(veg["issues"])]
        items.append({"id": i + 1, "grade": grade, "score": score, "issues": issues})

    counts = {"A": 0, "B": 0, "C": 0, "Reject": 0}
    issue_count: dict = {}
    for it in items:
        counts[it["grade"]] += 1
        for x in it["issues"]:
            issue_count[x] = issue_count.get(x, 0) + 1

    return {
        "id": str(uuid.uuid4()),
        "vegetable": name,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "quantity": quantity,
        "items": items,
        "counts": counts,
        "overallScore": round(sum(i["score"] for i in items) / quantity),
        "issues": [f"{n} {k}{'s' if n > 1 else ''}" for k, n in issue_count.items()],
        "criteria": [{"label": c, "value": random.randint(55, 98)} for c in veg["criteria"]],
    }


@app.get("/")
def home():
    return {"message": "VegGrade AI backend is running"}


@app.get("/vegetables")
def vegetables():
    return list(VEGETABLES.keys())


@app.post("/analyze")
async def analyze(file: UploadFile = File(...), hint: Optional[str] = Form(None)):
    image_bytes = await file.read()
    return run_model(image_bytes, hint)
# 🥬 VegGrade AI

**Multi-Vegetable Quality Assessment & Grading System**
Smart India Hackathon project

AI-powered quality grading for 11 vegetables: onion, tomato, potato, carrot, brinjal, cabbage, cauliflower, chilli, capsicum, cucumber and garlic.

## 🎯 Problem Statement

Vegetable quality assessment (originally onion grading) is subjective and inconsistent across inspectors. VegGrade AI provides objective, vegetable-specific quality grading using computer vision.

## ✨ Features

- Image upload and camera capture
- Vegetable identification
- Multiple vegetable detection in one image
- Freshness, damage and rotten/defective detection
- Ripeness assessment where applicable
- Quality score from 0 to 100
- Grade A / B / C / Reject
- Vegetable-specific assessment criteria
- Batch analysis with statistics
- Analysis history
- Dashboard with charts
- Responsive mobile and desktop UI

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS, Recharts, React Router |
| Backend | Python, FastAPI |
| AI layer | Mock analyzer (ready for YOLO / TensorFlow / PyTorch) |

## 📁 Project Structure

```
veggrade-ai/
├── backend/
│   ├── main.py              # FastAPI server (run_model = AI layer)
│   └── requirements.txt
├── src/
│   ├── components/          # Layout, reusable UI
│   ├── context/             # History state
│   ├── data/                # Vegetable data
│   ├── pages/               # Home, Scanner, Result, Batch, History, Dashboard, About
│   ├── services/            # aiService.ts (API + mock fallback)
│   └── types/
├── package.json
└── README.md
```

## 🚀 Run Locally

### 1. Frontend

```bash
npm install
npm run dev
```

Open http://localhost:5173

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

> If the backend is off, the frontend automatically falls back to mock data.

## 🤖 About the AI

This version uses **realistic mock AI data**. The AI service layer is separated so a real model can replace it with no UI changes:

- Frontend: `src/services/aiService.ts` (`VegetableAnalyzer` interface)
- Backend: `backend/main.py` (`run_model()` function)

Planned: YOLO-based detection, per-vegetable defect classifier, real freshness and ripeness scoring.

## 📸 Pages

1. Home
2. AI Vegetable Scanner
3. Quality Analysis Result
4. Batch Analysis
5. Analysis History
6. Dashboard
7. About

## 👩‍💻 Author

subanthana-cse
# BlindSpot — Decision Crash Test

> *"Don't ask AI what you should decide. Ask AI whether your reasoning survives a challenge."*

**BlindSpot** is an AI-assisted cognitive stress-testing platform. People frequently make decisions based only on the information most visible to them—overlooking hidden trade-offs, relying on unstated causal assumptions, and failing to spot blind spots in their logic.

Instead of acting as a generic chatbot or making decisions *for* you, BlindSpot conducts a **Decision Crash Test**: challenging your reasoning across plausible Best, Expected, and Worst-case scenarios while preserving your autonomy as the ultimate decision-maker.

---

## 1. Key Value & Differentiator

| Standard AI / Chatbot Approach | BlindSpot Philosophy |
| :--- | :--- |
| Tells you what decision to make ("You should accept the internship"). | **Never** makes the choice for you. |
| Hallucinates facts and presents guesses as truths. | Explicitly distinguishes **USER PROVIDED** facts from **AI INFERENCE**. |
| Treats decisions in a single optimistic vacuum. | Runs a **3-Scenario Crash Test** (Best, Expected, Worst). |
| Produces fake statistical percentages (e.g. "87.4% success"). | Provides explainable qualitative assessments (**Low / Moderate / High**). |
| Ends with automated recommendations. | Ends with **Reflection** and hands full ownership back to the human. |

---

## 2. Product Flow

```
User Input
  └── Decision, Reasoning, Goals, Factors, Constraints, Concerns
       │
       ▼
1. Decision Input Form (with 1-click presets for quick evaluation)
       │
       ▼
2. Structured Decision Map (separating user facts from extracted assumptions)
       │
       ▼
3. Blind Spot Radar (unconsidered angles with impact & evidence traceability)
       │
       ▼
4. Assumption Chain (causal step-by-step logic highlighting where uncertainty peaks)
       │
       ▼
5. Critical Unknowns (high-priority missing information to resolve before deciding)
       │
       ▼
6. Decision Crash Test (Best Case, Expected Case, Worst Case simulation)
       │
       ▼
7. Decision Fragility (qualitative index explaining how easily logic breaks)
       │
       ▼
8. Reflection & Final Decision Commitment (Before vs After comparison & user choice)
```

---

## 3. Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Modern Vanilla CSS Design System with dark-slate theme, accessible focus indicators, and semantic status badges
- **Icons**: Lucide Icons
- **Backend**: FastAPI + Python 3.12 + Uvicorn
- **AI Orchestration**: Google Gemini API (`google-genai` SDK) with structured JSON generation
- **Validation**: Pydantic v2 (Strict Schema Validation)
- **Testing**: Pytest + FastAPI TestClient

---

## 4. Local Setup

### Prerequisites
- Node.js (v18+ or v24+)
- Python (3.10+)

### 1. Clone & Navigate
```bash
git clone https://github.com/your-username/blindspot-decision-maker.git
cd "Blindspot Decision maker"
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Run FastAPI Server (port 8000)
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install

# Run Vite Dev Server (port 5173)
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## 5. Environment Variables

Create `.env` in `backend/` (or set system environment variables):

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://127.0.0.1:8000
ENVIRONMENT=development
```

> **Note**: If `GEMINI_API_KEY` is not provided, BlindSpot gracefully runs in offline deterministic reasoning challenge mode with full scenario stress-testing, ensuring zero crashes during testing or offline presentations.

---

## 6. API Overview

### `POST /api/v1/analyze`
Submits a user decision for reasoning deconstruction and stress-testing.

**Request Payload:**
```json
{
  "decision": "Should I accept this internship offer?",
  "reasoning": "Good stipend, close to home, resume brand prestige",
  "goals": "Career growth and learning",
  "factors": "Commute, brand name, compensation",
  "constraints": "College schedule and exam overlap",
  "concerns": "Fear of mundane testing tasks"
}
```

**Response Format:**
```json
{
  "decisionMap": { "decision": "...", "goals": [], "reasons": [], "assumptions": [], "tradeOffs": [] },
  "blindSpots": [ { "id": "bs1", "title": "...", "impactLevel": "High", "whyItMatters": "...", "userEvidence": "..." } ],
  "assumptionChains": [ { "id": "ac1", "assumption": "...", "chainNodes": [], "howToVerify": "..." } ],
  "criticalUnknowns": [ { "id": "cu1", "unknown": "...", "priority": "High", "howToDiscover": "..." } ],
  "scenarios": [
    { "type": "BEST_CASE", "title": "...", "dependencyShift": "..." },
    { "type": "EXPECTED_CASE", "title": "...", "dependencyShift": "..." },
    { "type": "WORST_CASE", "title": "...", "dependencyShift": "..." }
  ],
  "fragility": { "level": "Moderate", "summary": "...", "explanation": "..." },
  "reflection": { "initialFocus": "...", "expandedPerspectives": [] },
  "timestamp": "2026-10-04T12:00:00Z"
}
```

### `GET /api/v1/health`
Health check and configuration readiness probe.

---

## 7. 🚀 1-Click Deployment to Vercel (Frontend + Backend Together)

The repository is pre-configured with unified monorepo support (`vercel.json`, `package.json`, `api/index.py`, and `requirements.txt`) so both the **React Frontend** and **FastAPI Python Backend** deploy simultaneously in a single Vercel project:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
2. Select your repository: **`THE-BLIND-SPOT-DECISON-MAKER`**.
3. **Root Directory**: Leave it as default (`./` or root). **Do not select frontend or backend folder!**
4. **Environment Variables**: Add your Gemini API key:
   - Key: `GEMINI_API_KEY`
   - Value: `Your_Gemini_API_Key`
5. Click **"Deploy"**!
   - Vercel automatically builds the Vite frontend bundle into `frontend/dist`.
   - Vercel automatically provisions the serverless Python runtime from `api/index.py`.
   - All `/api/*` calls route directly to FastAPI serverless functions on the same domain without CORS issues.

## 8. AI Safety & Operational Directives

BlindSpot adheres strictly to 13 AI Safety Rules:
1. **Never make the decision for the user.**
2. **Never claim uncertain possibilities are factual.**
3. **Categorize information clearly**: `USER PROVIDED` vs `AI INFERENCE` vs `UNKNOWN`.
4. **No psychological profiling or unsolicited emotional diagnosis.**
5. **Neutral, respectful inquiry**: uses phrases like *"Potentially"*, *"Your reasoning may depend on"*, *"You may want to verify"*.
6. **No numerical fake precision**: uses explainable qualitative terms (*Low*, *Moderate*, *High*).
7. **Strict Pydantic schema validation**: raw LLM output is parsed and verified before returning to client.

---

## 9. Automated Testing

Run the backend unit tests:
```bash
# In workspace root:
backend/.venv/Scripts/python -m pytest backend/tests
```
All tests verify input validation, schema completeness, error handling, and adherence to AI safety rules.

---

## 10. Security Considerations

- **Backend-Only Secrets**: The Gemini API key is never bundled in client code or frontend JS.
- **Input Sanitization & Length Bounds**: Pydantic restricts max payload sizes preventing prompt injection buffer overruns.
- **Protected Exceptions**: Global exception handlers prevent internal tracebacks from reaching client browsers.
- **Restricted CORS**: Cross-Origin Resource Sharing is locked to configured frontend origins.

---

## 11. Limitations

- BlindSpot relies on the user's honesty when inputting constraints and factors.
- Scenarios are exploratory crash tests designed to uncover blind spots, not deterministic prophecies of the future.

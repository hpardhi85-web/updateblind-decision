import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.decision import DecisionInput, AnalysisResponse

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data

def test_analyze_decision_valid():
    payload = {
        "decision": "Should I accept this internship offer?",
        "reasoning": "Good stipend, close to home, reputable company.",
        "goals": "Career growth and learning.",
        "factors": "Commute, brand name, compensation.",
        "constraints": "College schedule and exam overlap.",
        "concerns": "Fear of being assigned mundane testing."
    }
    response = client.post("/api/v1/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    # 1. Structural schema validation
    assert "decisionMap" in data
    assert "blindSpots" in data
    assert "assumptionChains" in data
    assert "criticalUnknowns" in data
    assert "scenarios" in data
    assert "fragility" in data
    assert "reflection" in data

    # 2. Decision map contents
    assert len(data["decisionMap"]["goals"]) > 0
    assert len(data["decisionMap"]["assumptions"]) > 0

    # 3. Crash test scenarios
    assert len(data["scenarios"]) == 3
    scenario_types = [s["type"] for s in data["scenarios"]]
    assert "BEST_CASE" in scenario_types
    assert "EXPECTED_CASE" in scenario_types
    assert "WORST_CASE" in scenario_types

    # 4. Safety rule: AI never tells user what to decide
    for s in data["scenarios"]:
        assert "you should accept" not in s["dependencyShift"].lower()
        assert "you should decline" not in s["dependencyShift"].lower()

    # 5. Fragility assessment has explainable rating
    assert data["fragility"]["level"] in ["Low", "Moderate", "High"]
    assert len(data["fragility"]["explanation"]) > 10

def test_analyze_decision_invalid_input():
    # Empty decision should fail validation (Pydantic min_length=3)
    payload = {
        "decision": "",
        "reasoning": "Some reason",
        "goals": "Some goal",
        "factors": "Some factor",
        "constraints": "Some constraint"
    }
    response = client.post("/api/v1/analyze", json=payload)
    assert response.status_code == 422

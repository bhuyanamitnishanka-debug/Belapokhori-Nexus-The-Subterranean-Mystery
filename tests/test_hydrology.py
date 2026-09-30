import pytest
from app.models.hydrology import SiphonValidationEngine

def test_siphon_low_flow_hazard():
    engine = SiphonValidationEngine()
    result = engine.verify_pipeline_pressure(30.0)
    assert result["status"] == "CRITICAL_ERROR"
    assert result["code"] == "SILTATION_HAZARD_LOW_FLOW"

def test_siphon_stagnation_warning():
    engine = SiphonValidationEngine()
    result = engine.verify_pipeline_pressure(60.0)
    assert result["status"] == "WARNING"
    assert result["code"] == "STAGNATION_WARNING"

def test_siphon_optimal_flow():
    engine = SiphonValidationEngine()
    result = engine.verify_pipeline_pressure(120.0)
    assert result["status"] == "STABLE"
    assert result["code"] == "OPTIMAL_NOMINAL_FLOW"

def test_siphon_monsoon_surge():
    engine = SiphonValidationEngine()
    result = engine.verify_pipeline_pressure(200.0)
    assert result["status"] == "ALERT"
    assert result["code"] == "HIGH_SURGE_FLOW"

def test_siphon_pressure_overload():
    engine = SiphonValidationEngine()
    result = engine.verify_pipeline_pressure(320.0)
    assert result["status"] == "CRITICAL_ERROR"
    assert result["code"] == "PRESSURE_OVERLOAD_BREACH"

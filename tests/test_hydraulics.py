# Project Belapokhori-Nexus: Automated Physics Engine Testing Suite
# Component Path: tests/test_hydraulics.py
# Verification Target: Siphon Loop, Channel Stability, and Siltation Bounds

import pytest
import math
from app.models.hydrology import SiphonValidationEngine

@pytest.fixture
def validation_engine():
    return SiphonValidationEngine()

def test_nominal_flow_hydrostatic_equilibrium(validation_engine):
    """Verifies that optimal working pressures return a STABLE status."""
    nominal_payload = 125.0  # kPa nominal pressure
    result = validation_engine.verify_pipeline_pressure(nominal_payload)
    
    assert result["status"] == "STABLE"
    assert result["code"] == "OPTIMAL_NOMINAL_FLOW"

def test_siltation_hazard_boundary_limit(validation_engine):
    """Ensures a critical low flow pressure accurately flags a low velocity silt hazard."""
    low_pressure_payload = 35.0  # kPa drops below the 45.0 kPa threshold
    result = validation_engine.verify_pipeline_pressure(low_pressure_payload)
    
    assert result["status"] == "CRITICAL_ERROR"
    assert result["code"] == "SILTATION_HAZARD_LOW_FLOW"
    assert "silt" in result["message"].lower()

def test_pressure_overload_structural_breach(validation_engine):
    """Validates that monsoon overflow pressure shocks trigger the safety emergency shutdown routine."""
    catastrophic_payload = 295.0  # kPa breaches the 280.0 kPa ceiling
    result = validation_engine.verify_pipeline_pressure(catastrophic_payload)
    
    assert result["status"] == "CRITICAL_ERROR"
    assert result["code"] == "PRESSURE_OVERLOAD_BREACH"

def test_siphon_velocity_head_balance():
    """
    Validates fluid velocity using the Torricelli-Bernoulli energy statement.
    Verifies that the velocity cleanly clears the minimum fluid drag bounds.
    """
    delta_z = 2.5   # 2.5 meters operating head depth
    g = 9.81        # Acceleration due to gravity (m/s^2)
    f = 0.02        # Darcy friction coefficient for unlined concrete channels
    L = 45.0        # 45 meters under-riverbed pipeline loop length
    D = 0.6         # 600mm internal diameter configuration
    
    # Hydraulic energy losses summation equation
    total_loss_coefficient = 1 + (f * (L / D)) + 1.5
    calculated_velocity = math.sqrt((2 * g * delta_z) / total_loss_coefficient)
    
    # System safety bounds require velocity to remain above the silt drop limits
    assert calculated_velocity >= 0.6, f"Hydraulic stalling detected at velocity: {calculated_velocity} m/s"

# Project Belapokhori-Nexus: Siphon System Pipeline Verification & Real-Time Alerting
# Component: Under-Riverbed Hydrostatic Safety Checker & Telemetry Alert Engine
# File Location: /app/models/hydrology.py
# Node: Salipur, Odisha, India

class SiphonValidationEngine:
    def __init__(self):
        # Precise operational parameter limits (in kiloPascals - kPa)
        # Calibrated using strict Torricelli-Bernoulli head boundary sets
        self.bounds = {
            "MIN_HYDROSTATIC_PRESSURE": 45.0,   # Below this point, system flow stops or stalls
            "OPTIMAL_PRESSURE_LOW": 85.0,      # Baseline dry weather distribution zone
            "OPTIMAL_PRESSURE_HIGH": 165.0,    # Baseline wet weather distribution zone
            "CRITICAL_MAX_PRESSURE": 280.0     # Structural threshold limit to prevent pipeline failure
        }

    def verify_pipeline_pressure(self, operational_pressure_kpa):
        """
        Runs step-by-step systemic evaluation against real-world pressure metrics.
        Returns a structured dictionary indicating system state and safety steps.
        """
        pressure = float(operational_pressure_kpa)
        
        if pressure < self.bounds["MIN_HYDROSTATIC_PRESSURE"]:
            return {
                "status": "CRITICAL_ERROR",
                "code": "SILTATION_HAZARD_LOW_FLOW",
                "message": "Fluid velocity insufficient. Risk of sand accumulation inside under-bed lines. Activate stepwell flash-gates immediately."
            }
            
        elif self.bounds["MIN_HYDROSTATIC_PRESSURE"] <= pressure < self.bounds["OPTIMAL_PRESSURE_LOW"]:
            return {
                "status": "WARNING",
                "code": "STAGNATION_WARNING",
                "message": "System operating under restricted flow head conditions. Monitor siphon channels closely."
            }
            
        elif self.bounds["OPTIMAL_PRESSURE_LOW"] <= pressure <= self.bounds["OPTIMAL_PRESSURE_HIGH"]:
            return {
                "status": "STABLE",
                "code": "OPTIMAL_NOMINAL_FLOW",
                "message": "Hydrostatic pressure values balanced. Inland waterway depth stable. Shipping channel clear."
            }
            
        elif self.bounds["OPTIMAL_PRESSURE_HIGH"] < pressure < self.bounds["CRITICAL_MAX_PRESSURE"]:
            return {
                "status": "ALERT",
                "code": "HIGH_SURGE_FLOW",
                "message": "Monsoon roof-catchment volumes loading. Open secondary side pockets to distribute excess volume."
            }
            
        else:
            return {
                "status": "CRITICAL_ERROR",
                "code": "PRESSURE_OVERLOAD_BREACH",
                "message": "Pipeline structural limit exceeded! Shut down primary barrage inputs and divert all flow into deep aquifer recharge zones."
            }


class TelemetryAlertEngine:
    def __init__(self):
        # Programmatic bounds calibrated against the Torricelli-Bernoulli physics layout
        # Pressure measured in kiloPascals (kPa), rotational velocity in RPM
        self.thresholds = {
            "MIN_HYDROSTATIC_PRESSURE": 45.0,    # Lower bound below which fluid stalling occurs
            "CRITICAL_MAX_PRESSURE": 280.0,     # Maximum structural pressure before pipeline failure
            "MIN_SHAFT_VELOCITY_RPM": 12.0,     # Minimum speed needed for alternator generation
            "MAX_SHAFT_VELOCITY_RPM": 95.0      # Maximum velocity before gearbox overheating risk
        }

    def process_sensor_payload(self, current_pressure_kpa, current_rpm):
        """
        Runs real-time checks on system telemetry inputs against safe limits.
        Outputs quick-response warning logs to prevent system infrastructure faults.
        """
        pressure = float(current_pressure_kpa)
        rpm = float(current_rpm)
        alerts = []

        # 1. Evaluate Subterranean Siphon Hydrostatic Pressures
        if pressure < self.thresholds["MIN_HYDROSTATIC_PRESSURE"]:
            alerts.append({
                "severity": "CRITICAL_ERROR",
                "code": "SILTATION_HAZARD",
                "action_required": "OPEN_STEPWELL_FLASH_GATES",
                "message": f"Siphon pressure ({pressure} kPa) fell below minimum flow limits. High risk of riverbed mud settling."
            })
        elif pressure > self.thresholds["CRITICAL_MAX_PRESSURE"]:
            alerts.append({
                "severity": "CRITICAL_ERROR",
                "code": "PRESSURE_OVERLOAD_BREACH",
                "action_required": "DIVERT_TO_DEEP_AQUIFER",
                "message": f"Monsoon surge shock caught at {pressure} kPa! Diverting rooftop network runoff to stop burst."
            })

        # 2. Evaluate Hydro-Kinetic Ghatiyantra Shaft Performance Metrics
        if rpm < self.thresholds["MIN_SHAFT_VELOCITY_RPM"]:
            alerts.append({
                "severity": "WARNING",
                "code": "LOW_POWER_OUTPUT",
                "action_required": "SUPPLEMENT_VIA_SOLAR_CANOPY",
                "message": f"Ghatiyantra axle velocity is low ({rpm} RPM). Alternator output falling; pulling solar tracking power."
            })
        elif rpm > self.thresholds["MAX_SHAFT_VELOCITY_RPM"]:
            alerts.append({
                "severity": "ALERT",
                "code": "GEARBOX_OVERHEATING_RISK",
                "action_required": "DEPLOY_KINETIC_BRAKE_PADDLES",
                "message": f"Shaft speed excessive ({rpm} RPM). Applying mechanical water brake to protect alternator linkages."
            })

        # 3. Compile Unified System Diagnostics Telemetry
        if not alerts:
            return {
                "status": "HEALTHY",
                "code": "NOMINAL_OPERATION",
                "active_alerts_count": 0,
                "message": "All loops balanced. Shipping channel depth holding steady. Grid operating within optimal limits."
            }
        
        return {
            "status": "UNSTABLE",
            "code": "ACTIVE_INFRASTRUCTURE_ALERTS",
            "active_alerts_count": len(alerts),
            "diagnostics": alerts
        }

if __name__ == "__main__":
    # Test execution pass parsing mock sensor parameters anomaly payload
    monitor = TelemetryAlertEngine()
    anomaly_log = monitor.process_sensor_payload(current_pressure_kpa=32.0, current_rpm=102.5)
    print(f"System Operational Analytics Scan Output:\n{anomaly_log}")

# Project Belapokhori-Nexus: CNC Manufacturing Code Parser
# System Execution Architecture: Parametric G-Code Toolpath Generator
# Developer Core Axis: Salipur, Odisha, India

import os
import math

class GCodeToolpathGenerator:
    def __init__(self, target_feed_rate=1200, spindle_speed=4500):
        self.feed = target_feed_rate
        self.spindle = spindle_speed
        self.commands = []
        
    def initialize_machine_header(self):
        """Compiles safe initialization variables block into machine registry files."""
        self.commands.extend([
            "G90",         # Absolute coordinate positioning layout
            "G21",         # Core unit metric measurement parameters (mm scale)
            "G17",         # XY plane selection mode active
            f"M03 S{self.spindle}", # Spin spindle clockwise at target speed
            "G00 Z10.0"    # Rapid linear transition lift to safe clearance level
        ])

    def parse_circular_cut(self, center_x, center_y, radius, cutting_depth=-5.0):
        """Calculates precise step-by-step entry points to cut structural components."""
        start_x = center_x + radius
        start_y = center_y
        
        self.commands.extend([
            f"\n; --- STARTING CONCENTRIC MILLING SEQUENCE FOR POT/AXLE CORE ---",
            f"G00 X{start_x:.3f} Y{start_y:.3f}",   # Move rapidly to circle start point border
            f"G01 Z{cutting_depth:.3f} F200",        # Linear feed down into stock material
            f"G02 X{start_x:.3f} Y{start_y:.3f} I{-radius:.3f} J0.0 F{self.feed}", # CW full circle profile cut
            f"G00 Z10.0"                             # Retract safely back out of work area
        ])

    def parse_linear_slot(self, x_start, y_start, x_end, y_end, cutting_depth=-3.0):
        """Carves out high-strength connection slots for the 12 radial spokes."""
        self.commands.extend([
            f"\n; --- STARTING LINEAR MILLING SEQUENCE FOR RADIAL SPOKE SLOT ---",
            f"G00 X{x_start:.3f} Y{y_start:.3f}",
            f"G01 Z{cutting_depth:.3f} F200",
            f"G01 X{x_end:.3f} Y{y_end:.3f} F{self.feed}",
            f"G00 Z10.0"
        ])

    def compile_and_save_nc(self, output_filename="nexus_toolpaths.nc"):
        """Appends closing parameters and saves the toolpath coordinates script."""
        self.commands.extend([
            "\nM05",     # Kill spindle rotational drive output
            "M30"      # End of structural program execution index marker
        ])
        
        filepath = os.path.join(os.getcwd(), output_filename)
        with open(filepath, "w") as f:
            f.write("; PROJECT BELAPOKHORI-NEXUS: AUTOMATED TOOLPATH SCRIPT\n")
            f.write("; ARCHITECTURE CONTROL NODE: SALIPUR, ODISHA\n")
            f.write(";\n".join(self.commands))
        print(f"[MANUFACTURING LOG] G-code production toolpaths compiled into: {filepath}")

if __name__ == "__main__":
    generator = GCodeToolpathGenerator()
    generator.initialize_machine_header()
    
    # 1. Profile cut the 50mm diameter central axle core at origin (Radius = 25mm)
    generator.parse_circular_cut(center_x=0.0, center_y=0.0, radius=25.0)
    
    # 2. Parametrically generate lines to carve out the 12 structural spokes slots
    total_spokes = 12
    length = 360.0
    for i in range(total_spokes):
        angle = (i / total_spokes) * 2 * math.pi
        x_terminal = length * math.cos(angle)
        y_terminal = length * math.sin(angle)
        generator.parse_linear_slot(0.0, 0.0, x_terminal, y_terminal)
        
    generator.compile_and_save_nc()

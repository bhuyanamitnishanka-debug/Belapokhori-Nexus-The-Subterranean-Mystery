# Project Belapokhori-Nexus: 3D Standard Mesh Mesh Exporter
# Platform Pipeline: CAD Layer Transformation Matrix to OBJ/STL
# Developer Core Axis: Salipur, Odisha, India

import os
import math

class MeshGenerationEngine:
    def __init__(self, filename_base="nexus_ghatiyantra"):
        self.filename_base = filename_base
        self.vertices = []
        self.faces = []

    def build_3d_extruded_cylinder(self, radius, thickness, z_offset, segments=32):
        """Programmatically calculates 3D volumetric surfaces for shafts and hubs."""
        start_v_idx = len(self.vertices) + 1
        
        # 1. Generate front and back radial vertices
        for z in [z_offset, z_offset + thickness]:
            for i in range(segments):
                theta = (i / segments) * 2.0 * math.pi
                x = radius * math.cos(theta)
                y = radius * math.sin(theta)
                self.vertices.append((x, y, z))
        
        # 2. Map side cap faces
        for i in range(segments):
            next_i = (i + 1) % segments
            v1 = start_v_idx + i
            v2 = start_v_idx + next_i
            v3 = start_v_idx + segments + i
            v4 = start_v_idx + segments + next_i
            
            # Quads split into hardware triangles
            self.faces.append((v1, v2, v4))
            self.faces.append((v1, v4, v3))

    def export_to_obj(self):
        """Writes the vector data arrays into a wavefaced OBJ format text file."""
        filepath = f"{self.filename_base}.obj"
        with open(filepath, "w") as f:
            f.write(f"# Project Belapokhori-Nexus: 3D Mechanical Prototype\n")
            f.write(f"# Export System Location: Salipur, Odisha\n\n")
            
            for v in self.vertices:
                f.write(f"v {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}\n")
            
            f.write("\n")
            for face in self.faces:
                f.write(f"f {face[0]} {face[1]} {face[2]}\n")
        print(f"[EXPORT LOG] Successfully exported 3D standard model matrix to: {filepath}")

    def export_to_ascii_stl(self):
        """Converts structural coordinate maps to standard stereolithography STL format."""
        filepath = f"{self.filename_base}.stl"
        with open(filepath, "w") as f:
            f.write(f"solid {self.filename_base}\n")
            
            for face in self.faces:
                v1 = self.vertices[face[0] - 1]
                v2 = self.vertices[face[1] - 1]
                v3 = self.vertices[face[2] - 1]
                
                # Compute mock orthogonal normal vector pointing outward
                f.write("  facet normal 0.0 0.0 1.0\n")
                f.write("    outer loop\n")
                f.write(f"      vertex {v1[0]:.4f} {v1[1]:.4f} {v1[2]:.4f}\n")
                f.write(f"      vertex {v2[0]:.4f} {v2[1]:.4f} {v2[2]:.4f}\n")
                f.write(f"      vertex {v3[0]:.4f} {v3[1]:.4f} {v3[2]:.4f}\n")
                f.write("    endloop\n")
                f.write("  endfacet\n")
                
            f.write(f"endsolid {self.filename_base}\n")
        print(f"[EXPORT LOG] Successfully exported 3D standard model matrix to: {filepath}")

if __name__ == "__main__":
    engine = MeshGenerationEngine()
    # Extrude Central Axle: Radius 25mm, Thickness 400mm, Positioned at Origin
    engine.build_3d_extruded_cylinder(radius=25.0, thickness=400.0, z_offset=0.0)
    # Extrude Drive Hub Interface: Radius 80mm, Thickness 60mm, Positioned at Center
    engine.build_3d_extruded_cylinder(radius=80.0, thickness=60.0, z_offset=170.0)
    
    engine.export_to_obj()
    engine.export_to_ascii_stl()

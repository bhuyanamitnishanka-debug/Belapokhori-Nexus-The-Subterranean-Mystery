# Project Belapokhori-Nexus: Automated Visual Mesh Handler Pipeline
# Target Engine: Flask Server WebGL Model Viewport Integrations
# Workstation Coordinates: Salipur, Odisha, India

from flask import Blueprint, jsonify, send_file, current_app
import os

simulation_bp = Blueprint('simulation', __name__)

@simulation_bp.route('/api/v1/mesh/preview/<string:component_name>', methods=['GET'])
def get_mesh_preview_data(component_name):
    """
    Locates mechanical parts on the disk matrix and streams structured 
    coordinate telemetry vectors to the interactive WebGL dashboard container.
    """
    # Sanitize and guard filename context inputs against traversal exploits
    safe_filename = "".join([c for c in component_name if c.isalnum() or c in ('.', '_', '-')])
    mesh_directory = os.path.join(current_app.root_path, 'static', 'mesh_exports')
    filepath = os.path.join(mesh_directory, safe_filename)

    if not os.path.exists(filepath):
        return jsonify({
            "status": "ERROR",
            "code": "FILE_NOT_FOUND",
            "message": f"Target mechanical assembly '{safe_filename}' not found in asset repository."
        }), 404

    try:
        # Determine format extension profile types
        ext = os.path.splitext(safe_filename)[1].lower()
        
        vertices = []
        faces = []

        # High-performance byte stream reading loop for standard OBJ formats
        if ext == '.obj':
            with open(filepath, 'r') as obj_file:
                for line in obj_file:
                    if line.startswith('v '):
                        parts = line.split()
                        vertices.append([float(parts[1]), float(parts[2]), float(parts[3])])
                    elif line.startswith('f '):
                        parts = line.split()
                        # Extract structural indices (handling standard slash formatting offsets)
                        face_indices = [int(p.split('/')[0]) - 1 for p in parts[1:]]
                        faces.append(face_indices)

            return jsonify({
                "status": "SUCCESS",
                "format": "OBJ",
                "component": safe_filename,
                "data": {
                    "vertices": vertices,
                    "faces": faces
                }
            }), 200

        # General file fallback route wrapper
        return send_file(filepath, as_attachment=True)

    except Exception as e:
        return jsonify({
            "status": "FATAL_EXCEPTION",
            "code": "PARSING_FAILED",
            "message": f"Failed to map geometry vectors: {str(e)}"
        }), 500

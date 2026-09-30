/**
 * Project Belapokhori-Nexus: Telemetry Dashboard Charts Pipeline
 * Component: Real-Time Performance Monitor Engine
 * File Location: /app/static/js/metrics_panel.js
 */
export class TelemetryChartPipeline {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.dataPoints = [];
        this.maxPoints = 50; // Horizontal history tracking depth
        
        // Technical visualization palette styling
        this.colors = {
            grid: '#1a273a',
            line: '#00ffcc',
            glow: 'rgba(0, 255, 204, 0.2)',
            text: '#8a95a5'
        };

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas || !this.canvas.parentElement) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.render();
    }

    pushMetric(value) {
        this.dataPoints.push(parseFloat(value));
        if (this.dataPoints.length > this.maxPoints) {
            this.dataPoints.shift(); // Evict oldest telemetry point
        }
        this.render();
    }

    render() {
        if (!this.canvas || !this.ctx) return;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const padding = 40;

        // Clear view area
        this.ctx.fillStyle = '#0a0f1d';
        this.ctx.fillRect(0, 0, w, h);

        // 1. Draw Background Grid Lines
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 1;
        
        const gridCount = 5;
        for (let i = 1; i < gridCount; i++) {
            let y = padding + ((h - 2 * padding) / gridCount) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(w - padding, y);
            this.ctx.stroke();
        }

        if (this.dataPoints.length < 2) return;

        // 2. Compute Mapping Geometry Primitives
        const minVal = 0;
        const maxVal = 100; // Calibrated operational scale upper limit
        const graphW = w - 2 * padding;
        const graphH = h - 2 * padding;

        this.ctx.beginPath();
        for (let i = 0; i < this.dataPoints.length; i++) {
            let x = padding + (i / (this.maxPoints - 1)) * graphW;
            let normalizedY = (this.dataPoints[i] - minVal) / (maxVal - minVal);
            let y = h - padding - (normalizedY * graphH);

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        // 3. Render High-Visibility Glow Pipeline Style
        this.ctx.strokeStyle = this.colors.line;
        this.ctx.lineWidth = 3;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.colors.line;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // 4. Render Telemetry Value Tags
        this.ctx.fillStyle = this.colors.text;
        this.ctx.font = '12px monospace';
        const currentVal = this.dataPoints[this.dataPoints.length - 1].toFixed(2);
        this.ctx.fillText(`VAL: ${currentVal}`, w - padding - 80, padding - 10);
    }
}

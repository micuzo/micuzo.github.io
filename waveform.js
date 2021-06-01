import canvas, { utils } from "./canvas.js";
class Waveform {
    constructor(_position, scale = 1) {
        this._position = _position;
        this.scale = scale;
        this.toggleAnimation = () => {
            this._animating = !this._animating;
            if (this._animating)
                utils.animate(this.waveformAnimation);
            else
                utils.animate(this.stopAnimation);
        };
        this.waveformAnimation = (deltaTime, phase) => {
            this._heights = this.getHeightSnapshot(this._heights);
            this._timer += deltaTime;
            return this._animating;
        };
        this.getHeightSnapshot = (heights) => {
            const max = 100 * this.scale;
            const offset = Math.PI / heights.length / 2;
            const snapshot = heights.map((height, index) => {
                let t = this._timer - offset * index;
                t *= 2;
                return 0.1 * max + (0.9 * max) * Math.abs(Math.sin(t));
            });
            return snapshot;
        };
        this.stopAnimation = (deltaTime, phase) => {
            return false;
        };
        this.draw = () => {
            const ctx = canvas.ctx();
            const props = this._properties;
            this._heights.forEach((height, index) => {
                const lineDimensions = {
                    x: props.lineWidth,
                    y: height
                };
                let linePos = {
                    x: this._position.x + index * (lineDimensions.x + props.gapWidth) + lineDimensions.x / 2,
                    y: this._position.y + (this.dimensions.y - height) / 2
                };
                //Draw line
                utils.makeShadow(10);
                ctx.beginPath();
                ctx.strokeStyle = "#A58D4F";
                ctx.moveTo(linePos.x, linePos.y);
                ctx.lineWidth = lineDimensions.x;
                ctx.lineCap = "round";
                ctx.lineTo(linePos.x, linePos.y + lineDimensions.y);
                ctx.stroke();
                utils.resetShadow();
            });
            //Draw song title
            utils.makeShadow(10);
            const titleColor = "#A89050";
            canvas.ctx().fillStyle = titleColor;
            canvas.ctx().font = "64px Roboto";
            const titleWidth = canvas.ctx().measureText("Hokage").width;
            canvas.ctx().fillText("Hokage", this.position.x - titleWidth / 2, this.position.y + 300);
            utils.resetShadow();
        };
        //Initialize heights to intial phase of animation
        this._timer = 3;
        this._heights = this.getHeightSnapshot([0, 0, 0, 0, 0, 0, 0]);
        this._animating = false;
        this._properties = {
            lineWidth: 35 * 0.5 * scale,
            gapWidth: 10,
        };
        const totalWidth = this._properties.lineWidth * this._heights.length +
            this._properties.gapWidth * (this._heights.length - 1);
        this.dimensions = {
            x: totalWidth,
            y: Math.max(...this._heights)
        };
        this._position = utils.center(_position, this.dimensions);
    }
    get position() {
        return {
            x: this._position.x + this.dimensions.x / 2,
            y: this._position.y + this.dimensions.y / 2
        };
    }
}
export default Waveform;

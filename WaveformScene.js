import Waveform from './waveform.js';
import canvas from "./canvas.js";
let deltaTime = 0;
let prevTime = 0;
//colors
const black = "#202020";
let waveform;
const init = () => {
    deltaTime = Date.now() - prevTime;
    prevTime = Date.now();
    //waveform
    const canvasDimensions = canvas.getCanvasDimensions();
    const startPos = {
        x: canvasDimensions.x / 2,
        y: canvasDimensions.y / 2
    };
    waveform = new Waveform(startPos, 3);
    update();
};
const background = () => {
    //background
    const canvasDimensions = canvas.getCanvasDimensions();
    canvas.ctx().fillStyle = black;
    canvas.ctx().fillRect(0, 0, canvasDimensions.x, canvasDimensions.y);
};
const update = () => {
    deltaTime = (Date.now() - prevTime) / 1000;
    prevTime = Date.now();
    canvas.clear();
    background();
    waveform.draw();
    window.requestAnimationFrame(() => update());
};
const next = () => { };
const play = () => {
    waveform.toggleAnimation();
};
const prev = () => { };
const WaveformScene = {
    init,
    background,
    update,
    next,
    play,
    prev,
};
export default WaveformScene;

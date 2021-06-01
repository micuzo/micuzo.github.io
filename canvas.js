let canvasElement;
let ctx;
const init = () => {
    canvasElement = document.getElementById("canvas");
    ctx = canvasElement.getContext("2d");
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
};
const changeScene = (newScene) => {
    newScene();
};
const getCanvasDimensions = () => {
    return {
        x: canvasElement.width,
        y: canvasElement.height
    };
};
const center = (position, dimensions) => {
    return {
        x: position.x - dimensions.x / 2,
        y: position.y - dimensions.y / 2
    };
};
const getCenter = (position, dimensions) => {
    return {
        x: (position.x + dimensions.x) / 2,
        y: (position.y + dimensions.y) / 2
    };
};
const makeShadow = (blur = 0) => {
    canvas.ctx().shadowColor = "rgba(0, 0, 0, 0.4)";
    canvas.ctx().shadowOffsetX = 10;
    canvas.ctx().shadowOffsetY = 10;
    canvas.ctx().shadowBlur = blur;
};
const resetShadow = () => {
    canvas.ctx().shadowColor = "transparent";
};
const animate = (animation, duration = -1) => {
    const startTime = Date.now();
    const run = (prevTime) => {
        const currentTime = Date.now();
        const deltaTime = (currentTime - prevTime) / 1000;
        const phase = (currentTime - startTime) / duration;
        const continueAnimation = animation(deltaTime, phase);
        if (continueAnimation)
            window.requestAnimationFrame(() => run(currentTime));
    };
    run(startTime);
};
const rotateCenter = (x, y, width, height, angle, action) => {
    canvas.ctx().save();
    const transX = x + width / 2;
    const transY = y + height / 2;
    canvas.ctx().translate(transX, transY);
    canvas.ctx().rotate((Math.PI / 180) * angle);
    action();
    canvas.ctx().restore();
};
let canvas = {
    init,
    ctx: () => ctx,
    clear: () => ctx.clearRect(0, 0, canvasElement.width, canvasElement.height),
    changeScene,
    getCanvasDimensions
};
export let utils = {
    makeShadow,
    resetShadow,
    rotateCenter,
    animate,
    center,
    getCenter,
};
export default canvas;
/*
function foo(callback, duration,  prevtime = Date.now()) {
    currtime = Date.now();
    deltatime = currtime - prevtime;
    callback(deltatime);
    raf(() => foo(callback, currtime));
}

start (duration){
    starttime = Date.now();
    endtime = Date.now() + duration;
    run ();
}

function getAnimationFunction(duration) {
    startinm = Date.now();
    endTime = Date.now();
    return foo;
}

*/ 

import canvas from './canvas.js';
import WaveformScene from './WaveformScene.js';
import CarouselScene from './CarouselScene.js';
const changeScene = (newScene) => {
    canvas.changeScene(newScene.init);
    const play = document.getElementById("play");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    play.onclick = () => {
        play.innerHTML = play.innerHTML === "Play" ? "Pause" : "Play";
        newScene.play();
    };
    prev.onclick = () => newScene.prev();
    next.onclick = () => newScene.next();
};
window.onload = () => {
    canvas.init();
    changeScene(WaveformScene);
    const dropdown = document.getElementById("scenes");
    dropdown.onchange = (event) => {
        if (dropdown.value == "Waveform") {
            changeScene(WaveformScene);
        }
        else {
            changeScene(CarouselScene);
        }
    };
};

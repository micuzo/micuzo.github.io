import canvas, { utils } from './canvas.js';
import SongCard from './songcard.js';
import Carousel, { Directions } from './carousel.js';
import { interpolateColor, randomHex } from './Color.js';
const img = new Image();
let carousel;
//colors
const lightPink = "#d41cd1";
const darkPink = "#ac15ab";
//backgroundColors
let bgColorPrimary = lightPink;
const getBgColorSecondary = () => interpolateColor(bgColorPrimary, "#000000", 0.25);
const init = () => {
    const mockData = {
        imagePath: "hokage_circle.png",
        name: "Hokage"
    };
    //populate objects
    const objects = [];
    let songCard = new SongCard(175, 125, mockData.name);
    songCard.diskImage = img;
    carousel = new Carousel(songCard);
    objects.push(carousel);
    //load disk image
    img.src = mockData.imagePath;
    img.addEventListener("load", () => {
        window.requestAnimationFrame(() => update(objects));
    }, false);
};
const background = () => {
    const canvasDimensions = canvas.getCanvasDimensions();
    const seperation = 0.7 * canvasDimensions.y;
    canvas.ctx().fillStyle = bgColorPrimary.toString();
    canvas.ctx().fillRect(0, 0, canvasDimensions.x, seperation);
    canvas.ctx().fillStyle = getBgColorSecondary().toString();
    canvas.ctx().fillRect(0, seperation - 10, canvasDimensions.x, canvasDimensions.y - seperation + 10);
    canvas.ctx().fillStyle = "rgba(0, 0, 0, 0.6)";
    canvas.ctx().font = "bold 800px sans-serif";
    canvas.ctx().fillText("FORUNTO", -550, seperation - 75);
};
const changeBgColor = (newColor) => {
    const startColor = bgColorPrimary;
    const bgChangeAnimation = (deltaTime, phase) => {
        bgColorPrimary = interpolateColor(startColor, newColor, Math.min(phase, 1));
        return phase < 1;
    };
    utils.animate(bgChangeAnimation, 200);
};
const update = (objects) => {
    canvas.clear();
    background();
    objects.forEach((object) => {
        object.draw();
    });
    window.requestAnimationFrame(() => update(objects));
};
const changeTrack = (direction) => {
    let nextSongCard = new SongCard(0, 0, "Cigario");
    nextSongCard.diskImage = img;
    changeBgColor(randomHex());
    carousel.slideCarousel(direction, nextSongCard);
};
const next = () => {
    changeTrack(Directions.NEXT);
};
const play = () => {
    carousel.animateCard();
};
const prev = () => {
    changeTrack(Directions.PREV);
};
const CarouselScene = {
    init,
    background,
    update,
    next,
    play,
    prev,
};
export default CarouselScene;

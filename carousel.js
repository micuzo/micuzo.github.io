import canvas, { utils } from './canvas.js';
class Carousel {
    constructor(songCard) {
        this.songCard = songCard;
        this.slideCarousel = (direction, nextSongCard) => {
            this._currentSongCard = nextSongCard;
            const animationSpeed = 300;
            if (direction === Directions.NEXT) {
                this._songFrames[2] = nextSongCard;
                this._songFrames.push(null);
                utils.animate(this.slideAnimationNext, animationSpeed);
            }
            else if (direction === Directions.PREV) {
                this._songFrames[0] = nextSongCard;
                this._songFrames.splice(0, 0, null);
                this.startX -= 475;
                utils.animate(this.slideAnimationPrev, animationSpeed);
            }
        };
        this.slideAnimationNext = (deltaTime, phase) => {
            this.startX = -300 - 475 * phase;
            if (phase >= 1) {
                this.startX = -300;
                this._songFrames = [null, this._currentSongCard, null];
            }
            return phase < 1;
        };
        this.slideAnimationPrev = (deltaTime, phase) => {
            this.startX = -775 + 475 * phase;
            if (phase >= 1) {
                this.startX = -300;
                this._songFrames = [null, this._currentSongCard, null];
            }
            return phase < 1;
        };
        this.animateCard = () => {
            this._currentSongCard.toggleAnimation();
        };
        this._currentSongCard = songCard;
        this.startX = -300;
        this.startY = 125;
        this._songFrames = [null, songCard, null];
    }
    draw() {
        //draw all frames
        for (let i = 0; i < this._songFrames.length; i++) {
            const cardWidth = 400;
            const cardHeight = 400;
            const tempPosX = this.startX + i * 475;
            if (this._songFrames[i] !== null) {
                this._songFrames[i].startX = tempPosX;
                this._songFrames[i].startY = 125;
                this._songFrames[i].draw();
            }
            else {
                utils.makeShadow();
                const frameColor = "#693900";
                canvas.ctx().strokeStyle = frameColor;
                canvas.ctx().lineWidth = 15;
                canvas.ctx().strokeRect(tempPosX, this.startY, 400, 400);
                utils.resetShadow();
                //background
                const bgColor = "#000000";
                const bgWidth = cardWidth - 15;
                const bgHeight = cardHeight - 15;
                canvas.ctx().fillStyle = bgColor;
                canvas.ctx().fillRect(tempPosX + 7.5, this.startY + 7.5, bgWidth, bgHeight);
            }
        }
    }
}
export default Carousel;
export var Directions;
(function (Directions) {
    Directions[Directions["NEXT"] = 1] = "NEXT";
    Directions[Directions["PREV"] = -1] = "PREV";
})(Directions || (Directions = {}));

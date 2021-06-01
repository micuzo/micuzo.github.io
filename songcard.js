import canvas, { utils } from "./canvas.js";
class SongCard {
    constructor(startX, startY, songTitle) {
        this.startX = startX;
        this.startY = startY;
        this.songTitle = songTitle;
        this.toggleAnimation = () => {
            this._shouldRotate = !this._shouldRotate;
        };
        this._cardWidth = 400;
        this._cardHeight = 400;
        this._rotation = 0.00;
        this._shouldRotate = false;
    }
    centerX(elementWidth) {
        return this.startX + (this._cardWidth / 2 - elementWidth / 2);
    }
    centerY(elementHeight) {
        return this.startY + (this._cardHeight / 2 - elementHeight / 2);
    }
    draw() {
        const cardWidth = this._cardWidth;
        const cardHeight = this._cardHeight;
        //frame
        utils.makeShadow();
        const frameColor = "#693900";
        canvas.ctx().strokeStyle = frameColor;
        canvas.ctx().lineWidth = 15;
        canvas.ctx().strokeRect(this.startX, this.startY, cardWidth, cardHeight);
        utils.resetShadow();
        //background
        const bgColor = "#000000";
        const bgWidth = cardWidth - 15;
        const bgHeight = cardHeight - 15;
        canvas.ctx().fillStyle = bgColor;
        canvas.ctx().fillRect(this.startX + 7.5, this.startY + 7.5, bgWidth, bgHeight);
        //disk
        const diskX = this.centerX(250);
        const diskY = this.centerY(250) - 25;
        if (this._shouldRotate) {
            this._rotation += 0.5;
        }
        const drawDisk = () => canvas.ctx().drawImage(this.diskImage, -250 / 2, -250 / 2, 250, 250);
        utils.rotateCenter(diskX, diskY, 250, 250, this._rotation, drawDisk);
        //song title
        const titleColor = "#A89050";
        canvas.ctx().fillStyle = titleColor;
        canvas.ctx().font = "32px Roboto";
        const titleWidth = canvas.ctx().measureText(this.songTitle).width;
        const x = this.centerX(titleWidth);
        const y = this.centerY(32);
        canvas.ctx().fillText(this.songTitle, x, this.startY + 350);
    }
}
export default SongCard;

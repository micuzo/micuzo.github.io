export const interpolateColor = (currentHex, targetHex, phase) => {
    const interpolate = (a, b, i) => {
        return Math.round(a + (b - a) * i);
    };
    const rgb = hexToRgb(currentHex);
    const targetRgb = hexToRgb(targetHex);
    const newHex = rgbToHex(interpolate(rgb.r, targetRgb.r, phase), interpolate(rgb.g, targetRgb.g, phase), interpolate(rgb.b, targetRgb.b, phase));
    return newHex;
};
//Thank You Stack Overflow
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export const randomHex = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};
//-------

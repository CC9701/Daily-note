function main() {
    var canvas = document.getElementById("example");
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
        return false;
    }
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fillRect(120, 10, 150, 150);
}
var canvas = document.body.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    W = canvas.width = window.innerWidth,
    H = canvas.height = window.innerHeight,
    pixels = [];

for (var x = -400; x < 400; x += 5) {
    for (var z = -250; z < 250; z += 5) {
        pixels.push({x: x, y: 100, z: z});
    }
}

function render(ts) {
    var imageData = ctx.getImageData(0, 0, W, H),
        len = pixels.length,
        fov = 250,
        pixel, scale,
        x2d, y2d, c;

    for (var i = 0; i < len; i++) {
        pixel = pixels[i];
        scale = fov / (fov + pixel.z);
        x2d = pixel.x * scale + W / 2;
        y2d = pixel.y * scale + H / 2;
        if (x2d >= 0 && x2d <= W && y2d >= 0 && y2d <= H) {
            c = (Math.round(y2d) * imageData.width + Math.round(x2d)) * 4;
            imageData.data[c] = 17;
            imageData.data[c + 1] = 122;
            imageData.data[c + 2] = 181;
            imageData.data[c + 3] = 255;
        }
        pixel.z -= 0.4;
        pixel.y = H / 14 + Math.sin(i / len * 15 + (ts / 450)) * 10;
        if (pixel.z < -fov) pixel.z += 2 * fov;
    }
    ctx.putImageData(imageData, 0, 0);
}

(function drawFrame(ts) {
    requestAnimationFrame(drawFrame, canvas);
    ctx.fillStyle = '#17293a';
    ctx.fillRect(0, 0, W, H);
    render(ts);
}());
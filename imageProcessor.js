window.onload = function(e) {
    console.log("onload");
    document.getElementById("okbutton").onclick = function() {loadImage()};
    // renderer.js:
    init();
    animate();
}
var SIZEH = 36;
var SIZES = 10;
var SIZEL = 10;

var loadImage = function() {
    console.log("loadImage");
    var imageCanvas = document.getElementById("imageCanvas");
    var context = imageCanvas.getContext('2d');
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = function(e) {
        console.log("loaded", e, image);
        imageCanvas.width = image.width;
        imageCanvas.height=  image.height;
        context.drawImage(image, 0, 0);
        var buckets = processImage(context);
        display(buckets);
    }
    image.src = document.getElementById('urlInput').value;
}

var processImage = function(context) {
    var imageData = context.getImageData(0, 0, 10, 10);
    var buckets = new Array(SIZEH*SIZES*SIZEL).fill(0);
    for (var pixel = 0; pixel < imageData.width * imageData.height; pixel += 4)
    {
        Record(buckets, imageData.data[pixel], imageData.data[pixel+1], imageData.data[pixel+2], imageData.data[pixel+3]);
        console.log("===");
    }
    return buckets;
}

var Record = function(buckets, r, g, b, a) {
    if (a != 255) return;
    console.log("Processing ",r,g,b)

    var hsl = rgbToHsl(r, g, b);
    var bucketIndex = hslToBucket(hsl);

    console.log("HSL, bucket: ", hsl, bucketIndex);
    buckets[bucketIndex] = buckets[bucketIndex] + 1;
}

var hslToBucket = function (hsl) {
    var bucketH = Math.floor(hsl[0] * SIZEH);
    var bucketS = Math.floor(hsl[1] * SIZES);
    var bucketL = Math.floor(hsl[2] * SIZEL);
    return bucketH * SIZES * SIZEL + bucketS * SIZEL + bucketL
}

var bucketToHsl = function(bucket) {
    var h = Math.floor(bucket / SIZES / SIZEL) // SIZEH
    var s = Math.floor((bucket - h * SIZES * SIZEL) / SIZEL) // SIZES
    var l = Math.floor((bucket - h * SIZES * SIZEL - s * SIZEL)) // SIZEL
    return [h,s,l];
}

var rgbToHsl = function (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var l = (max + min) / 2;
    var d, h, s; // d = chroma
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
    // http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
    // http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
window.onload = function(e) {
    console.log("onload");
    document.getElementById("okbutton").onclick = function() {loadImage()};
}

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
        console.log(processImage(context));
    }
    image.src = document.getElementById('urlInput').value;
}

var processImage = function(context) {
    var imageData = context.getImageData(0, 0, 10, 10);
    var buckets = new Array(10*10*36).fill(0);
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
    var bucketH = Math.floor(hsl[0] * 36);
    var bucketS = Math.floor(hsl[1] * 10);
    var bucketL = Math.floor(hsl[2] * 10);
    return bucketH * 10 * 10 + bucketS * 10 + bucketL
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
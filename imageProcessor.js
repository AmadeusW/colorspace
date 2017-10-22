window.onload = function(e) {
    console.log("onload");
    document.getElementById("okbutton").onclick = function() {
        loadImage(document.getElementById('urlInput').value)
    };
    // renderer.js:
    init();
    animate();
    loadImage('samples/water-lilies-1919-2.jpg');
}
var SIZEH = 36;
var SIZES = 10;
var SIZEL = 10;

var loadImage = function(src) {
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
    image.src = src;
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

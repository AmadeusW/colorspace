window.onload = function(e) {
    document.getElementById("okbutton").onclick = function() {
        var url = document.getElementById('urlInput').value;
        loadImage(url);
    };
    // renderer.js:
    init();
    animate();
    // colorspace:
    loadImageFromAddress();
}

var SIZEH = 36;
var SIZES = 10;
var SIZEL = 10;
var topBucketSize = 0;
var scaledWidth, scaledHeight, renderingWidth, renderingHeight;
var downscaling = 3;
var lastOpenedImage;

var increaseQualityAndUpdate = function() {
    if (downscaling > 0)
        downscaling--;
    else
        downscaling = 0;

    reloadImage();
    return downscaling;
}

var decreaseQualityAndUpdate = function() {
    if (downscaling < 5)
        downscaling++;
    else
        downscaling = 5;

    reloadImage();
    return downscaling;
}

var reloadImage = function() {
    loadImage(lastOpenedImage);
}
var loadImageFromAddress = function() {
    var path = window.location.hash.substr(1);
    if (path === null || path === '')
    {
        console.log("Loading default image");
        path = 'samples/1920px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
    }
    console.log("Loading " + path);
    loadImage(path);
}
var updateWindowUrl = function(url) {
    if(history.pushState) {
        history.pushState(null, null, '#'+url);
    }
    else {
        location.hash = '#'+url;
    }
}
var loadImage = function(src) {
    lastOpenedImage = src;
    updateWindowUrl(src);
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var background = document.getElementById("background");

    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = function(e) {
        console.log("Loaded", e, image);
        scaledWidth = image.width / Math.pow(2, downscaling);
        scaledHeight = image.height / Math.pow(2, downscaling);
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        renderingWidth = image.width;
        renderingHeight = image.height;
        console.log("Processing ", scaledWidth, scaledHeight);
        console.log("Rendering ", renderingWidth, renderingHeight);
        background.src = image.src;

        // canvas size must be set before calling drawImage
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        var buckets = processImage(context);
        display(buckets);
    }
    image.src = src;
}

var processImage = function(context) {
    var imageData = context.getImageData(0, 0, scaledWidth, scaledHeight);
    var buckets = new Array(SIZEH*SIZES*SIZEL).fill(0);
    for (var pixel = 0; pixel < imageData.width * imageData.height; pixel += 4)
    {
        Record(buckets, imageData.data[pixel], imageData.data[pixel+1], imageData.data[pixel+2], imageData.data[pixel+3]);
    }
    return buckets;
}

var Record = function(buckets, r, g, b, a) {
    if (a != 255) return;

    var hsl = rgbToHsl(r, g, b);
    var bucketIndex = hslToBucket(hsl);

    buckets[bucketIndex] = buckets[bucketIndex] + 1;
    if (buckets[bucketIndex] > topBucketSize) {
        topBucketSize = buckets[bucketIndex]
    }
}

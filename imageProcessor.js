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
var topBucketSize = 0;
var scaledWidth, scaledHeight, renderingWidth, renderingHeight;

var loadImage = function(src) {
    console.log("loadImage");
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    //var renderingCanvas = document.getElementById("imageCanvas");
    //var renderingContext = renderingCanvas.getContext('2d');
    var background = document.getElementById("background");

    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = function(e) {
        console.log("loaded", e, image);
        scaledWidth = image.width / 3;
        scaledHeight = image.height / 3;
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        //console.log("RenderingCanvas", renderingCanvas.width)
        renderingWidth = image.width;
        renderingHeight = image.height;
        //renderingCanvas.width = renderingWidth;
        //renderingCanvas.height = renderingHeight;
        console.log("Processing ", scaledWidth, scaledHeight);
        console.log("Rendering ", renderingWidth, renderingHeight);
        // renderingCanvas.width and height is set by DOM
        //renderingContext.drawImage(image, 0, 0, renderingWidth, renderingHeight);
        background.src = image.src;

        // canvas size must be set before calling drawImage
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        var buckets = processImage(context);
        display(buckets);

        // after displaying buckets, darken the background image
        //renderingContext.fillStyle = "rgba(0, 0, 0, 0.6)";
        //renderingContext.fillRect(0, 0, renderingWidth, renderingHeight);
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

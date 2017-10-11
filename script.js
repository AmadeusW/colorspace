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
        processImage(context);
    }
    image.src = document.getElementById('urlInput').value;
}
var processImage = function(context) {
    var imageData = context.getImageData(0, 0, 10, 10);
    debig = imageData;
    console.log(imageData.length);

    for (var pixel = 0; pixel < imageData.width * imageData.height; pixel += 4)
    {
        console.log(imageData.data[pixel]);
        console.log(imageData.data[pixel+1]);
        console.log(imageData.data[pixel+2]);
        console.log(imageData.data[pixel+3]);
        console.log("===");
        //for (var y = 0; y < image.height; y++)
        //{
            
        //}
    }
}
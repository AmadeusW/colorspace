window.onload = function(e) {
    console.log("onload");
    document.getElementById("okbutton").onclick = function() {loadImage()};
}

var loadImage = function() {
    console.log("loadImage");
    var imageCanvas = document.getElementById("imageCanvas");
    var context = imageCanvas.getContext('2d');
    var image = new Image();
    image.onload = function(e) {
        console.log("loaded", e, image);
        imageCanvas.width = image.width;
        imageCanvas.height=  image.height;
        context.drawImage(image, 0, 0);
    }
    image.src = document.getElementById('urlInput').value;
}
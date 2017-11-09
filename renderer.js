var SEPARATION = 1;
var AMOUNTX = 50;
var AMOUNTY = 50;
var container, header;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var darkening = true;

function init() {
    container = document.getElementById("renderer");
    header = document.getElementById("header");
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer({alpha:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //stats = new Stats();
    //container.appendChild( stats.dom );

    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // remove when using animation loop
    // enable animation loop when using damping or autorotation
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
/*
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'click', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
*/
    window.addEventListener( 'resize', onWindowResize, false );
}
var PI2 = Math.PI * 2;
var circle = function ( context ) {
    context.beginPath();
    context.arc( 0, 0, 0.5, 0, PI2, true );
    context.fill();
};
var resetScene = function() {
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
}
function display(buckets) {
    resetScene();
    for (var i = 0; i < buckets.length; i++)
    {
        if (buckets[i] > 0)
        {
            var hsl = bucketToHsl(i);
            var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

            var material = new THREE.SpriteCanvasMaterial({
                color: rgbToHex(rgb[0],rgb[1],rgb[2]),
                program: circle
            });
            particle = new THREE.Sprite( material );
            var frequencyBasedScale = 0.1 + (buckets[i] / topBucketSize) * 0.4;
            var hybridScale = (downscaling + 2) * 0.1 * hsl[1] + (buckets[i] / topBucketSize) * 0.5;
            var scale = hybridScale;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;
            // angle comes from hue
            // radius comes from saturation
            // Y-position comes from lightness (and a bit from saturation)
            var hueCoordinates = polarToCartesian(hsl[0] * 2 * Math.PI, hsl[1] * 4);
            
            particle.position.x = hueCoordinates.x;
            particle.position.y = -2 + hsl[2]*4.2  // Mostly based on lightness
                                    + hsl[1] * 0.8 // A little tweak from saturation, for raising disk edges
                                    + hsl[0] * 0.5; // a little kick from hue, for raising spiral arms
            particle.position.z = hueCoordinates.y;
            scene.add( particle );
        }
    }
}

function onWindowResize() {
    //windowHalfX = window.innerWidth / 2;
    //windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
/*
function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}
function onDocumentMouseDown( event ) {
    console.log(event.clientY, header.clientHeight);
    if (event.clientY > header.clientHeight) {
        darkening = !darkening;
        background.style.opacity = darkening ? 0.3 : 1.0;
    }
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length > 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
function onDocumentTouchMove( event ) {
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
*/
// TODO: figure out who's calling animate and how this got hooked up
function animate() {
    requestAnimationFrame( animate );
    //stats.update();
    controls.update();
    render();
}
function render() {
    /*
    var coords = polarToCartesian3D(mouseX / (windowHalfX /  Math.PI), mouseY / (windowHalfY * 2 /  Math.PI), 10);
    camera.position.x = coords.x;
    camera.position.z = coords.y;
    camera.position.y = coords.z;
    camera.lookAt( scene.position );
    */
    renderer.render( scene, camera );
}

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

    renderer = new THREE.CanvasRenderer({alpha:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 6, -8)
    camera.lookAt(new THREE.Vector3())

    //stats = new Stats();
    //container.appendChild( stats.dom );

    console.log("init");
    controls = new THREE.OrbitControls( camera );
    controls.enableDamping = true;
    controls.dampingFactor = 0.9;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxDistance = 20;

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
    console.log("display will now reset scene");
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

function animate() {
    //console.log("animate");
    requestAnimationFrame( animate );
    //stats.update();
    controls.update();
    render();
}
function render() {
    //console.log("render");
    renderer.render( scene, camera );
}

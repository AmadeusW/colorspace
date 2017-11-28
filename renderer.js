var SEPARATION = 1;
var AMOUNTX = 50;
var AMOUNTY = 50;
var container, header;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var darkening = true;
var lastProcessedBuckets;
var scaleRadius, scaleFrequent, scaleScarce;

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

    controls = new THREE.OrbitControls( camera );
    controls.enableDamping = true;
    controls.dampingFactor = 0.9;
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1;
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
    lastProcessedBuckets = buckets;
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

            var baseB = 0.02;
            var baseA = 0.15;
            var frequencyA = 0;
            var frequencyB = 1;
            var scarcityA = 0;
            var scarcityB = 1;
            var radiusA = 0;
            var radiusB = 1;
            var resolutionA = 0.3;
            var resolutionB = 0.6;
            if (scaleFrequent) {
                var frequencyA = 6;
                var frequencyB = 0.2;
            }
            if (scaleScarce) {
                var scarcityA = 2;
                var scarcityB = 0.2;
            }
            if (scaleRadius) {
                var radiusA = 2.0;
                var radiusB = 0.05;
            }

            var scale = baseB + baseA
              * ( resolutionA * downscaling + resolutionB )
              * ( radiusA * hsl[1] + radiusB )
              * ( frequencyA * (buckets[i] / topBucketSize) + frequencyB )
              * ( scarcityA * (bottomBucketSize / buckets[i]) + scarcityB );

            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;
            // angle comes from hue
            // radius comes from saturation
            // Y-position comes from lightness (and a bit from saturation)
            var hueCoordinates = polarToCartesian(hsl[0] * 2 * Math.PI, 0.03 + hsl[1] * 4);
            
            particle.position.x = hueCoordinates.x;
            particle.position.y = -2 + hsl[2]*4.2  // Mostly based on lightness
                                    + hsl[1] * 0.8 // A little tweak from saturation, for raising disk edges
                                    + hsl[0] * 0.42; // a little kick from hue, for raising spiral arms
            particle.position.z = hueCoordinates.y;
            scene.add( particle );
        }
    }
}

function toggleRadius() {
    scaleRadius = !scaleRadius;
    display(lastProcessedBuckets);
}
function toggleDensity() {
    scaleFrequent = !scaleFrequent;
    display(lastProcessedBuckets);
}
function toggleScarcity() {
    scaleScarce = !scaleScarce;
    display(lastProcessedBuckets);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Called first from window.onload handler and then recursively
function animate() {
    requestAnimationFrame( animate );
    //stats.update();
    controls.update();
    renderer.render( scene, camera );
}

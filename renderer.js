var SEPARATION = 100;
var AMOUNTX = 50;
var AMOUNTY = 50;
var container, stats;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function init() {
    container = document.getElementById("renderer")
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    scene = new THREE.Scene();
    var material = new THREE.SpriteMaterial();
    for ( var ix = 0; ix < AMOUNTX; ix++ ) {
        for ( var iy = 0; iy < AMOUNTY; iy++ ) {
            particle = new THREE.Sprite( material );
            particle.scale.y = 20;
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );
        }
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    stats = new Stats();
    container.appendChild( stats.dom );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}
var PI2 = Math.PI * 2;
var circle = function ( context ) {
    context.beginPath();
    context.arc( 0, 0, 0.5, 0, PI2, true );
    context.fill();
};
function display(buckets) {
    for (var i = 0; i < buckets.length; i++)
    {
        if (buckets[i] > 0)
        {
            var hsl = bucketToHsl(i);
            var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
            console.log("Display ", i, hsl, rgb);
            //var material = new THREE.SpriteMaterial();
            var material = new THREE.SpriteCanvasMaterial({
                color: rgbToHex(rgb[0],rgb[1],rgb[2]),
                program: circle
            });
            particle = new THREE.Sprite( material );
            particle.scale.x = SEPARATION;
            particle.scale.y = SEPARATION;
            particle.scale.z = SEPARATION;
            particle.position.x = hsl[0]*SIZEH * SEPARATION - SEPARATION*SIZEH/2;
            particle.position.y = hsl[1]*SIZES * SEPARATION - SEPARATION*SIZES/2;
            particle.position.z = hsl[2]*SIZEL * SEPARATION - SEPARATION*SIZEL/2;
            scene.add( particle );
        }
    }
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
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
//
function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}
function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

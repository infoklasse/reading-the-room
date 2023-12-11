// Defining Variables
let scene, camera, renderer, controls;
let cameraMoveSpeed = 0.005;
let cameraPathIndex = 0;

const cameraPath = [
    //new THREE.Vector3(X, Y, Z),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-5, 0, -5),
    new THREE.Vector3(-5, 5, -5),
    new THREE.Vector3(-5, 5, 5),



];


// Creating Scene
function initScene() {

    // Basics
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xaaaaaa); // Backgroundcolor
    document.body.appendChild(renderer.domElement);
    camera.position.copy(cameraPath[0]);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    camera.position.set(0, 0, 5);
    console.log(camera.position)

     // OrbitControls
     controls = new THREE.OrbitControls(camera, renderer.domElement);
     controls.enableDamping = true; // Optional, but makes the controls smoother
     controls.dampingFactor = 0.05;

    // Load GLB File
    loadGLB("/pathto/your/file.glb"); // Replace with the path to your GLB file
}

// Make Animation (Control + Camera Ride)
function animate() {

    requestAnimationFrame(animate);

    if (cameraPathIndex < cameraPath.length - 1) {
        let nextPoint = cameraPath[cameraPathIndex + 1];
        camera.position.lerp(nextPoint, cameraMoveSpeed);
        if (camera.position.distanceTo(nextPoint) < 0.1) {
            cameraPathIndex++;
        }
    }
    camera.lookAt(scene.position);
    
    controls.update(); // Only required if controls.enableDamping or controls.autoRotate are set to true
    renderer.render(scene, camera);
}

function loadGLB(url) {
    const loader = new THREE.GLTFLoader();
    loader.load(url, (gltf) => {
        console.log('Model loaded:', gltf);
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });
}



initScene();
animate();
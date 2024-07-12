import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { texture } from "three/examples/jsm/nodes/Nodes.js";

let boxController = {};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
 "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

// doorColorTexture.colorSpace = THREE.SRGBColorSpace;
// matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Objects
 */
const material = new THREE.MeshStandardMaterial();
material.metalness = 1
material.roughness = 1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorHeightTexture
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1


// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 20);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
 environmentMap.mapping = THREE.EquirectangularReflectionMapping;
 scene.environment = environmentMap;
 scene.background = environmentMap;
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere2.position.x = -2.5;
sphere2.position.y = -2;

const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1), material);
const torus = new THREE.Mesh(
 new THREE.TorusGeometry(0.3, 0.2, 32, 64),
 material
);
torus.position.x = 1.5;
material.side = THREE.FrontSide;
scene.add(sphere, box, torus, sphere2);

/**
 * Sizes
 */
const sizes = {
 width: window.innerWidth,
 height: window.innerHeight
};

window.addEventListener("resize", () => {
 // Update sizes
 sizes.width = window.innerWidth;
 sizes.height = window.innerHeight;

 // Update camera
 camera.aspect = sizes.width / sizes.height;
 camera.updateProjectionMatrix();

 // Update renderer
 renderer.setSize(sizes.width, sizes.height);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
 75,
 sizes.width / sizes.height,
 0.1,
 100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
 canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const textures = {
 "Door Color": doorColorTexture,
 "Door Alpha": doorAlphaTexture,
 "Door Ambient Occlusion": doorAmbientOcclusionTexture,
 Matcap: matcapTexture,
 Gradient: gradientTexture,
 "Door Height": doorHeightTexture,
 "Door Normal": doorNormalTexture,
 "Door Metalness": doorMetalnessTexture,
 "Door Roughness": doorRoughnessTexture
};

// Function to change texture
const changeTexture = (texture) => {
 material.map = texture;
 material.needsUpdate = true;
};

// GUI control to change sphere texture
const textureOptions = Object.keys(textures);

const setupGUI = () => {
 const gui = new GUI();
 gui.add(material, "metalness", 0, 1, 0.01);
 gui.add(material, "roughness", 0, 1, 0.01);
 const textureFolder = gui.addFolder("Textures");
 textureFolder
  .add({ texture: "Door Color" }, "texture", textureOptions)
  .onChange((value) => {
   changeTexture(textures[value]);
  });

 const positionFolder = gui.addFolder("Position");
 positionFolder.add(sphere.position, "x", -5, 5, 0.1);
 positionFolder.add(sphere.position, "y", -5, 5, 0.1);
 positionFolder.add(sphere.position, "z", -5, 5, 0.1);

 sphere.visible = true;
 const sphereFolder = gui.addFolder("Sphere");
 sphereFolder.add(sphere, "visible").name("is sphere visible");

 sphere2.visible = true;
 const sphere2ndFolder = gui.addFolder("2nd Sphere");
 sphere2ndFolder.add(sphere2, "visible").name("is 2nd sphere visible");

 box.visible = true;
 const boxFolder = gui.addFolder("Box");
 boxFolder.add(box, "visible").name("is box visible");

 torus.visible = true;
 const torusFolder = gui.addFolder("Torus");
 torusFolder.add(torus, "visible").name("is torus visible");
};
setupGUI();

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
 const elapsedTime = clock.getElapsedTime();

 // Update objects
 sphere.rotation.y = elapsedTime * 0.1;
 box.rotation.y = elapsedTime * 0.1;
 torus.rotation.y = elapsedTime * 0.1;

 sphere.rotation.x = elapsedTime * -0.15;
 box.rotation.x = elapsedTime * -0.15;
 torus.rotation.x = elapsedTime * -0.15;

 sphere2.rotation.y = elapsedTime * 0.3;
 sphere2.rotation.x = elapsedTime * -0.3;

 // Update controls
 controls.update();

 // Render
 renderer.render(scene, camera);

 // Call tick again on the next frame
 window.requestAnimationFrame(tick);
};

tick();

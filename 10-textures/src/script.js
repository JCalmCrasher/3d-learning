import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

let effectController = {
 showTexture: false,
 color: "#e9b66a",
 wireframe: false,
 subdivisions: 5
};

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {};
loadingManager.onLoad = () => {};
loadingManager.onProgress = () => {};
loadingManager.onError = () => {};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/minecraft.png");
// debugObject.texture = colorTexture;
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const heightTexture = textureLoader.load("/textures/door/height.jpg");
// const normalTexture = textureLoader.load("/textures/door/normal.jpg");
// const ambientOcclusionTexture = textureLoader.load(
//  "/textures/door/ambientOcclusion.jpg"
// );
// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 2;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

colorTexture.generateMipmaps = false;
colorTexture.magFilter = THREE.NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
 color: effectController?.color
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const setupGui = () => {
 const gui = new GUI();
 const objectTweak = gui.addFolder("Object Tweaks");
 objectTweak
  .add(effectController, "showTexture")
  .name("show texture")
  .onChange(() => {
   const isTextureVisible = effectController?.showTexture;
   let newMaterial;
   if (isTextureVisible) {
    newMaterial = new THREE.MeshBasicMaterial({
     map: colorTexture
    });
   } else {
    newMaterial = new THREE.MeshBasicMaterial({
     color: effectController.color
    });
   }
   mesh.material = newMaterial;
  });
 objectTweak.addColor(effectController, "color").onChange(() => {
  mesh.material.color.set(effectController.color);
 });
 objectTweak.add(effectController, "wireframe").onChange(() => {
  mesh.material.wireframe = effectController.wireframe;
 });
 objectTweak
  .add(effectController, "subdivisions")
  .min(1)
  .max(10)
  .step(1)
  .onFinishChange(() => {
   const newGeometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    effectController.subdivisions,
    effectController.subdivisions,
    effectController.subdivisions
   );
   mesh.geometry = newGeometry;
  });

 const positionFolder = objectTweak.addFolder("Position");
 positionFolder.add(mesh.position, "x").min(-3).max(3).step(0.01);
 positionFolder.add(mesh.position, "y").min(-3).max(3).step(0.01);

 const spinFolder = objectTweak.addFolder("Spin");

 // spin 180
 spinFolder.spin_180 = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI });
 };
 //  spin 360
 spinFolder.spin_360 = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
 };

 spinFolder.add(spinFolder, "spin_180");
  spinFolder.add(spinFolder, "spin_360");
};
setupGui();

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
camera.position.z = 1;
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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
 const elapsedTime = clock.getElapsedTime();

 // Update controls
 controls.update();

 // Render
 renderer.render(scene, camera);

 // Call tick again on the next frame
 window.requestAnimationFrame(tick);
};

tick();

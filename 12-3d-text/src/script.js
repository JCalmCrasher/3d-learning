import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/2.png");

const textures = {
 matcap: matcapTexture,
 matcap1: matcapTexture2
};
const textureOptions = Object.keys(textures);
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const boxMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });

const changeTexture = (_material, texture) => {
 _material.map = texture;
 _material.needsUpdate = true;
};

const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
 const textGeometry = new TextGeometry("Hello Habibi", {
  font: font,
  size: 0.5,
  depth: 0.2,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 5
 });

 textGeometry.computeBoundingBox();
 textGeometry.translate(
  -textGeometry.boundingBox.max.x * 0.5,
  -textGeometry.boundingBox.max.y * 0.5,
  -textGeometry.boundingBox.max.z * 0.5
 );
 textGeometry.center();

 const text = new THREE.Mesh(textGeometry, textMaterial);
 scene.add(text);
});

const setupGUI = () => {
 const gui = new GUI({
  title: "Debug UI"
 });
 window.addEventListener("keydown", (e) => {
  if (e.key === "h") {
   gui.show(gui._hidden);
  }
 });
 const texturesFolder = gui.addFolder("Textures");
 texturesFolder
  .add({ texture: "matcap" }, "text texture", textureOptions)
  .onChange((value) => {
   changeTexture(textMaterial, textures[value]);
  });
 texturesFolder
  .add({ texture: "matcapTexture" }, "donut texture", textureOptions)
  .onChange((value) => {
   changeTexture(donutMaterial, textures[value]);
  });
 texturesFolder
  .add({ texture: "matcapTexture" }, "box texture", textureOptions)
  .onChange((value) => {
   changeTexture(boxMaterial, textures[value]);
  });

 texturesFolder.open();
};
setupGUI();

for (let i = 0; i < 100; i++) {
 const donut = new THREE.Mesh(donutGeometry, donutMaterial);

 donut.position.x = (Math.random() - 0.5) * 10;
 donut.position.y = (Math.random() - 0.5) * 10;
 donut.position.z = (Math.random() - 0.5) * 10;

 donut.rotation.x = Math.random() * Math.PI;
 donut.rotation.y = Math.random() * Math.PI;

 const scale = Math.random();
 donut.scale.set(scale, scale, scale);

 const box = new THREE.Mesh(boxGeometry, boxMaterial);

 box.position.x = (Math.random() - 0.5) * 10;
 box.position.y = (Math.random() - 0.5) * 10;
 box.position.z = (Math.random() - 0.5) * 10;

 box.rotation.x = Math.random() * Math.PI;
 box.rotation.y = Math.random() * Math.PI;
 box.scale.set(scale, scale, scale);

 scene.add(donut, box);
}

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

import gsap from "gsap/gsap-core";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff00dd });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Sizes
const sizes = {
 width: 1920,
 height: 800
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
 canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// const clock = new THREE.Clock();

let tl = gsap.timeline({ repeat: -1, yoyo: true });
tl
 .to(cube.position, { x: 2, duration: 0.5, })
 .to(cube.position, { x: 0, duration: 0.5, });

const tick = () => {
 //  const elapsedTime = clock.getElapsedTime();
 //  cube.position.y = Math.sin(elapsedTime);
 //  cube.position.x = Math.cos(elapsedTime);
 window.requestAnimationFrame(tick);
 renderer.render(scene, camera);
};

tick();

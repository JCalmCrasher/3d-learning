import * as THREE from "three";

const sizes = {
    width: 800,
    height: 600
};

// Canvas
const canvas = document.querySelector('canvas.webgl');

const scene=new THREE.Scene();

// Objects
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x00ff00})
);
group.add(cube1);

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
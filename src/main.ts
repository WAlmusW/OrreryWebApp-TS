import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { createSun, createPlanet, createPlanetOrbit } from "./objects";
import { sun } from "./sunData";
import { planets } from "./planetData";

import "./style.css";

// CONSTANTS
const UNIVERSAL_SPEED: number = 0.0001;

// SCENE
const scene: THREE.Scene = new THREE.Scene();

// CAMERA
const camera: THREE.Camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);
camera.position.set(400, 200, 200);

// RENDERER
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// CONTROLS
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enablePan = true;
controls.enableRotate = true;
controls.minDistance = 0;
controls.maxDistance = 50000;
controls.update();

// HEMISPHERE LIGHT
const hemisphereLight: THREE.AmbientLight = new THREE.AmbientLight(
  0xffffff,
  0.8
);
scene.add(hemisphereLight);

// SUNLIGHT
const sunLight: THREE.PointLight = new THREE.PointLight(
  0xffffff,
  10,
  100000,
  0.15
);
scene.add(sunLight);

// Sun Geometry
const sunMesh: THREE.Mesh = createSun(sun);
scene.add(sunMesh);

// Planet & Line Orbit Geometry
const planetMeshList: THREE.Mesh[] = [];
const planetOrbitList: THREE.Line[] = [];

planets.forEach((planet) => {
  const planetMesh: THREE.Mesh = createPlanet(planet);
  planetMeshList.push(planetMesh);
  scene.add(planetMesh);

  const planetOrbit: THREE.Line = createPlanetOrbit(planet);
  planetOrbitList.push(planetOrbit);
  scene.add(planetOrbit);
});

// ANIMATE
function animate() {
  sunMesh.rotation.y += sun.speedRotation * UNIVERSAL_SPEED;

  planets.forEach((planet, index) => {
    planet.angleOrbit += planet.speedRevolution * UNIVERSAL_SPEED;

    const radius = planet.scaledRadiusOrbit;
    const x = radius * Math.cos(planet.angleOrbit);
    const z = radius * Math.sin(planet.angleOrbit);

    planetMeshList[index].position.set(x, 0, z);
    planetMeshList[index].rotation.y += planet.speedRotations * UNIVERSAL_SPEED;
  });

  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();

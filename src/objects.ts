import * as THREE from "three";

import { Sun } from "./sunData";
import { Planet } from "./planetData";

function createSun(sun: Sun) {
  const widthSegments: number = 32;
  const heightSegments: number = 32;

  const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  const sunTexture = textureLoader.load(sun.texture);

  const sunGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
    sun.scaledRadius,
    widthSegments,
    heightSegments
  );
  const sunMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
    map: sunTexture,
    emissive: new THREE.Color(0xc73703),
    emissiveIntensity: 5,
  });
  const sunMesh: THREE.Mesh = new THREE.Mesh(sunGeometry, sunMaterial);

  sunMesh.position.set(0, 0, 0);
  sunMesh.castShadow = false;

  return sunMesh;
}

function createPlanet(planet: Planet) {
  const widthSegments: number = 32;
  const heightSegments: number = 32;
  const position: [number, number, number] = [planet.scaledRadiusOrbit, 0, 0];

  const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load(planet.texture);

  const planetGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
    planet.scaledRadius,
    widthSegments,
    heightSegments
  );
  const planetMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
    map: planetTexture,
  });
  const planetMesh: THREE.Mesh = new THREE.Mesh(planetGeometry, planetMaterial);

  planetMesh.position.set(position[0], position[1], position[2]);
  planetMesh.castShadow = true;
  planetMesh.receiveShadow = true;

  return planetMesh;
}

function createPlanetOrbit(planet: Planet) {
  const color: number = 0xffffff;
  const segments: number = 64;

  const planetOrbitGeometry: THREE.CircleGeometry = new THREE.CircleGeometry(
    planet.scaledRadiusOrbit,
    segments
  );
  const planetOrbitEdgesGeometry: THREE.EdgesGeometry = new THREE.EdgesGeometry(
    planetOrbitGeometry
  );
  const planetOrbitMaterial: THREE.LineBasicMaterial =
    new THREE.LineBasicMaterial({ color: color });
  const planetOrbitLine: THREE.Line = new THREE.Line(
    planetOrbitEdgesGeometry,
    planetOrbitMaterial
  );

  planetOrbitLine.rotation.x = Math.PI / 2;

  return planetOrbitLine;
}

export { createSun, createPlanet, createPlanetOrbit };

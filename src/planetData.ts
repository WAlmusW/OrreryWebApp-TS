// SCALING FACTORS
const PLANET_SIZE_SCALING = 500_000; // 1 million meters per unit coords
const PLANET_ORBIT_SIZE_SCALING = 250_000_000; // 500 million meters per unit coords
const REVOLUTION_TIME_SCALING = 365; // 1 year = 365 seconds in animation
const ROTATION_TIME_SCALING = 1; // 1 day = 1 second in animation

const AU_IN_METERS = 149_597_870_700; // 1 AU in meters

// PLANET
class Planet {
  name: string;
  description: string;
  color: number;
  texture: string;
  mass: number;
  density: number;
  moons: number;

  // Planet
  realRadius: number;
  scaledRadius: number;
  axialTilt: number;

  // Planet Orbit
  realRadiusOrbit: number;
  scaledRadiusOrbit: number;
  angleOrbit: number;
  inclination: number;

  // Speed
  revolutionPeriodInYears: number;
  speedRevolution: number;
  rotationPeriodInDays: number;
  speedRotations: number;

  constructor(
    name: string,
    description: string,
    color: number,
    texture: string,
    mass: number,
    density: number,
    moons: number,

    // Planet
    realRadius: number,
    axialTilt: number,

    // Planet Orbit
    realRadiusOrbit: number,
    angleOrbit: number,
    inclination: number,

    // Speed
    revolutionPeriodInYears: number,
    rotationPeriodInDays: number
  ) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.texture = texture;
    this.mass = mass;
    this.density = density;
    this.moons = moons;

    this.realRadius = realRadius;
    this.scaledRadius = this.scaleRadiusPlanet();
    this.axialTilt = axialTilt;

    this.realRadiusOrbit = realRadiusOrbit;
    this.scaledRadiusOrbit = this.scaleRadiusPlanetOrbit();
    this.angleOrbit = angleOrbit;
    this.inclination = inclination;

    this.revolutionPeriodInYears = revolutionPeriodInYears;
    this.speedRevolution = this.calculateRevolutionSpeed();
    this.rotationPeriodInDays = rotationPeriodInDays;
    this.speedRotations = this.calculateRotationSpeed();
  }

  scaleRadiusPlanet() {
    return this.realRadius / PLANET_SIZE_SCALING;
  }

  scaleRadiusPlanetOrbit() {
    return this.realRadiusOrbit / PLANET_ORBIT_SIZE_SCALING;
  }

  calculateRevolutionSpeed() {
    return (
      (2 * Math.PI * this.scaledRadiusOrbit) /
      (this.revolutionPeriodInYears * REVOLUTION_TIME_SCALING)
    );
  }

  calculateRotationSpeed() {
    return (
      (2 * Math.PI * this.scaledRadius) /
      (this.rotationPeriodInDays * ROTATION_TIME_SCALING)
    );
  }
}

// Planet data referencce: https://en.wikipedia.org/wiki/Orrery
// Planet texture reference: https://www.solarsystemscope.com/textures/

const planets: Planet[] = [
  new Planet(
    "Mercury",
    "The smallest planet",
    0xaaaaaa,
    "/2k_mercury.jpg",
    0.05,
    5.5,
    0,
    2439.7 * 1000,
    0,
    0.39 * AU_IN_METERS,
    0,
    7.0,
    0.24,
    59
  ),
  new Planet(
    "Venus",
    "The hottest planet",
    0xffcc66,
    "/2k_venus_atmosphere.jpg",
    0.82,
    5.3,
    0,
    6051.8 * 1000,
    177,
    0.72 * AU_IN_METERS,
    0,
    3.4,
    0.62,
    -243
  ),
  new Planet(
    "Earth",
    "Our home",
    0x3399ff,
    "/2k_earth_daymap.jpg",
    1,
    5.5,
    1,
    6371 * 1000,
    23,
    1.0 * AU_IN_METERS,
    0,
    0,
    1,
    1
  ),
  new Planet(
    "Mars",
    "The red planet",
    0xcc3333,
    "/2k_mars.jpg",
    0.11,
    3.9,
    2,
    3389.5 * 1000,
    25,
    1.52 * AU_IN_METERS,
    0,
    1.9,
    1.88,
    1.025
  ),
  new Planet(
    "Jupiter",
    "The largest planet",
    0xff9966,
    "/2k_jupiter.jpg",
    317.9,
    1.3,
    95,
    69911 * 1000,
    3,
    5.2 * AU_IN_METERS,
    0,
    1.3,
    11.9,
    0.416
  ),
  new Planet(
    "Saturn",
    "The ringed planet",
    0xffcc99,
    "/2k_saturn.jpg",
    95.2,
    0.7,
    146,
    58232 * 1000,
    27,
    9.54 * AU_IN_METERS,
    0,
    2.5,
    29.5,
    0.458
  ),
  new Planet(
    "Uranus",
    "The tilted planet",
    0x66ccff,
    "/2k_uranus.jpg",
    14.5,
    1.3,
    28,
    25362 * 1000,
    98,
    19.2 * AU_IN_METERS,
    0,
    0.8,
    84,
    -0.708
  ),
  new Planet(
    "Neptune",
    "The blue planet",
    0x3333ff,
    "/2k_neptune.jpg",
    17.1,
    1.6,
    16,
    24622 * 1000,
    28,
    30.1 * AU_IN_METERS,
    0,
    1.8,
    165,
    0.666
  ),
];

export { Planet, planets };

// SCALING FACTOR
const SUN_SIZE_SCALING = 10_000_000; // 10 million meters per unit coords
const ROTATION_TIME_SCALING = 1; // 1 day = 1 second in animation

class Sun {
  name: string;
  description: string;
  color: number;
  texture: string;

  // Sun
  realRadius: number;
  scaledRadius: number;

  // Speed
  rotationPeriodInDays: number;
  speedRotation: number;

  constructor(
    name: string,
    description: string,
    color: number,
    texture: string,

    realRadius: number,
    rotationPeriodInDays: number
  ) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.texture = texture;

    this.realRadius = realRadius;
    this.scaledRadius = this.scaleRadius();

    this.rotationPeriodInDays = rotationPeriodInDays;
    this.speedRotation = this.calculateRotationSpeed();
  }

  scaleRadius() {
    return this.realRadius / SUN_SIZE_SCALING;
  }

  calculateRotationSpeed() {
    return (
      (2 * Math.PI * this.scaledRadius) /
      (this.rotationPeriodInDays * ROTATION_TIME_SCALING)
    );
  }
}

// Sun texture reference: https://www.solarsystemscope.com/textures/

const sun = new Sun(
  "Sun",
  "The sole star",
  0xffd700,
  "/2k_sun.jpg",
  1_392_700_000,
  27
);

export { Sun, sun };

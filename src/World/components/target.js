import { Object3D } from 'https://cdn.skypack.dev/three@0.132.2';

function createTarget() {
  // Create a directional light
  const target = new Object3D();

  target.position.set(0, 2, -20);

  return target;
}

export { createTarget };
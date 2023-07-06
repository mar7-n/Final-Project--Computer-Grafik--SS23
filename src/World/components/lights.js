import { SpotLight } from 'https://cdn.skypack.dev/three@0.132.2';

function createLights(brightness, penumbra, angle) {
  // Create a directional light
  const light = new SpotLight('white', brightness);

  light.position.set(0, -1, 0);

  light.angle = angle; // Angle of the spotlight's cone
  light.penumbra = penumbra; // Softness of the spotlight's edges

  return light;
}

export { createLights };
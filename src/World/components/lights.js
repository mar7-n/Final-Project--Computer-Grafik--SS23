import { SpotLight } from 'https://cdn.skypack.dev/three@0.132.2';

function createLights(brightness, posX, posY, posZ, penumbra, angle) {
  // Create a directional light
  const light = new SpotLight('white', brightness);

  // move the light right, up, and towards us
  light.position.set(posX, posY, posZ);

  light.angle = angle; // Angle of the spotlight's cone
  light.penumbra = penumbra; // Softness of the spotlight's edges

  return light;
}

export { createLights };

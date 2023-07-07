import { SpotLight } from 'https://cdn.skypack.dev/three@0.132.2';

function createLights(brightness, penumbra, angle) {
  // Create a directional light
  const light = new SpotLight('white', brightness);

  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 10;

  light.shadow.radius = 10;
  light.shadow.bias = -0.07;

  light.position.set(0, -0.5, 0);

  light.angle = angle; // Angle of the spotlight's cone
  light.penumbra = penumbra; // Softness of the spotlight's edges

  return light;
}

export { createLights };
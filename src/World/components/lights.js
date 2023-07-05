import { SpotLight, Object3D  } from 'https://cdn.skypack.dev/three@0.132.2';

function createLights(brightness, posX, posY, posZ, penumbra, angle) {
  // Create a directional light
  const light = new SpotLight('white', brightness);

  // move the light right, up, and towards us
  light.position.set(posX, posY, posZ);

  light.angle = angle; // Angle of the spotlight's cone
  light.penumbra = penumbra; // Softness of the spotlight's edges

  light.tick = (delta, elapsedTime) => {
    console.log(elapsedTime);
    var angleInRadian = elapsedTime*10 / 180 * Math.PI;
    light.position.x = 3 * Math.cos(angleInRadian);
    light.position.z = 3 * Math.sin(angleInRadian);
  };

  return light;
}

export { createLights };
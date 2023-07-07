import { PointLight } from 'https://cdn.skypack.dev/three@0.132.2';

function createPointLights() {
  // Create a directional light
  const light = new PointLight(0xffffff, 10, 100);

  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 100;

  light.position.set(-40, 8, -5);

  let countTime = 0;
  let countTimeProcess = 0.8;

  light.tick = (delta, elapsedTime, deltaMove) => {
    countTime += delta;

    if(countTime > 5) {
        light.intensity = 100;
    }

    if(countTimeProcess < 0) {
        countTimeProcess = 0.8;
        countTime = 0;
        light.intensity = 10;
    }

    if(countTimeProcess < 0.6) {
        light.intensity = 50;
    }

    if(countTimeProcess < 0.4) {
        light.intensity = 100;
    }

    if(countTimeProcess < 0.3) {
        light.intensity -= delta*2500;
    }

    if(countTime > 5) countTimeProcess -= delta;

  };

  return light;
}

export { createPointLights };
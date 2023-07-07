import { WebGLRenderer, PCFShadowMap } from 'https://cdn.skypack.dev/three@0.132.2';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  return renderer;
}

export { createRenderer };
